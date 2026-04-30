import { useEffect, useState } from "react";
import { apiGet, apiPost } from "./api";
import type { BookingRecord } from "./CheckoutModal";
import { useLang } from "./LangContext";
import ReviewModal from "./ReviewModal";
import { t } from "./translations";

interface Props {
  user: { id: string; fullName: string; role: string; avatarUrl?: string };
  onBack: () => void;
  onNavigate: (page: string | null) => void;
}

interface ApiCustomerJob {
  id: string;
  title: string;
  workerId?: string;
  workerName: string;
  scheduledAt: string;
  amount: number;
  status: "requested" | "accepted" | "in_progress" | "completed" | "confirmed" | "cancelled" | "disputed";
  reviewed: boolean;
}

interface DisplayBooking extends BookingRecord {
  workerId?: string;
}

const STATUS_COLORS: Record<BookingRecord["status"], string> = {
  pending: "#f59e0b",
  "in-progress": "#3b82f6",
  completed: "#10b981",
  cancelled: "#ef4444",
};

const STATUS_ICONS: Record<BookingRecord["status"], string> = {
  pending: "🕐",
  "in-progress": "🔵",
  completed: "✅",
  cancelled: "❌",
};

const toBookingStatus = (status: ApiCustomerJob["status"]): BookingRecord["status"] => {
  switch (status) {
    case "in_progress":
      return "in-progress";
    case "completed":
    case "confirmed":
      return "completed";
    case "cancelled":
    case "disputed":
      return "cancelled";
    default:
      return "pending";
  }
};

const toDisplayBooking = (job: ApiCustomerJob): DisplayBooking => {
  const scheduledAt = new Date(job.scheduledAt);
  return {
    id: job.id,
    service: job.title,
    worker: job.workerName,
    workerId: job.workerId,
    date: scheduledAt.toISOString().slice(0, 10),
    time: scheduledAt.toTimeString().slice(0, 5),
    amount: job.amount,
    status: toBookingStatus(job.status),
    reviewed: job.reviewed,
  };
};

