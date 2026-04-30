import type {
  CustomerProfile,
  Job,
  LocationPoint,
  Payment,
  Review,
  ServiceCategory,
  WorkerProfile
} from "@ustaya/shared";

const now = () => new Date().toISOString();

const istanbul: LocationPoint = { lat: 41.0082, lng: 28.9784, city: "Istanbul", district: "Fatih" };

export const db = {
  workers: [
    {
      id: "w1",
      fullName: "Mehmet Kaya",
      email: "mehmet@example.com",
      phone: "+90 555 111 2233",
      bio: "Certified electrician with 8 years of residential experience.",
      categories: ["electrician"],
      experienceYears: 8,
      rating: 4.8,
      reviewCount: 126,
      completionRate: 0.97,
      responseTimeSeconds: 55,
      verified: true,
      iban: "TR000000000000000000000001",
      serviceRadiusKm: 18,
      location: istanbul,
      availability: [
        { weekday: 1, from: "08:00", to: "22:00" },
        { weekday: 2, from: "08:00", to: "22:00" },
        { weekday: 3, from: "08:00", to: "22:00" },
        { weekday: 4, from: "08:00", to: "22:00" },
        { weekday: 5, from: "08:00", to: "22:00" }
      ],
      hourlyPrice: 35,
      bankName: "Ziraat Bankasi",
      accountHolderName: "Mehmet Kaya"
    },
    {
      id: "w2",
      fullName: "Ayse Demir",
      email: "ayse@example.com",
      phone: "+90 555 444 5566",
      bio: "Fast and detail-focused cleaner for home and office tasks.",
      categories: ["cleaning"],
      experienceYears: 5,
      rating: 4.6,
      reviewCount: 88,
      completionRate: 0.95,
      responseTimeSeconds: 70,
      verified: true,
      iban: "TR000000000000000000000002",
      serviceRadiusKm: 14,
      location: { lat: 41.03, lng: 29.0, city: "Istanbul", district: "Besiktas" },
      availability: [
        { weekday: 1, from: "09:00", to: "18:00" },
        { weekday: 2, from: "09:00", to: "18:00" },
        { weekday: 3, from: "09:00", to: "18:00" },
        { weekday: 4, from: "09:00", to: "18:00" },
        { weekday: 5, from: "09:00", to: "18:00" },
        { weekday: 6, from: "10:00", to: "16:00" }
      ],
      hourlyPrice: 25,
      bankName: "Is Bankasi",
      accountHolderName: "Ayse Demir"
    }
  ] as WorkerProfile[],
  customers: [
    {
      id: "c1",
      fullName: "Zeynep Yilmaz",
      email: "zeynep@example.com",
      phone: "+90 555 987 6543",
      location: { lat: 41.015, lng: 28.98, city: "Istanbul", district: "Beyoglu" }
    }
  ] as CustomerProfile[],
  jobs: [] as Job[],
  payments: [] as Payment[],
  reviews: [] as Review[],
  commissionRate: 0.12
};

export const authSecrets = {
  customerPasswordHashes: {} as Record<string, string>,
  workerPasswordHashes: {} as Record<string, string>
};

export const makeId = (prefix: string) => `${prefix}_${Math.random().toString(36).slice(2, 10)}`;

export const upsertWorkerCategory = (workerId: string, category: ServiceCategory) => {
  const worker = db.workers.find((item) => item.id === workerId);
  if (!worker) {
    return;
  }
  if (!worker.categories.includes(category)) {
    worker.categories.push(category);
  }
};

export const touchJob = (job: Job, status: Job["status"]) => {
  job.status = status;
  job.updatedAt = now();
};
