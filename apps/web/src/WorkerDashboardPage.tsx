import { useState } from "react";
import { useLang } from "./LangContext";
import { t } from "./translations";

interface Props {
  user: { id: string; fullName: string; role: string };
  onBack: () => void;
  onNavigate: (page: string | null) => void;
}

const MOCK_REQUESTS = [
  { id: "REQ-001", customer: "Mehmet K.", service: "TV Mounting", date: "2026-04-15", time: "10:00", address: "Beyoğlu, Istanbul", amount: 269 },
  { id: "REQ-002", customer: "Ayşe D.", service: "Deep Cleaning", date: "2026-04-16", time: "09:00", address: "Kadıköy, Istanbul", amount: 450 },
  { id: "REQ-003", customer: "Selin T.", service: "Furniture Assembly", date: "2026-04-17", time: "13:00", address: "Şişli, Istanbul", amount: 199 },
];

const EARNINGS = [
  { month: "Jan", amount: 1800 },
  { month: "Feb", amount: 2100 },
  { month: "Mar", amount: 2450 },
  { month: "Apr", amount: 1200 },
];

const maxEarning = Math.max(...EARNINGS.map((e) => e.amount));

export default function WorkerDashboardPage({ user, onBack, onNavigate }: Props) {
  const { lang } = useLang();
  const [available, setAvailable] = useState(true);
  const [acceptedIds, setAcceptedIds] = useState<string[]>([]);
  const [declinedIds, setDeclinedIds] = useState<string[]>([]);
  const [activeJobDone, setActiveJobDone] = useState(false);

  const pendingCount = MOCK_REQUESTS.filter(
    (r) => !acceptedIds.includes(r.id) && !declinedIds.includes(r.id)
  ).length;
  const totalThisMonth = EARNINGS[EARNINGS.length - 1].amount + acceptedIds.length * 200;

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

      <section className="wd-page">
        <div className="wd-inner">
          <button className="static-back-btn" onClick={onBack}>← Back</button>

          {/* Header */}
          <div className="wd-header">
            <div>
              <h1 className="wd-title">Worker Dashboard</h1>
              <p className="wd-greeting">{t("wd_greeting", lang)}, {user.fullName.split(" ")[0]}! 👋</p>
            </div>
            <div className="wd-availability">
              <span className="wd-avail-label">{available ? t("wd_available", lang) : t("wd_unavailable", lang)}</span>
              <button
                className={"wd-toggle" + (available ? " wd-toggle--on" : "")}
                onClick={() => setAvailable((v) => !v)}
                aria-label="Toggle availability"
              >
                <span className="wd-toggle-thumb" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="wd-stats">
            {[
              { icon: "💰", value: `₺${totalThisMonth.toLocaleString()}`, label: t("wd_earned", lang) },
              { icon: "📋", value: String(pendingCount), label: t("wd_pending_req", lang) },
              { icon: "✅", value: String(42 + acceptedIds.length), label: t("wd_completed", lang) },
              { icon: "⭐", value: "4.9", label: t("wd_avg_rating", lang) },
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

          {/* Active Job */}
          <div className="wd-section">
            <h2 className="wd-section-title">{t("wd_active_job", lang)}</h2>
            {activeJobDone ? (
              <div className="wd-empty-state">{t("wd_no_active", lang)}</div>
            ) : (
              <div className="wd-active-job">
                <div className="wd-active-badge">{t("wd_in_progress", lang)}</div>
                <div className="wd-active-detail">
                  <span className="wd-active-service">Furniture Assembly</span>
                  <span className="wd-active-customer">Customer: Ali R.</span>
                  <span className="wd-active-info">2026-04-14 at 14:00 · Şişli, Istanbul</span>
                </div>
                <div className="wd-active-right">
                  <span className="wd-active-amount">₺199</span>
                  <button
                    className="btn-primary btn-sm"
                    onClick={() => setActiveJobDone(true)}
                  >
                    {t("wd_mark_complete", lang)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Job Requests */}
          <div className="wd-section">
            <h2 className="wd-section-title">
              {t("wd_job_requests", lang)}
              {pendingCount > 0 && <span className="wd-count-badge">{pendingCount}</span>}
            </h2>
            <div className="wd-requests-list">
              {MOCK_REQUESTS.map((req) => {
                const isAccepted = acceptedIds.includes(req.id);
                const isDeclined = declinedIds.includes(req.id);
                return (
                  <div key={req.id} className={"wd-request-card" + (isAccepted || isDeclined ? " wd-request-card--done" : "")}>
                    <div className="wd-request-info">
                      <span className="wd-request-service">{req.service}</span>
                      <span className="wd-request-customer">👤 {req.customer}</span>
                      <span className="wd-request-detail">📅 {req.date} at {req.time}</span>
                      <span className="wd-request-detail">📍 {req.address}</span>
                    </div>
                    <div className="wd-request-right">
                      <span className="wd-request-amount">₺{req.amount}</span>
                      {isAccepted && <span className="wd-req-badge wd-req-accepted">{t("wd_accepted", lang)}</span>}
                      {isDeclined && <span className="wd-req-badge wd-req-declined">{t("wd_declined", lang)}</span>}
                      {!isAccepted && !isDeclined && (
                        <div className="wd-request-actions">
                          <button
                            className="btn-primary btn-sm"
                            onClick={() => setAcceptedIds((p) => [...p, req.id])}
                          >
                            {t("wd_accept", lang)}
                          </button>
                          <button
                            className="btn-ghost btn-sm"
                            onClick={() => setDeclinedIds((p) => [...p, req.id])}
                          >
                            {t("wd_decline", lang)}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Earnings Chart */}
          <div className="wd-section">
            <h2 className="wd-section-title">{t("wd_earnings", lang)}</h2>
            <div className="wd-chart">
              {EARNINGS.map((e) => (
                <div key={e.month} className="wd-chart-col">
                  <span className="wd-chart-value">₺{(e.amount / 1000).toFixed(1)}k</span>
                  <div className="wd-chart-bar-wrap">
                    <div
                      className="wd-chart-bar"
                      style={{ height: `${(e.amount / maxEarning) * 100}%` }}
                    />
                  </div>
                  <span className="wd-chart-label">{e.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
