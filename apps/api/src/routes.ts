import type { FastifyInstance } from "fastify";
import type { Server } from "socket.io";
import { z } from "zod";
import { rankWorkers } from "./matching.js";
import { createEscrowPayment, releaseEscrowPayment } from "./payments.js";
import { db, makeId, touchJob } from "./store.js";

const now = () => new Date().toISOString();

const requestJobSchema = z.object({
  customerId: z.string(),
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
        email: z.string().email().optional(),
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

    if (body.role === "customer") {
      const customer = {
        id: makeId("c"),
        fullName: body.fullName,
        location: {
          lat: 41,
          lng: 29,
          city: body.city,
          district: body.district
        }
      };
      db.customers.push(customer);
      return { user: customer, token: `dev-token-${customer.id}` };
    }

    const worker = {
      id: makeId("w"),
      fullName: body.fullName,
      bio: body.bio ?? "New worker profile",
      categories: body.categories ?? ["other"],
      experienceYears: body.experienceYears ?? 0,
      rating: 5,
      reviewCount: 0,
      completionRate: 1,
      responseTimeSeconds: 60,
      verified: false,
      iban: body.iban ?? "",
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
    return { user: worker, token: `dev-token-${worker.id}` };
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
        bio: z.string().optional(),
        categories: z
          .array(
            z.enum(["electrician", "plumber", "cleaning", "painting", "ac-repair", "moving", "other"])
          )
          .optional(),
        experienceYears: z.number().optional(),
        hourlyPrice: z.number().positive().optional(),
        iban: z.string().optional(),
        serviceRadiusKm: z.number().positive().optional(),
        city: z.string().optional(),
        district: z.string().optional(),
        documentsUploaded: z.boolean().optional()
      })
      .parse(req.body);

    const worker = db.workers.find((item) => item.id === params.workerId);
    if (!worker) {
      return reply.status(404).send({ message: "Worker not found" });
    }

    if (body.bio !== undefined) worker.bio = body.bio;
    if (body.categories !== undefined) worker.categories = body.categories;
    if (body.experienceYears !== undefined) worker.experienceYears = body.experienceYears;
    if (body.hourlyPrice !== undefined) worker.hourlyPrice = body.hourlyPrice;
    if (body.iban !== undefined) worker.iban = body.iban;
    if (body.serviceRadiusKm !== undefined) worker.serviceRadiusKm = body.serviceRadiusKm;
    if (body.city !== undefined) worker.location.city = body.city;
    if (body.district !== undefined) worker.location.district = body.district;
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

    const candidates = db.workers.filter((item) => item.categories.includes(payload.category));
    const ranked = rankWorkers(candidates, payload.location).slice(0, 7);

    const job = {
      id: makeId("job"),
      customerId: payload.customerId,
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

    for (const match of ranked) {
      io.to(`worker:${match.worker.id}`).emit("job:new", {
        job,
        recommendationScore: match.recommendationScore,
        distanceKm: match.distanceKm
      });
    }

    io.to("admins").emit("admin:event", { type: "job_requested", jobId: job.id });

    return {
      job,
      suggestedWorkers: ranked.map((item) => ({
        workerId: item.worker.id,
        score: Number(item.recommendationScore.toFixed(3)),
        distanceKm: Number(item.distanceKm.toFixed(1))
      }))
    };
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

    if (body.decision === "reject") {
      return { ok: true, message: "Worker rejected" };
    }

    if (job.workerId) {
      return reply.status(409).send({ message: "Job already assigned" });
    }

    job.workerId = body.workerId;
    touchJob(job, "accepted");
    const payment = createEscrowPayment(job);

    io.to(`customer:${job.customerId}`).emit("job:accepted", { job, payment });
    io.to(`worker:${body.workerId}`).emit("job:accepted", { job, payment });
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
    return { upcoming, past };
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
};