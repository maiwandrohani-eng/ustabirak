import { useEffect, useState } from "react";
import type { WorkerProfile } from "@ustaya/shared";
import { apiGet } from "./api";
import { SERVICE_DETAILS } from "./serviceData";
import AuthModal from "./AuthModal";
import CheckoutModal from "./CheckoutModal";
import TaskDescriptionModal, { type TaskDescription } from "./TaskDescriptionModal";
import WorkerBrowsingModal from "./WorkerBrowsingModal";
import DateTimePickerModal from "./DateTimePickerModal";
import { useLang } from "./LangContext";
import { t } from "./translations";

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const VerifiedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
    <path d="M9 12l2 2 4-4" /><path d="M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z" />
  </svg>
);

interface Props {
  serviceId: string;
  customerId: string;
  onBackHome: () => void;
  onBackServices: () => void;
  onOpenWorkers: () => void;
  onOpenBecomeWorker: () => void;
}

export default function ServiceDetailPage({
  serviceId,
  customerId,
  onBackHome,
  onBackServices,
  onOpenWorkers,
  onOpenBecomeWorker,
}: Props) {
  const detail = SERVICE_DETAILS[serviceId];
  const { lang } = useLang();
  const [workers, setWorkers] = useState<WorkerProfile[]>([]);
  const [bookingStep, setBookingStep] = useState<null | "describe" | "browse" | "datetime" | "confirm">(null);
  const [taskDescription, setTaskDescription] = useState<TaskDescription | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<WorkerProfile | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (!detail) return;
    apiGet<{ workers: WorkerProfile[] }>(`/workers/search?category=${detail.catId}`)
      .then((r) => setWorkers(r.workers))
      .catch(() => {});
  }, [detail?.catId]);

  if (!detail) {
    return (
      <div className="root" style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <p>{t("error_not_found", lang)}</p>
        <button className="btn-primary" onClick={onBackServices}>{t("go_back", lang)}</button>
      </div>
    );
  }

  const handleStartBooking = () => {
    setBookingStep("describe");
  };

  const handleTaskDescriptionConfirm = (desc: TaskDescription) => {
    setTaskDescription(desc);
    setBookingStep("browse");
  };

  const handleWorkerSelect = (worker: WorkerProfile) => {
    setSelectedWorker(worker);
    setBookingStep("datetime");
  };

  const handleDateTimeConfirm = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setBookingStep("confirm");
  };

  return (
    <div className="root">
      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="navbar-inner">
          <button className="nav-logo-btn" onClick={onBackHome} aria-label="Go to homepage">
            <img src="/logo.png" alt="UstaYolda" height={52} />
          </button>
          <div className="nav-links">
            <button className="nav-link nav-link-btn" onClick={onBackServices}>{t("sd_services", lang)}</button>
            <button className="nav-link nav-link-btn" onClick={onOpenWorkers}>{t("nav_workers", lang)}</button>
            <button className="nav-link nav-link-btn" onClick={onOpenBecomeWorker}>{t("nav_become_worker", lang)}</button>
          </div>
          <div className="nav-auth">
            <button className="btn-ghost" onClick={() => setShowAuth(true)}>{t("nav_signin", lang)}</button>
            <button className="btn-primary" onClick={onOpenBecomeWorker}>{t("nav_become_worker", lang)}</button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="sd-hero" style={{ background: detail.heroGradient }}>
        <div className="sd-hero-overlay" />
        <div className="sd-hero-card">
          <h1 className="sd-hero-title">{lang === "tr" ? detail.titleTr : detail.title}</h1>
          <div className="sd-hero-divider" />
          <p className="sd-hero-tagline">{lang === "tr" ? detail.taglineTr : detail.tagline}</p>
          <a
            href="#sd-workers"
            className="btn-primary sd-book-btn"
            onClick={(e) => {
              e.preventDefault();
              handleStartBooking();
            }}
          >
            {t("book_now", lang)}
          </a>
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div className="sd-breadcrumb">
        <div className="sd-breadcrumb-inner">
          <button className="sd-bc-link" onClick={onBackHome}>{t("sd_home", lang)}</button>
          <span className="sd-bc-sep">›</span>
          <button className="sd-bc-link" onClick={onBackServices}>{t("sd_services", lang)}</button>
          <span className="sd-bc-sep">›</span>
          <span className="sd-bc-link">{lang === "tr" ? detail.categoryTr : detail.category}</span>
          <span className="sd-bc-sep">›</span>
          <span className="sd-bc-current">{lang === "tr" ? detail.titleTr : detail.title}</span>
        </div>
      </div>

      <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "1rem 1.5rem 0" }}>
        <button className="static-back-btn" onClick={onBackHome}>{t("back_home", lang)}</button>
        <button className="static-back-btn" onClick={onBackServices} style={{ marginLeft: "1rem" }}>{t("back_services", lang)}</button>
      </div>

      {/* ── Body ── */}
      <div className="sd-body">
        <div className="sd-body-inner">
          <div className="sd-body-left">
            {detail.body.sections.map((sec, i) => (
              <div key={i}>
                <h2 className="sd-body-heading">{lang === "tr" ? sec.headingTr : sec.heading}</h2>
                {i === 0 && <p className="sd-body-intro">{lang === "tr" ? detail.body.introTr : detail.body.intro}</p>}
                {(lang === "tr" ? sec.paragraphsTr : sec.paragraphs).map((p, j) => (
                  <p key={j} className="sd-body-para">{p}</p>
                ))}
                {sec.list && (
                  <ul className="sd-body-list">
                    {sec.list.map((item, k) => (
                      <li key={k}><strong>{lang === "tr" ? item.labelTr : item.label}</strong> {lang === "tr" ? item.textTr : item.text}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="sd-body-right">
            <div className="sd-side-visual" style={{ background: detail.accentBg }}>
              <span className="sd-side-emoji">{detail.emoji}</span>
              <div className="sd-side-stats">
                <div className="sd-side-stat">
                  <strong>4.9★</strong>
                  <span>{t("sd_avg_rating", lang)}</span>
                </div>
                <div className="sd-side-stat">
                  <strong>1,200+</strong>
                  <span>{t("sd_jobs_done", lang)}</span>
                </div>
                <div className="sd-side-stat">
                  <strong>{t("sd_same_day", lang)}</strong>
                  <span>{t("sd_availability", lang)}</span>
                </div>
              </div>
              <div className="sd-side-subs">
                <p className="sd-side-subs-label">{t("sd_popular_tasks", lang)}</p>
                {(detail.body.sections[0]?.list?.slice(0, 4) ?? detail.body.sections.flatMap(s => s.list ?? []).slice(0, 4)).map((item) => (
                  <span key={item.label} className="sd-side-sub-pill">{(lang === "tr" ? item.labelTr : item.label).replace(":", "")}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Workers ── */}
      <section className="workers-section" id="sd-workers">
        <div className="workers-header">
          <h2 className="section-title">{lang === "tr" ? `En İyi ${detail.titleTr} Ustaları` : `Top ${detail.title} Workers`}</h2>
          {bookingStatus && (
            <div className="status-log">
              <span className="status-pill">{bookingStatus}</span>
            </div>
          )}
        </div>
        {workers.length === 0 ? (
          <p className="empty-state">{t("sd_no_workers", lang)}</p>
        ) : (
          <div className="worker-grid">
            {workers.map((worker) => (
              <article className="worker-card" key={worker.id}>
                <div className="worker-card-top">
                  <div className="worker-avatar">
                    {worker.avatarUrl ? (
                      <img
                        src={worker.avatarUrl}
                        alt={worker.fullName}
                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                      />
                    ) : (
                      worker.fullName.charAt(0)
                    )}
                  </div>
                  <div className="worker-meta">
                    <div className="worker-name-row">
                      <span className="worker-name">{worker.fullName}</span>
                      {worker.verified && (
                        <span className="verified-badge"><VerifiedIcon /> {t("verified_badge", lang)}</span>
                      )}
                    </div>
                    <div className="worker-rating">
                      <span className="star-icon"><StarIcon /></span>
                      <strong>{worker.rating}</strong>
                      <span className="review-count">({worker.reviewCount} {t("reviews_unit", lang)})</span>
                    </div>
                  </div>
                </div>
                <p className="worker-bio">{worker.bio}</p>
                <div className="worker-tags">
                  {worker.categories.map((c) => (
                    <span key={c} className="worker-tag">{c.replace(/-/g, " ")}</span>
                  ))}
                </div>
                <div className="worker-footer">
                  <div className="worker-price">
                    <span className="price-amount">₺{worker.hourlyPrice}</span>
                    <span className="price-unit"> {t("hour", lang)}</span>
                  </div>
                  <button
                    className="btn-primary btn-book"
                    onClick={() => handleStartBooking()}
                  >
                    {t("book_now", lang)}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <button className="nav-logo-btn" onClick={onBackHome}>
          <img src="/logo.png" alt="UstaYolda" height={26} />
        </button>
        <p>© {new Date().getFullYear()} UstaYolda.com — {t("footer_rights", lang)}</p>
      </footer>

      {showAuth && (
        <AuthModal onClose={() => setShowAuth(false)} onSuccess={() => setShowAuth(false)} />
      )}

      {bookingStep === "describe" && (
        <TaskDescriptionModal
          serviceName={lang === "tr" ? detail.titleTr : detail.title}
          onConfirm={handleTaskDescriptionConfirm}
          onCancel={() => setBookingStep(null)}
        />
      )}

      {bookingStep === "browse" && taskDescription && (
        <WorkerBrowsingModal
          workers={workers}
          onSelectWorker={handleWorkerSelect}
          onBack={() => setBookingStep("describe")}
        />
      )}

      {bookingStep === "datetime" && selectedWorker && (
        <DateTimePickerModal
          onConfirm={handleDateTimeConfirm}
          onCancel={() => setBookingStep("browse")}
        />
      )}

      {bookingStep === "confirm" && selectedWorker && selectedDate && selectedTime && taskDescription && (
        <CheckoutModal
          customerId={customerId}
          worker={selectedWorker}
          serviceTitle={lang === "tr" ? detail.titleTr : detail.title}
          catId={detail.catId}
          taskDescription={taskDescription}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onClose={() => {
            setBookingStep(null);
            setTaskDescription(null);
            setSelectedWorker(null);
            setSelectedDate(null);
            setSelectedTime(null);
          }}
          onSuccess={(booking) => {
            setBookingStatus(`${t("co_confirmed", lang)} — ${booking.id}`);
            setBookingStep(null);
            setTaskDescription(null);
            setSelectedWorker(null);
            setSelectedDate(null);
            setSelectedTime(null);
            setTimeout(() => setBookingStatus(null), 5000);
          }}
        />
      )}
    </div>
  );
}
