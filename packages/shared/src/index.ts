export type Role = "customer" | "worker" | "admin";

export type ServiceCategory =
  | "electrician"
  | "plumber"
  | "cleaning"
  | "painting"
  | "ac-repair"
  | "moving"
  | "other";

export type JobStatus =
  | "requested"
  | "accepted"
  | "in_progress"
  | "completed"
  | "confirmed"
  | "cancelled"
  | "disputed";

export type PaymentStatus = "initiated" | "escrowed" | "released" | "refunded";

export interface LocationPoint {
  lat: number;
  lng: number;
  city: string;
  district?: string;
}

export interface AvailabilitySlot {
  weekday: number;
  from: string;
  to: string;
}

export interface WorkerProfile {
  id: string;
  fullName: string;
  bio: string;
  categories: ServiceCategory[];
  experienceYears: number;
  rating: number;
  reviewCount: number;
  completionRate: number;
  responseTimeSeconds: number;
  verified: boolean;
  iban: string;
  serviceRadiusKm: number;
  location: LocationPoint;
  availability: AvailabilitySlot[];
  hourlyPrice: number;
}

export interface CustomerProfile {
  id: string;
  fullName: string;
  location: LocationPoint;
}

export interface Job {
  id: string;
  category: ServiceCategory;
  customerId: string;
  workerId?: string;
  title: string;
  description: string;
  scheduledAt: string;
  location: LocationPoint;
  amount: number;
  commissionRate: number;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  jobId: string;
  customerId: string;
  workerId: string;
  grossAmount: number;
  commissionAmount: number;
  payoutAmount: number;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  jobId: string;
  workerId: string;
  customerId: string;
  rating: number;
  text: string;
  createdAt: string;
}

export const THEME = {
  bg: "#050505",
  surface: "#121212",
  primary: "#ff533f",
  primaryDark: "#ec4a37",
  gray: "#5f5c5d",
  graySoft: "#8f8a8b",
  text: "#f5f5f5"
};