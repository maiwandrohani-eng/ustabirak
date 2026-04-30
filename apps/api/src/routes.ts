import type { FastifyInstance } from "fastify";
import type { Server } from "socket.io";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { createEscrowPayment, releaseEscrowPayment } from "./payments.js";
import { authSecrets, db, makeId, touchJob } from "./store.js";

const now = () => new Date().toISOString();

const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
};

const verifyPassword = (password: string, stored: string) => {
  const [salt, hashHex] = stored.split(":");
  if (!salt || !hashHex) {
    return false;
  }
  const expectedHash = Buffer.from(hashHex, "hex");
  const candidateHash = scryptSync(password, salt, expectedHash.length);
  return timingSafeEqual(expectedHash, candidateHash);
};

const requestJobSchema = z.object({
  customerId: z.string(),
  workerId: z.string(),
  category: z.enum(["electrician", "plumber", "cleaning", "painting", "ac-repair", "moving", "other"]),
  title: z.string().min(3),
  description: z.string().min(3),
  scheduledAt: z.string(),
  amount: z.number().positive(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    city: z.string(),
    district: z.string().optional()
  })
});

export const registerRoutes = (app: FastifyInstance, io: Server) => {
  app.get("/health", async () => ({ ok: true }));

  app.post("/auth/register", async (req) => {
    const body = z
      .object({
        role: z.enum(["customer", "worker"]),
        fullName: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(8),
        phone: z.string().optional(),
        city: z.string(),
        district: z.string().optional(),
        mahalle: z.string().optional(),
        bio: z.string().optional(),
        categories: z
          .array(
            z.enum(["electrician", "plumber", "cleaning", "painting", "ac-repair", "moving", "other"])
          )
          .optional(),
        experienceYears: z.number().optional(),
        iban: z.string().optional(),
        bankName: z.string().optional(),
        accountHolderName: z.string().optional(),
        hourlyPrice: z.number().positive().optional(),
        serviceRadiusKm: z.number().optional()
      })
      .parse(req.body);

    const normalizedEmail = body.email.trim().toLowerCase();
    const duplicateCustomer = db.customers.find((customer) => customer.email?.toLowerCase() === normalizedEmail);
    const duplicateWorker = db.workers.find((worker) => worker.email?.toLowerCase() === normalizedEmail);
    if (duplicateCustomer || duplicateWorker) {
      throw new Error("An account with this email already exists.");
    }

    if (body.role === "customer") {
      const customer = {
        id: makeId("c"),
        fullName: body.fullName,
        email: normalizedEmail,
        phone: body.phone,
        location: {
          lat: 41,
          lng: 29,
          city: body.city,
          district: body.district
        }
      };
      db.customers.push(customer);
      authSecrets.customerPasswordHashes[customer.id] = hashPassword(body.password);
      return { user: customer, role: "customer", token: `dev-token-${customer.id}` };
    }

    const worker = {
      id: makeId("w"),
      fullName: body.fullName,
      email: normalizedEmail,
      phone: body.phone,
      bio: body.bio ?? "New worker profile",
      categories: body.categories ?? ["other"],
      experienceYears: body.experienceYears ?? 0,
      rating: 5,
      reviewCount: 0,
      completionRate: 1,
      responseTimeSeconds: 60,
      verified: false,
      serviceRadiusKm: body.serviceRadiusKm ?? 10,
      location: {
        lat: 41,
        lng: 29,
        city: body.city,
        district: body.district,
        mahalle: body.mahalle
      },
      availability: [],
      hourlyPrice: body.hourlyPrice ?? 20,
      bankName: body.bankName ?? "",
      accountHolderName: body.accountHolderName ?? "",
      iban: body.iban ?? ""
    };
    db.workers.push(worker);
    authSecrets.workerPasswordHashes[worker.id] = hashPassword(body.password);
    return { user: worker, role: "worker", token: `dev-token-${worker.id}` };
  });

  app.post("/auth/login", async (req, reply) => {
    const { email, password, role } = z
      .object({
        email: z.string().email(),
        password: z.string().min(8),
        role: z.enum(["customer", "worker"]).optional()
      })
      .parse(req.body);
    const normalizedEmail = email.trim().toLowerCase();
    const existingCustomer = db.customers.find((customer) => customer.email?.toLowerCase() === normalizedEmail);
    if (existingCustomer) {
      if (role === "worker") {
        return reply.status(401).send({ message: "This email is registered as a customer account." });
      }
      const storedHash = authSecrets.customerPasswordHashes[existingCustomer.id];
      if (!storedHash) {
        authSecrets.customerPasswordHashes[existingCustomer.id] = hashPassword(password);
      } else if (!verifyPassword(password, storedHash)) {
        return reply.status(401).send({ message: "Invalid email or password." });
      }
      return { user: existingCustomer, role: "customer", token: `dev-token-${existingCustomer.id}` };
    }

    const existingWorker = db.workers.find((worker) => worker.email?.toLowerCase() === normalizedEmail);
    if (existingWorker) {
      if (role === "customer") {
        return reply.status(401).send({ message: "This email is registered as a worker account." });
      }
      const storedHash = authSecrets.workerPasswordHashes[existingWorker.id];
      if (!storedHash) {
        authSecrets.workerPasswordHashes[existingWorker.id] = hashPassword(password);
      } else if (!verifyPassword(password, storedHash)) {
        return reply.status(401).send({ message: "Invalid email or password." });
      }
      return { user: existingWorker, role: "worker", token: `dev-token-${existingWorker.id}` };
    }

    return reply.status(401).send({ message: "No account found for this email." });
  });

  app.get("/customers/:customerId/profile", async (req, reply) => {
    const params = z.object({ customerId: z.string() }).parse(req.params);
    const customer = db.customers.find((item) => item.id === params.customerId);
    if (!customer) {
      return reply.status(404).send({ message: "Customer not found" });
    }
    return { user: customer };
  });

  app.put("/customers/:customerId/profile", async (req, reply) => {
    const params = z.object({ customerId: z.string() }).parse(req.params);
    const body = z
      .object({
        fullName: z.string().min(2).optional(),
        email: z.string().email().optional(),
        phone: z.string().min(3).optional(),
        city: z.string().min(2).optional(),
        district: z.string().optional(),
        avatarUrl: z.string().max(2_000_000).nullable().optional()
      })
      .parse(req.body);

    const customer = db.customers.find((item) => item.id === params.customerId);
    if (!customer) {
      return reply.status(404).send({ message: "Customer not found" });
    }

    if (body.fullName !== undefined) customer.fullName = body.fullName;
    if (body.email !== undefined) customer.email = body.email;
    if (body.phone !== undefined) customer.phone = body.phone;
    if (body.city !== undefined) customer.location.city = body.city;
    if (body.district !== undefined) customer.location.district = body.district;
    if (body.avatarUrl !== undefined) customer.avatarUrl = body.avatarUrl ?? undefined;

    return { user: customer };
  });

  app.get("/customers/:customerId/jobs", async (req) => {
    const params = z.object({ customerId: z.string() }).parse(req.params);
    const jobs = db.jobs
      .filter((item) => item.customerId === params.customerId)
      .sort((left, right) => right.scheduledAt.localeCompare(left.scheduledAt));

    return {
      jobs: jobs.map((job) => ({
        ...job,
        workerName: job.workerId ? db.workers.find((item) => item.id === job.workerId)?.fullName ?? "" : "",
        reviewed: db.reviews.some((item) => item.jobId === job.id)
      }))
    };
  });

  app.get("/services", async () => ({
    categories: [
      "electrician",
      "plumber",
      "cleaning",
      "painting",
      "ac-repair",
      "moving",
      "other"
    ]
  }));

  app.get("/workers/search", async (req) => {
    const query = z
      .object({
        category: z.string(),
        city: z.string().optional(),
        minRating: z.coerce.number().optional(),
        maxPrice: z.coerce.number().optional()
      })
      .parse(req.query);

    const workers = db.workers.filter((worker) => {
      if (!worker.categories.includes(query.category as any)) {
        return false;
      }
      if (query.city && worker.location.city !== query.city) {
        return false;
      }
      if (query.minRating && worker.rating < query.minRating) {
        return false;
      }
      if (query.maxPrice && worker.hourlyPrice > query.maxPrice) {
        return false;
      }
      return true;
    });

    return { workers };
  });

  app.put("/workers/:workerId/profile", async (req, reply) => {
    const params = z.object({ workerId: z.string() }).parse(req.params);
    const body = z
      .object({
        fullName: z.string().min(2).optional(),
        email: z.string().email().optional(),
        phone: z.string().min(3).optional(),
        bio: z.string().optional(),
        categories: z
          .array(
            z.enum(["electrician", "plumber", "cleaning", "painting", "ac-repair", "moving", "other"])
          )
          .optional(),
        experienceYears: z.number().optional(),
        hourlyPrice: z.number().positive().optional(),
        iban: z.string().optional(),
        bankName: z.string().optional(),
        accountHolderName: z.string().optional(),
        serviceRadiusKm: z.number().positive().optional(),
        city: z.string().optional(),
        district: z.string().optional(),
        documentsUploaded: z.boolean().optional(),
        avatarUrl: z.string().max(2_000_000).nullable().optional()
      })
      .parse(req.body);

    const worker = db.workers.find((item) => item.id === params.workerId);
    if (!worker) {
      return reply.status(404).send({ message: "Worker not found" });
    }

  if (body.fullName !== undefined) worker.fullName = body.fullName;
  if (body.email !== undefined) worker.email = body.email;
  if (body.phone !== undefined) worker.phone = body.phone;
    if (body.bio !== undefined) worker.bio = body.bio;
    if (body.categories !== undefined) worker.categories = body.categories;
    if (body.experienceYears !== undefined) worker.experienceYears = body.experienceYears;
    if (body.hourlyPrice !== undefined) worker.hourlyPrice = body.hourlyPrice;
    if (body.iban !== undefined) worker.iban = body.iban;
  if (body.bankName !== undefined) worker.bankName = body.bankName;
  if (body.accountHolderName !== undefined) worker.accountHolderName = body.accountHolderName;
    if (body.serviceRadiusKm !== undefined) worker.serviceRadiusKm = body.serviceRadiusKm;
    if (body.city !== undefined) worker.location.city = body.city;
    if (body.district !== undefined) worker.location.district = body.district;
    if (body.avatarUrl !== undefined) worker.avatarUrl = body.avatarUrl ?? undefined;
    if (body.documentsUploaded) worker.verified = true;

    return { worker };
  });

  app.put("/workers/:workerId/availability", async (req, reply) => {
    const params = z.object({ workerId: z.string() }).parse(req.params);
    const body = z
      .object({
        availability: z.array(
          z.object({ weekday: z.number().min(0).max(6), from: z.string(), to: z.string() })
        )
      })
      .parse(req.body);

    const worker = db.workers.find((item) => item.id === params.workerId);
    if (!worker) {
      return reply.status(404).send({ message: "Worker not found" });
    }
    worker.availability = body.availability;
    return { worker };
  });

  app.post("/jobs/request", async (req, reply) => {
    const payload = requestJobSchema.parse(req.body);
    const customer = db.customers.find((item) => item.id === payload.customerId);
    if (!customer) {
      return reply.status(404).send({ message: "Customer not found" });
    }

    const worker = db.workers.find((item) => item.id === payload.workerId);
    if (!worker) {
      return reply.status(404).send({ message: "Worker not found" });
    }

    if (!worker.categories.includes(payload.category)) {
      return reply.status(400).send({ message: "Worker does not offer this service category" });
    }

    const job = {
      id: makeId("job"),
      customerId: payload.customerId,
      workerId: payload.workerId,
      category: payload.category,
      title: payload.title,
      description: payload.description,
      scheduledAt: payload.scheduledAt,
      location: payload.location,
      amount: payload.amount,
      commissionRate: db.commissionRate,
      status: "requested" as const,
      createdAt: now(),
      updatedAt: now()
    };
    db.jobs.push(job);

    io.to(`worker:${payload.workerId}`).emit("job:new", { job });
    io.to(`customer:${job.customerId}`).emit("job:pending", { job });
    io.to("admins").emit("admin:event", { type: "job_requested", jobId: job.id });

    return { job };
  });

  app.post("/jobs/:jobId/respond", async (req, reply) => {
    const params = z.object({ jobId: z.string() }).parse(req.params);
    const body = z
      .object({
        workerId: z.string(),
        decision: z.enum(["accept", "reject"])
      })
      .parse(req.body);

    const job = db.jobs.find((item) => item.id === params.jobId);
    if (!job) {
      return reply.status(404).send({ message: "Job not found" });
    }

    if (job.status !== "requested") {
      return reply.status(409).send({ message: "This job is not awaiting a response" });
    }

    if (job.workerId != null && job.workerId !== body.workerId) {
      return reply.status(403).send({ message: "You are not assigned to this request" });
    }

    if (body.decision === "reject") {
      touchJob(job, "cancelled");
      const reason = "Worker declined";
      io.to(`customer:${job.customerId}`).emit("job:cancelled", { job, reason });
      io.to(`worker:${body.workerId}`).emit("job:cancelled", { job, reason });
      io.to("admins").emit("admin:event", { type: "job_cancelled", jobId: job.id });
      return { ok: true, job };
    }

    if (job.workerId == null) {
      job.workerId = body.workerId;
    }
    touchJob(job, "accepted");
    const payment = createEscrowPayment(job);

    io.to(`customer:${job.customerId}`).emit("job:accepted", { job, payment });
    io.to(`worker:${job.workerId}`).emit("job:accepted", { job, payment });
    io.to("admins").emit("admin:event", { type: "job_accepted", jobId: job.id });

    return { job, payment };
  });

  app.post("/jobs/:jobId/start", async (req, reply) => {
    const params = z.object({ jobId: z.string() }).parse(req.params);
    const job = db.jobs.find((item) => item.id === params.jobId);
    if (!job) {
      return reply.status(404).send({ message: "Job not found" });
    }
    touchJob(job, "in_progress");
    io.to(`customer:${job.customerId}`).emit("job:started", { job });
    return { job };
  });

  app.post("/jobs/:jobId/complete", async (req, reply) => {
    const params = z.object({ jobId: z.string() }).parse(req.params);
    const job = db.jobs.find((item) => item.id === params.jobId);
    if (!job) {
      return reply.status(404).send({ message: "Job not found" });
    }
    touchJob(job, "completed");
    io.to(`customer:${job.customerId}`).emit("job:completed", { job });
    return { job };
  });

  app.post("/jobs/:jobId/confirm", async (req, reply) => {
    const params = z.object({ jobId: z.string() }).parse(req.params);
    const job = db.jobs.find((item) => item.id === params.jobId);
    if (!job) {
      return reply.status(404).send({ message: "Job not found" });
    }
    touchJob(job, "confirmed");
    const payment = releaseEscrowPayment(job.id);
    io.to(`worker:${payment.workerId}`).emit("payment:released", payment);
    io.to("admins").emit("admin:event", { type: "payment_released", jobId: job.id });
    return { job, payment };
  });

  app.post("/jobs/:jobId/cancel", async (req, reply) => {
    const params = z.object({ jobId: z.string() }).parse(req.params);
    const body = z.object({ reason: z.string().min(2) }).parse(req.body);
    const job = db.jobs.find((item) => item.id === params.jobId);
    if (!job) {
      return reply.status(404).send({ message: "Job not found" });
    }
    touchJob(job, "cancelled");

    const payment = db.payments.find((item) => item.jobId === job.id);
    if (payment && payment.status === "escrowed") {
      payment.status = "refunded";
      payment.updatedAt = now();
    }

    io.to(`customer:${job.customerId}`).emit("job:cancelled", { job, reason: body.reason });
    if (job.workerId) {
      io.to(`worker:${job.workerId}`).emit("job:cancelled", { job, reason: body.reason });
    }
    io.to("admins").emit("admin:event", { type: "job_cancelled", jobId: job.id });

    return { job, refund: payment?.status === "refunded" };
  });

  app.post("/jobs/:jobId/dispute", async (req, reply) => {
    const params = z.object({ jobId: z.string() }).parse(req.params);
    const body = z.object({ reason: z.string().min(5), openedBy: z.enum(["customer", "worker"]) }).parse(req.body);
    const job = db.jobs.find((item) => item.id === params.jobId);
    if (!job) {
      return reply.status(404).send({ message: "Job not found" });
    }
    touchJob(job, "disputed");
    io.to("admins").emit("admin:event", {
      type: "dispute_opened",
      jobId: job.id,
      openedBy: body.openedBy,
      reason: body.reason
    });
    return { job };
  });

  app.post("/reviews", async (req, reply) => {
    const body = z
      .object({
        jobId: z.string(),
        customerId: z.string(),
        workerId: z.string(),
        rating: z.number().min(1).max(5),
        text: z.string().min(2)
      })
      .parse(req.body);

    const job = db.jobs.find((item) => item.id === body.jobId);
    if (!job) {
      return reply.status(404).send({ message: "Job not found" });
    }

    const review = {
      id: makeId("rev"),
      ...body,
      createdAt: now()
    };
    db.reviews.push(review);

    const workerReviews = db.reviews.filter((item) => item.workerId === body.workerId);
    const worker = db.workers.find((item) => item.id === body.workerId);
    if (worker) {
      const average =
        workerReviews.reduce((sum, current) => sum + current.rating, 0) / workerReviews.length;
      worker.rating = Number(average.toFixed(2));
      worker.reviewCount = workerReviews.length;
    }

    return { review, worker };
  });

  app.get("/workers/:workerId/jobs", async (req) => {
    const params = z.object({ workerId: z.string() }).parse(req.params);
    const upcoming = db.jobs.filter(
      (item) => item.workerId === params.workerId && ["accepted", "in_progress"].includes(item.status)
    );
    const past = db.jobs.filter(
      (item) => item.workerId === params.workerId && ["completed", "confirmed", "cancelled"].includes(item.status)
    );
    const withCustomerName = (job: typeof upcoming[number]) => ({
      ...job,
      customerName: db.customers.find((item) => item.id === job.customerId)?.fullName ?? ""
    });
    return { upcoming: upcoming.map(withCustomerName), past: past.map(withCustomerName) };
  });

  app.get("/workers/:workerId/requests", async (req) => {
    const params = z.object({ workerId: z.string() }).parse(req.params);
    const worker = db.workers.find((item) => item.id === params.workerId);
    if (!worker) {
      return { requests: [] };
    }

    const requests = db.jobs
      .filter(
        (item) =>
          item.status === "requested" &&
          worker.categories.includes(item.category) &&
          (item.workerId == null || item.workerId === params.workerId)
      )
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt));

    return {
      requests: requests.map((job) => ({
        ...job,
        customerName: db.customers.find((item) => item.id === job.customerId)?.fullName ?? ""
      }))
    };
  });

  app.get("/workers/:workerId/earnings", async (req) => {
    const params = z.object({ workerId: z.string() }).parse(req.params);
    const payments = db.payments.filter((item) => item.workerId === params.workerId);
    const released = payments
      .filter((item) => item.status === "released")
      .reduce((sum, current) => sum + current.payoutAmount, 0);
    const escrowed = payments
      .filter((item) => item.status === "escrowed")
      .reduce((sum, current) => sum + current.payoutAmount, 0);

    return {
      totalReleased: Number(released.toFixed(2)),
      pendingEscrow: Number(escrowed.toFixed(2)),
      payouts: payments
    };
  });

  app.get("/admin/overview", async () => {
    const totalRevenue = db.payments.reduce((sum, item) => sum + item.commissionAmount, 0);
    const jobStatusBreakdown = db.jobs.reduce<Record<string, number>>((acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    }, {});

    return {
      users: {
        customers: db.customers.length,
        workers: db.workers.length
      },
      jobs: {
        total: db.jobs.length,
        byStatus: jobStatusBreakdown
      },
      finance: {
        totalCommissionRevenue: Number(totalRevenue.toFixed(2)),
        payments: db.payments.length
      },
      disputes: {
        open: db.jobs.filter((item) => item.status === "disputed").length
      }
    };
  });

  app.put("/admin/settings/commission", async (req) => {
    const body = z.object({ rate: z.number().min(0).max(0.5) }).parse(req.body);
    db.commissionRate = body.rate;
    io.to("admins").emit("admin:event", { type: "commission_updated", rate: body.rate });
    return { commissionRate: db.commissionRate };
  });

  app.get("/admin/workers/pending", async () => {
    const pending = db.workers.filter((w) => !w.verified);
    return { workers: pending };
  });

  app.put("/admin/workers/:workerId/approve", async (req, reply) => {
    const { workerId } = z.object({ workerId: z.string() }).parse(req.params);
    const worker = db.workers.find((w) => w.id === workerId);
    if (!worker) return reply.status(404).send({ message: "Worker not found" });
    worker.verified = true;
    io.to("admins").emit("admin:event", { type: "worker_approved", jobId: workerId });
    return { worker };
  });
};