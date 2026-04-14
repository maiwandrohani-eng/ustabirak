import { useState } from "react";
import type { BookingRecord } from "./CheckoutModal";
import ReviewModal from "./ReviewModal";

interface Props {
  user: { id: string; fullName: string; role: string };
  bookings: BookingRecord[];
  onBack: () => void;
  onNavigate: (page: string | null) => void;
}

const HISTORY: BookingRecord[] = [
  { id: "JOB-A1B2", service: "Deep Cleaning", worker: "Leila M.", date: "2026-04-05", time: "10:00", amount: 450, status: "completed" },
  { id: "JOB-C3D4", service: "IKEA Furniture Assembly", worker: "Deniz Y.", date: "2026-04-01", time: "13:00", amount: 199, status: "completed", reviewed: true },
  { id: "JOB-E5F6", service: "TV Mounting", worker: "Aryan K.", date: "2026-03-28", time: "15:00", amount: 269, status: "completed", reviewed: true },
  { id: "JOB-G7H8", service: "Moving Help", worker: "Berk S.", date: "2026-03-15", time: "09:00", amount: 520, status: "cancelled" },
];

const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  "in-progress": "#3b82f6",
  completed: "#10b981",
  cancelled: "#ef4444",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  "in-progress": "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const STATUS_ICONS: Record<string, string> = {
  pending: "🕐",
  "in-progress": "🔵",
  completed: "✅",
  cancelled: "❌",
};

export default function MyBookingsPage({ user, bookings, onBack, onNavigate }: Props) {
  const [reviewBooking, setReviewBooking] = useState<BookingRecord | null>(null);
  const [reviewedIds, setReviewedIds] = useState<string[]>([]);

  const allBookings = [...bookings, ...HISTORY];
  const active = allBookings.filter((b) => b.status === "pending" || b.status === "in-progress");
  const past = allBookings.filter((b) => b.status === "completed" || b.status === "cancelled");

  return (
    <div className="root">
      <nav className="navbar">
        <div className="navbar-inner">
          <button className="nav-logo-btn" onClick={() => onNavigate(null)} aria-label="Home">
            <img src="/logo.png" alt="UstaYolda" height={72} />
          </button>
          <div className="nav-links">
            <button className="nav-link nav-link-btn" onClick={() => onNavigate("__services")}>Services</button>
            <button className="nav-link nav-link-btn" onClick={() => onNavigate("__workers")}>Workers</button>
          </div>
          <div className="nav-auth">
            <div className="nav-user">
              <span className="nav-user-avatar">{user.fullName.charAt(0).toUpperCase()}</span>
              <span className="nav-user-name">{user.fullName}</span>
              <button className="btn-ghost" onClick={() => onNavigate(null)}>Home</button>
            </div>
          </div>
        </div>
      </nav>

      <section className="myb-page">
        <div className="myb-inner">
          <button className="static-back-btn" onClick={onBack}>← Back</button>
          <h1 className="myb-title">My Bookings</h1>

          {/* Active & Upcoming */}
          {active.length > 0 && (
            <>
              <h2 className="myb-section-heading">Active &amp; Upcoming</h2>
              <div className="myb-list">
                {active.map((b) => (
                  <div className="myb-card" key={b.id}>
                    <div className="myb-card-main">
                      <div className="myb-card-icon">{STATUS_ICONS[b.status]}</div>
                      <div className="myb-card-info">
                        <span className="myb-service">{b.service}</span>
                        <span className="myb-worker">with {b.worker}</span>
                        <span className="myb-datetime">{b.date} at {b.time}</span>
                      </div>
                    </div>
                    <div className="myb-card-right">
                      <span className="myb-amount">₺{b.amount}</span>
                      <span
                        className="myb-status-badge"
                        style={{ background: STATUS_COLORS[b.status] + "22", color: STATUS_COLORS[b.status] }}
                      >
                        {STATUS_LABELS[b.status]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Past Bookings */}
          <h2 className="myb-section-heading" style={{ marginTop: active.length > 0 ? "2.5rem" : 0 }}>
            Past Bookings
          </h2>
          {past.length === 0 ? (
            <div className="myb-empty">
              <span className="myb-empty-icon">📅</span>
              <p>No past bookings yet.{" "}
                <button className="link-btn" onClick={() => onNavigate("__services")}>
                  Browse services
                </button>{" "}
                to get started.
              </p>
            </div>
          ) : (
            <div className="myb-list">
              {past.map((b) => {
                const canReview = b.status === "completed" && !b.reviewed && !reviewedIds.includes(b.id);
                return (
                  <div className="myb-card" key={b.id}>
                    <div className="myb-card-main">
                      <div className="myb-card-icon">{STATUS_ICONS[b.status]}</div>
                      <div className="myb-card-info">
                        <span className="myb-service">{b.service}</span>
                        <span className="myb-worker">with {b.worker}</span>
                        <span className="myb-datetime">{b.date} at {b.time}</span>
                        <span className="myb-booking-id">#{b.id}</span>
                      </div>
                    </div>
                    <div className="myb-card-right">
                      <span className="myb-amount">₺{b.amount}</span>
                      {b.status === "completed" && !canReview && (
                        <span className="myb-reviewed-badge">⭐ Reviewed</span>
                      )}
                      {canReview && (
                        <button className="btn-ghost myb-review-btn" onClick={() => setReviewBooking(b)}>
                          Leave Review
                        </button>
                      )}
                      {b.status === "cancelled" && (
                        <span
                          className="myb-status-badge"
                          style={{ background: STATUS_COLORS.cancelled + "22", color: STATUS_COLORS.cancelled }}
                        >
                          Cancelled
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {reviewBooking && (
        <ReviewModal
          workerName={reviewBooking.worker}
          serviceTitle={reviewBooking.service}
          onClose={() => setReviewBooking(null)}
          onSubmit={() => {
            setReviewedIds((prev) => [...prev, reviewBooking.id]);
            setReviewBooking(null);
          }}
        />
      )}
    </div>
  );
}
