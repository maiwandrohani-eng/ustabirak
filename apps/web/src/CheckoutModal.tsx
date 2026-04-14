import { useState } from "react";
import type { WorkerProfile } from "@ustaya/shared";
import { apiPost } from "./api";

export interface BookingRecord {
  id: string;
  service: string;
  worker: string;
  date: string;
  time: string;
  amount: number;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  reviewed?: boolean;
}

interface Props {
  worker: WorkerProfile;
  serviceTitle: string;
  catId: string;
  onClose: () => void;
  onSuccess: (booking: BookingRecord) => void;
}

const today = new Date().toISOString().split("T")[0];

export default function CheckoutModal({ worker, serviceTitle, catId, onClose, onSuccess }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("10:00");
  const [notes, setNotes] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [jobId, setJobId] = useState("");

  const total = worker.hourlyPrice;

  const formatCard = (val: string) =>
    val.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);

  const formatExpiry = (val: string) => {
    const d = val.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d;
  };

  const validateStep1 = () => {
    if (!date) { setError("Please select a date."); return false; }
    if (!time) { setError("Please select a time."); return false; }
    setError("");
    return true;
  };

  const validateStep2 = () => {
    if (!cardHolder.trim()) { setError("Enter cardholder name."); return false; }
    if (cardNumber.replace(/\s/g, "").length < 16) { setError("Enter a valid 16-digit card number."); return false; }
    if (expiry.length < 5) { setError("Enter expiry as MM/YY."); return false; }
    if (cvv.length < 3) { setError("Enter a 3-digit CVV."); return false; }
    setError("");
    return true;
  };

  const handleConfirm = async () => {
    if (!validateStep2()) return;
    setLoading(true);
    try {
      const scheduledAt = new Date(`${date}T${time}`).toISOString();
      const res = await apiPost<{ job: { id: string } }>("/jobs/request", {
        customerId: "c1",
        category: catId,
        title: serviceTitle,
        description: notes || `Booked via UstaYolda — ${serviceTitle}`,
        scheduledAt,
        amount: total,
        location: { lat: 41.015, lng: 28.98, city: "Istanbul", district: "Beyoglu" },
      });
      setJobId(res.job.id);
      setStep(3);
      onSuccess({
        id: res.job.id,
        service: serviceTitle,
        worker: worker.fullName,
        date,
        time,
        amount: total,
        status: "pending",
      });
    } catch {
      setError("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="checkout-modal">
        <button className="checkout-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="checkout-header">
          <h2 className="checkout-title">
            {step === 3 ? "Booking Confirmed!" : `Book ${worker.fullName}`}
          </h2>
          {step !== 3 && (
            <div className="checkout-steps">
              {[1, 2].map((n) => (
                <div key={n} className={`checkout-step-dot${step >= n ? " checkout-step-dot--active" : ""}`}>
                  {n}
                </div>
              ))}
              <div className="checkout-step-label">
                {step === 1 ? "Schedule" : "Payment"}
              </div>
            </div>
          )}
        </div>

        {step !== 3 && (
          <div className="checkout-worker-summary">
            <div className="checkout-worker-avatar">{worker.fullName.charAt(0)}</div>
            <div className="checkout-worker-info">
              <span className="checkout-worker-name">{worker.fullName}</span>
              <span className="checkout-service-title">{serviceTitle}</span>
            </div>
            <div className="checkout-worker-price">₺{worker.hourlyPrice}<span>/hr</span></div>
          </div>
        )}

        {/* ── Step 1: Schedule ── */}
        {step === 1 && (
          <div className="checkout-body">
            <div className="checkout-row-2">
              <div className="checkout-field-group">
                <label className="checkout-label">Date</label>
                <input
                  className="checkout-input"
                  type="date"
                  value={date}
                  min={today}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="checkout-field-group">
                <label className="checkout-label">Time</label>
                <input
                  className="checkout-input"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            <div className="checkout-field-group">
              <label className="checkout-label">Notes for worker <span className="optional">(optional)</span></label>
              <textarea
                className="checkout-textarea"
                placeholder="Any special instructions or access notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
            {error && <p className="checkout-error">{error}</p>}
            <div className="checkout-total-row">
              <span>Estimated total</span>
              <strong>₺{total}</strong>
            </div>
            <button className="btn-primary checkout-cta" onClick={() => { if (validateStep1()) setStep(2); }}>
              Continue to Payment →
            </button>
          </div>
        )}

        {/* ── Step 2: Payment ── */}
        {step === 2 && (
          <div className="checkout-body">
            <div className="checkout-card-preview">
              <div className="card-chip" />
              <div className="card-number">{cardNumber || "**** **** **** ****"}</div>
              <div className="card-bottom">
                <span>{cardHolder || "CARD HOLDER"}</span>
                <span>{expiry || "MM/YY"}</span>
              </div>
            </div>

            <div className="checkout-field-group">
              <label className="checkout-label">Cardholder Name</label>
              <input
                className="checkout-input"
                type="text"
                placeholder="As shown on card"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
              />
            </div>
            <div className="checkout-field-group">
              <label className="checkout-label">Card Number</label>
              <input
                className="checkout-input"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCard(e.target.value))}
                maxLength={19}
                inputMode="numeric"
              />
            </div>
            <div className="checkout-row-2">
              <div className="checkout-field-group">
                <label className="checkout-label">Expiry</label>
                <input
                  className="checkout-input"
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  maxLength={5}
                  inputMode="numeric"
                />
              </div>
              <div className="checkout-field-group">
                <label className="checkout-label">CVV</label>
                <input
                  className="checkout-input"
                  type="password"
                  placeholder="•••"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  maxLength={3}
                  inputMode="numeric"
                />
              </div>
            </div>
            {error && <p className="checkout-error">{error}</p>}
            <div className="checkout-total-row">
              <span>Total to be charged</span>
              <strong>₺{total}</strong>
            </div>
            <div className="checkout-actions">
              <button className="btn-ghost" onClick={() => { setStep(1); setError(""); }}>← Back</button>
              <button className="btn-primary checkout-cta" onClick={handleConfirm} disabled={loading}>
                {loading ? "Processing…" : `Confirm & Pay ₺${total}`}
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Confirmed ── */}
        {step === 3 && (
          <div className="checkout-confirmed">
            <div className="checkout-confirmed-icon">🎉</div>
            <p className="checkout-confirmed-text">
              Your booking with <strong>{worker.fullName}</strong> is confirmed!
            </p>
            <div className="checkout-confirmed-details">
              <div className="checkout-detail-row">
                <span>Service</span>
                <strong>{serviceTitle}</strong>
              </div>
              <div className="checkout-detail-row">
                <span>Date &amp; Time</span>
                <strong>{date} at {time}</strong>
              </div>
              <div className="checkout-detail-row">
                <span>Amount charged</span>
                <strong>₺{total}</strong>
              </div>
              <div className="checkout-detail-row">
                <span>Booking ID</span>
                <strong className="job-id-text">{jobId}</strong>
              </div>
            </div>
            <p className="checkout-confirmed-note">
              You'll receive a confirmation email shortly. The worker will contact you before arrival.
            </p>
            <button className="btn-primary" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}