export default function MyBookingsPage({ user, onBack, onNavigate }: Props) {
  const { lang } = useLang();
  const [bookings, setBookings] = useState<DisplayBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewBooking, setReviewBooking] = useState<DisplayBooking | null>(null);
  const [reviewedIds, setReviewedIds] = useState<string[]>([]);

  const statusLabels: Record<BookingRecord["status"], string> = {
    pending: t("myb_st_pending", lang),
    "in-progress": t("myb_st_ip", lang),
    completed: t("myb_st_done", lang),
    cancelled: t("myb_st_cancelled", lang),
  };

  useEffect(() => {
    let cancelled = false;

    const loadBookings = async () => {
      setLoading(true);
      try {
        const response = await apiGet<{ jobs: ApiCustomerJob[] }>(`/customers/${user.id}/jobs`);
        if (!cancelled) {
          setBookings(response.jobs.map(toDisplayBooking));
        }
      } catch {
        if (!cancelled) {
          setBookings([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadBookings();

    return () => {
      cancelled = true;
    };
  }, [user.id]);

  const active = bookings.filter((booking) => booking.status === "pending" || booking.status === "in-progress");
  const past = bookings.filter((booking) => booking.status === "completed" || booking.status === "cancelled");

  return (
    <div className="root">
      <nav className="navbar">
        <div className="navbar-inner">
          <button className="nav-logo-btn" onClick={() => onNavigate(null)} aria-label={t("home", lang)}>
            <img src="/logo.png" alt="UstaYolda" height={72} />
          </button>
          <div className="nav-links">
            <button className="nav-link nav-link-btn" onClick={() => onNavigate("__services")}>{t("nav_services", lang)}</button>
            <button className="nav-link nav-link-btn" onClick={() => onNavigate("__workers")}>{t("nav_workers", lang)}</button>
          </div>
          <div className="nav-auth">
            <div className="nav-user">
              <span className="nav-user-avatar">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                  />
                ) : (
                  user.fullName.charAt(0).toUpperCase()
                )}
              </span>
              <span className="nav-user-name">{user.fullName}</span>
              <button className="btn-ghost" onClick={() => onNavigate(null)}>{t("home", lang)}</button>
            </div>
          </div>
        </div>
      </nav>

      <section className="myb-page">
        <div className="myb-inner">
          <button className="static-back-btn" onClick={onBack}>{t("back", lang)}</button>
          <h1 className="myb-title">{t("myb_title", lang)}</h1>

          {loading ? (
            <div className="myb-empty">
              <span className="myb-empty-icon">⏳</span>
              <p>{t("myb_loading", lang)}</p>
            </div>
          ) : (
            <>
              {active.length > 0 && (
                <>
                  <h2 className="myb-section-heading">{t("myb_active", lang)}</h2>
                  <div className="myb-list">
                    {active.map((booking) => (
                      <div className="myb-card" key={booking.id}>
                        <div className="myb-card-main">
                          <div className="myb-card-icon">{STATUS_ICONS[booking.status]}</div>
                          <div className="myb-card-info">
                            <span className="myb-service">{booking.service}</span>
                            <span className="myb-worker">{t("myb_with", lang)} {booking.worker || t("myb_unassigned", lang)}</span>
                            <span className="myb-datetime">{booking.date} {t("at", lang)} {booking.time}</span>
                          </div>
                        </div>
                        <div className="myb-card-right">
                          <span className="myb-amount">₺{booking.amount}</span>
                          <span
                            className="myb-status-badge"
                            style={{ background: STATUS_COLORS[booking.status] + "22", color: STATUS_COLORS[booking.status] }}
                          >
                            {statusLabels[booking.status]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <h2 className="myb-section-heading" style={{ marginTop: active.length > 0 ? "2.5rem" : 0 }}>
                {t("myb_past", lang)}
              </h2>
              {past.length === 0 ? (
                <div className="myb-empty">
                  <span className="myb-empty-icon">📅</span>
                  <p>{t("myb_empty", lang)} {" "}
                    <button className="link-btn" onClick={() => onNavigate("__services")}>
                      {t("myb_browse", lang)}
                    </button>{" "}
                    {t("myb_to_start", lang)}
                  </p>
                </div>
              ) : (
                <div className="myb-list">
                  {past.map((booking) => {
                    const canReview = booking.status === "completed" && !booking.reviewed && !reviewedIds.includes(booking.id) && Boolean(booking.workerId);
                    return (
                      <div className="myb-card" key={booking.id}>
                        <div className="myb-card-main">
                          <div className="myb-card-icon">{STATUS_ICONS[booking.status]}</div>
                          <div className="myb-card-info">
                            <span className="myb-service">{booking.service}</span>
                            <span className="myb-worker">{t("myb_with", lang)} {booking.worker || t("myb_unassigned", lang)}</span>
                            <span className="myb-datetime">{booking.date} {t("at", lang)} {booking.time}</span>
                            <span className="myb-booking-id">#{booking.id}</span>
                          </div>
                        </div>
                        <div className="myb-card-right">
                          <span className="myb-amount">₺{booking.amount}</span>
                          {booking.status === "completed" && !canReview && (
                            <span className="myb-reviewed-badge">{t("myb_reviewed", lang)}</span>
                          )}
                          {canReview && (
                            <button className="btn-ghost myb-review-btn" onClick={() => setReviewBooking(booking)}>
                              {t("myb_leave_review", lang)}
                            </button>
                          )}
                          {booking.status === "cancelled" && (
                            <span
                              className="myb-status-badge"
                              style={{ background: STATUS_COLORS.cancelled + "22", color: STATUS_COLORS.cancelled }}
                            >
                              {t("myb_st_cancelled", lang)}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {reviewBooking && (
        <ReviewModal
          workerName={reviewBooking.worker}
          serviceTitle={reviewBooking.service}
          onClose={() => setReviewBooking(null)}
          onSubmit={async (rating, text) => {
            if (!reviewBooking.workerId) {
              setReviewBooking(null);
              return;
            }

            await apiPost("/reviews", {
              jobId: reviewBooking.id,
              customerId: user.id,
              workerId: reviewBooking.workerId,
              rating,
              text: text.trim() || t("rev_default_text", lang),
            });

            setReviewedIds((prev) => [...prev, reviewBooking.id]);
            setBookings((prev) => prev.map((booking) => (
              booking.id === reviewBooking.id ? { ...booking, reviewed: true } : booking
            )));
            setReviewBooking(null);
          }}
        />
      )}
    </div>
  );
}