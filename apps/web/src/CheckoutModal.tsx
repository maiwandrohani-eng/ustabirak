import { useState } from "react";
import { useLang } from "./LangContext";
import { t } from "./translations";
import type { WorkerProfile } from "@ustaya/shared";
import { apiPost } from "./api";
import type { TaskDescription } from "./TaskDescriptionModal";

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
  customerId: string;
  worker: WorkerProfile;
  serviceTitle: string;
  catId: string;
  taskDescription: TaskDescription;
  selectedDate: string;
  selectedTime: string;
  onClose: () => void;
  onSuccess: (booking: BookingRecord) => void;
}

export default function CheckoutModal({
  customerId,
  worker,
  serviceTitle,
  catId,
  taskDescription,
  selectedDate,
  selectedTime,
  onClose,
  onSuccess,
}: Props) {
  const { lang } = useLang();
  const [step, setStep] = useState<1 | 2>(1); // 1 = Review & Confirm, 2 = Confirmed
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

  const validatePayment = () => {
    if (!cardHolder.trim()) { setError(t("co_error_cardholder", lang)); return false; }
    if (cardNumber.replace(/\s/g, "").length < 16) { setError(t("co_error_cardnum", lang)); return false; }
    if (expiry.length < 5) { setError(t("co_error_expiry", lang)); return false; }
    if (cvv.length < 3) { setError(t("co_error_cvv", lang)); return false; }
    setError("");
    return true;
  };

  const handleConfirm = async () => {
    if (!validatePayment()) return;
    setLoading(true);
    try {
      const scheduledAt = new Date(`${selectedDate}T${selectedTime}`).toISOString();
      const res = await apiPost<{ job: { id: string } }>("/jobs/request", {
        customerId,
        workerId: worker.id,
        category: catId,
        title: serviceTitle,
        description: `${taskDescription.details}\n\n${t("co_location", lang)}: ${taskDescription.location}${taskDescription.unitApt ? ` (${taskDescription.unitApt})` : ""}\n${t("co_task_size", lang)}: ${taskDescription.taskSize}\n${t("co_vehicle_required", lang)}: ${taskDescription.vehicleRequired}`,
        scheduledAt,
        amount: total,
        location: { lat: 41.015, lng: 28.98, city: taskDescription.location, district: "District" },
      });
      setJobId(res.job.id);
      setStep(2);
      onSuccess({
        id: res.job.id,
        service: serviceTitle,
        worker: worker.fullName,
        date: selectedDate,
        time: selectedTime,
        amount: total,
        status: "pending",
      });
    } catch {
      setError(t("co_error_failed", lang));
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
            {step === 2 ? t("co_confirmed", lang) : `${t("co_book", lang)} ${worker.fullName}`}
          </h2>
          {step !== 2 && (
            <div className="checkout-steps">
              <div className="checkout-step-label">
                {t("co_step_payment", lang)}
              </div>
            </div>
          )}
        </div>

        {step !== 2 && (
          <div className="checkout-worker-summary">
            <div className="checkout-worker-avatar">
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
            <div className="checkout-worker-info">
              <span className="checkout-worker-name">{worker.fullName}</span>
              <span className="checkout-service-title">{serviceTitle}</span>
            </div>
            <div className="checkout-worker-price">₺{worker.hourlyPrice}<span>{t("co_per_hr", lang)}</span></div>
          </div>
        )}

        {/* ── Step 1: Review & Payment ── */}
        {step === 1 && (
          <div className="checkout-body">
            {/* Task Summary */}
            <div className="checkout-summary-section">
              <h3 className="checkout-summary-title">
                {t("co_task_summary", lang)}
              </h3>
              <div className="checkout-detail-row">
                <span>{t("service", lang)}</span>
                <strong>{serviceTitle}</strong>
              </div>
              <div className="checkout-detail-row">
                <span>{t("co_location", lang)}</span>
                <strong>{taskDescription.location}</strong>
              </div>
              <div className="checkout-detail-row">
                <span>{t("datetime", lang)}</span>
                <strong>
                  {new Date(selectedDate).toLocaleDateString(lang === "tr" ? "tr-TR" : "en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}, {selectedTime}
                </strong>
              </div>
              <div className="checkout-detail-row">
                <span>{t("co_task_size", lang)}</span>
                <strong>{taskDescription.taskSize}</strong>
              </div>
              <div className="checkout-detail-row">
                <span>{t("co_vehicle_required", lang)}</span>
                <strong>{taskDescription.vehicleRequired}</strong>
              </div>
            </div>

            {/* Payment Card */}
            <div className="checkout-card-preview">
              <div className="card-chip" />
              <div className="card-number">{cardNumber || "**** **** **** ****"}</div>
              <div className="card-bottom">
                <span>{cardHolder || t("co_card_preview", lang)}</span>
                <span>{expiry || t("co_expiry_ph", lang)}</span>
              </div>
            </div>

            <div className="checkout-field-group">
              <label className="checkout-label">{t("co_cardholder", lang)}</label>
              <input
                className="checkout-input"
                type="text"
                placeholder={t("co_cardholder_ph", lang)}
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
              />
            </div>
            <div className="checkout-field-group">
              <label className="checkout-label">{t("co_card_num", lang)}</label>
              <input
                className="checkout-input"
                type="text"
                placeholder={t("co_card_num_ph", lang)}
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCard(e.target.value))}
                maxLength={19}
                inputMode="numeric"
              />
            </div>
            <div className="checkout-row-2">
              <div className="checkout-field-group">
                <label className="checkout-label">{t("co_expiry", lang)}</label>
                <input
                  className="checkout-input"
                  type="text"
                  placeholder={t("co_expiry_ph", lang)}
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  maxLength={5}
                  inputMode="numeric"
                />
              </div>
              <div className="checkout-field-group">
                <label className="checkout-label">{t("co_cvv", lang)}</label>
                <input
                  className="checkout-input"
                  type="password"
                  placeholder={t("co_cvv_ph", lang)}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  maxLength={3}
                  inputMode="numeric"
                />
              </div>
            </div>
            {error && <p className="checkout-error">{error}</p>}
            <div className="checkout-total-row">
              <span>{t("co_total", lang)}</span>
              <strong>₺{total}</strong>
            </div>
            <div className="checkout-actions">
              <button className="btn-ghost" onClick={onClose}>{t("co_cancel", lang)}</button>
              <button className="btn-primary checkout-cta" onClick={handleConfirm} disabled={loading}>
                {loading ? t("co_processing", lang) : `${t("co_confirm_pay", lang)} ₺${total}`}
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: Confirmed ── */}
        {step === 2 && (
          <div className="checkout-confirmed">
            <div className="checkout-confirmed-icon">🎉</div>
            <p className="checkout-confirmed-text">
              {t("co_conf_with", lang)} <strong>{worker.fullName}</strong> {t("co_conf_is", lang)}
            </p>
            <div className="checkout-confirmed-details">
              <div className="checkout-detail-row">
                <span>{t("co_det_service", lang)}</span>
                <strong>{serviceTitle}</strong>
              </div>
              <div className="checkout-detail-row">
                <span>{t("co_det_datetime", lang)}</span>
                <strong>{selectedDate} {t("at", lang)} {selectedTime}</strong>
              </div>
              <div className="checkout-detail-row">
                <span>{t("co_det_amount", lang)}</span>
                <strong>₺{total}</strong>
              </div>
              <div className="checkout-detail-row">
                <span>{t("co_det_id", lang)}</span>
                <strong className="job-id-text">{jobId}</strong>
              </div>
            </div>
            <p className="checkout-confirmed-note">
              {t("co_note", lang)}
            </p>
            <button className="btn-primary" onClick={onClose}>{t("co_done", lang)}</button>
          </div>
        )}
      </div>
    </div>
  );
}
