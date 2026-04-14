import type { Job, Payment } from "@ustaya/shared";
import { db, makeId } from "./store.js";

const timestamp = () => new Date().toISOString();

export const createEscrowPayment = (job: Job): Payment => {
  if (!job.workerId) {
    throw new Error("Cannot create payment before assigning worker");
  }

  const commissionAmount = Number((job.amount * job.commissionRate).toFixed(2));
  const payoutAmount = Number((job.amount - commissionAmount).toFixed(2));
  const payment: Payment = {
    id: makeId("pay"),
    jobId: job.id,
    customerId: job.customerId,
    workerId: job.workerId,
    grossAmount: job.amount,
    commissionAmount,
    payoutAmount,
    status: "escrowed",
    createdAt: timestamp(),
    updatedAt: timestamp()
  };

  db.payments.push(payment);
  return payment;
};

export const releaseEscrowPayment = (jobId: string) => {
  const payment = db.payments.find((item) => item.jobId === jobId);
  if (!payment) {
    throw new Error("Payment not found");
  }
  payment.status = "released";
  payment.updatedAt = timestamp();
  return payment;
};
