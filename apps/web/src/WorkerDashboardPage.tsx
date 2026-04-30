import { useCallback, useEffect, useState } from "react";
import { apiGet, apiPost } from "./api";
import { socket } from "./socket";
import { useLang } from "./LangContext";
import { t } from "./translations";

interface Props {
  user: { id: string; fullName: string; role: string; avatarUrl?: string };
  onBack: () => void;
  onNavigate: (page: string | null) => void;
}

interface WorkerJob {
  id: string;
  title: string;
  customerName: string;
  scheduledAt: string;
  location: { city: string; district?: string };
  amount: number;
  status: "accepted" | "in_progress" | "completed" | "confirmed" | "cancelled";
}

interface WorkerRequest {
  id: string;
  title: string;
  customerName: string;
  scheduledAt: string;
  location: { city: string; district?: string };
  amount: number;
}

interface WorkerPayment {
  payoutAmount: number;
  status: "initiated" | "escrowed" | "released" | "refunded";
  updatedAt: string;
}

const monthLabel = (date: Date) => date.toLocaleString("en-US", { month: "short" });

export default function WorkerDashboardPage({ user, onBack, onNavigate }: Props) {
  const { lang } = useLang();
  const [available, setAvailable] = useState(true);
  const [upcomingJobs, setUpcomingJobs] = useState<WorkerJob[]>([]);
  const [requests, setRequests] = useState<WorkerRequest[]>([]);
  const [payments, setPayments] = useState<WorkerPayment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const [jobsResponse, requestsResponse, earningsResponse] = await Promise.all([
        apiGet<{ upcoming: WorkerJob[]; past: WorkerJob[] }>(`/workers/${user.id}/jobs`),
        apiGet<{ requests: WorkerRequest[] }>(`/workers/${user.id}/requests`),
        apiGet<{ totalReleased: number; pendingEscrow: number; payouts: WorkerPayment[] }>(`/workers/${user.id}/earnings`),
      ]);

      setUpcomingJobs(jobsResponse.upcoming);
      setRequests(requestsResponse.requests);
      setPayments(earningsResponse.payouts);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  useEffect(() => {
    const refresh = () => void loadDashboard();
    socket.emit("join:worker", user.id);
    socket.on("job:new", refresh);
    socket.on("job:accepted", refresh);
    socket.on("job:cancelled", refresh);
    return () => {
      socket.off("job:new", refresh);
      socket.off("job:accepted", refresh);
      socket.off("job:cancelled", refresh);
    };
  }, [loadDashboard, user.id]);

  const activeJob = upcomingJobs.find((job) => job.status === "in_progress") ?? upcomingJobs[0] ?? null;
  const totalThisMonth = payments
    .filter((payment) => payment.status === "released")
    .reduce((sum, payment) => {
      const paymentDate = new Date(payment.updatedAt);
      const now = new Date();
      return paymentDate.getMonth() === now.getMonth() && paymentDate.getFullYear() === now.getFullYear()
        ? sum + payment.payoutAmount
        : sum;
    }, 0);
  const pendingCount = requests.length;
  const completedCount = payments.filter((payment) => payment.status === "released").length;
  const earningsByMonth = payments
    .filter((payment) => payment.status === "released")
    .reduce<Record<string, number>>((accumulator, payment) => {
      const label = monthLabel(new Date(payment.updatedAt));
      accumulator[label] = (accumulator[label] ?? 0) + payment.payoutAmount;
      return accumulator;
    }, {});
  const chartData = Object.entries(earningsByMonth).map(([label, amount]) => ({ label, amount }));
  const maxEarning = chartData.length > 0 ? Math.max(...chartData.map((entry) => entry.amount)) : 1;

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

      <section className="wd-page">
        <div className="wd-inner">
          <button className="static-back-btn" onClick={onBack}>{t("back", lang)}</button>

          <div className="wd-header">
            <div>
              <h1 className="wd-title">{t("wd_title", lang)}</h1>
              <p className="wd-greeting">{t("wd_greeting", lang)}, {user.fullName.split(" ")[0]}!</p>
            </div>
            <div className="wd-availability">
              <span className="wd-avail-label">{available ? t("wd_available", lang) : t("wd_unavailable", lang)}</span>
              <button
                className={"wd-toggle" + (available ? " wd-toggle--on" : "")}
                onClick={() => setAvailable((value) => !value)}
                aria-label={t("wd_toggle_availability", lang)}
              >
                <span className="wd-toggle-thumb" />
              </button>
            </div>
          </div>

          <div className="wd-stats">
            {[
              { icon: "💰", value: `₺${Math.round(totalThisMonth).toLocaleString()}`, label: t("wd_earned", lang) },
              { icon: "📋", value: String(pendingCount), label: t("wd_pending_req", lang) },
              { icon: "✅", value: String(completedCount), label: t("wd_completed", lang) },
              { icon: "⭐", value: "5.0", label: t("wd_avg_rating", lang) },
            ].map(({ icon, value, label }) => (
              <div className="wd-stat-card" key={label}>
                <span className="wd-stat-icon">{icon}</span>
                <div>
                  <span className="wd-stat-value">{value}</span>
                  <span className="wd-stat-label">{label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="wd-section">
            <h2 className="wd-section-title">{t("wd_active_job", lang)}</h2>
            {loading ? (
              <div className="wd-empty-state">{t("wd_loading", lang)}</div>
            ) : !activeJob ? (
              <div className="wd-empty-state">{t("wd_no_active", lang)}</div>
            ) : (
              <div className="wd-active-job">
                <div className="wd-active-badge">{activeJob.status === "in_progress" ? t("wd_in_progress", lang) : t("wd_scheduled", lang)}</div>
                <div className="wd-active-detail">
                  <span className="wd-active-service">{activeJob.title}</span>
                  <span className="wd-active-customer">{t("wd_customer", lang)} {activeJob.customerName}</span>
                  <span className="wd-active-info">
                    {new Date(activeJob.scheduledAt).toISOString().slice(0, 10)} {t("at", lang)} {new Date(activeJob.scheduledAt).toTimeString().slice(0, 5)} · {[activeJob.location.district, activeJob.location.city].filter(Boolean).join(", ")}
                  </span>
                </div>
                <div className="wd-active-right">
                  <span className="wd-active-amount">₺{activeJob.amount}</span>
                  <button
                    className="btn-primary btn-sm"
                    onClick={async () => {
                      if (activeJob.status === "accepted") {
                        await apiPost(`/jobs/${activeJob.id}/start`, {});
                      } else {
                        await apiPost(`/jobs/${activeJob.id}/complete`, {});
                      }
                      await loadDashboard();
                    }}
                  >
                    {activeJob.status === "accepted"
                      ? t("wd_start_job", lang)
                      : t("wd_mark_complete", lang)}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="wd-section">
            <h2 className="wd-section-title">
              {t("wd_job_requests", lang)}
              {pendingCount > 0 && <span className="wd-count-badge">{pendingCount}</span>}
            </h2>
            <div className="wd-requests-list">
              {requests.length === 0 ? (
                <div className="wd-empty-state">{t("wd_no_requests", lang)}</div>
              ) : (
                requests.map((request) => (
                  <div key={request.id} className="wd-request-card">
                    <div className="wd-request-info">
                      <span className="wd-request-service">{request.title}</span>
                      <span className="wd-request-customer">👤 {request.customerName}</span>
                      <span className="wd-request-detail">📅 {new Date(request.scheduledAt).toISOString().slice(0, 10)} {t("at", lang)} {new Date(request.scheduledAt).toTimeString().slice(0, 5)}</span>
                      <span className="wd-request-detail">📍 {[request.location.district, request.location.city].filter(Boolean).join(", ")}</span>
                    </div>
                    <div className="wd-request-right">
                      <span className="wd-request-amount">₺{request.amount}</span>
                      <div className="wd-request-actions">
                        <button
                          className="btn-primary btn-sm"
                          onClick={async () => {
                            await apiPost(`/jobs/${request.id}/respond`, { workerId: user.id, decision: "accept" });
                            await loadDashboard();
                          }}
                        >
                          {t("wd_accept", lang)}
                        </button>
                        <button
                          className="btn-ghost btn-sm"
                          onClick={async () => {
                            await apiPost(`/jobs/${request.id}/respond`, { workerId: user.id, decision: "reject" });
                            await loadDashboard();
                          }}
                        >
                          {t("wd_decline", lang)}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="wd-section">
            <h2 className="wd-section-title">{t("wd_earnings", lang)}</h2>
            <div className="wd-chart">
              {chartData.length === 0 ? (
                <div className="wd-empty-state">{t("wd_no_payouts", lang)}</div>
              ) : (
                chartData.map((entry) => (
                  <div key={entry.label} className="wd-chart-col">
                    <span className="wd-chart-value">₺{Math.round(entry.amount)}</span>
                    <div className="wd-chart-bar-wrap">
                      <div
                        className="wd-chart-bar"
                        style={{ height: `${(entry.amount / maxEarning) * 100}%` }}
                      />
                    </div>
                    <span className="wd-chart-label">{entry.label}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}