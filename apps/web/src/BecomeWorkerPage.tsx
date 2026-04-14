import { useState } from "react";
import { apiPost } from "./api";
import { TURKEY_CITIES, TURKEY_DISTRICTS, TURKEY_MAHALLELER, TURKISH_BANKS } from "./turkeyData";
import AuthModal from "./AuthModal";

const SKILL_OPTIONS = [
  { id: "electrician", label: "Electrical", emoji: "⚡", desc: "Wiring, fixtures, outlets, smart home" },
  { id: "plumber", label: "Plumbing", emoji: "🔩", desc: "Leaks, taps, toilets, boilers" },
  { id: "cleaning", label: "Cleaning", emoji: "🧹", desc: "Home, office, deep clean, move-out" },
  { id: "painting", label: "Painting", emoji: "🎨", desc: "Interior, exterior, wallpaper, finishes" },
  { id: "ac-repair", label: "AC & Heating", emoji: "❄️", desc: "Installations, servicing, repairs" },
  { id: "moving", label: "Moving", emoji: "🚚", desc: "Packing, lifting, furniture removal" },
  { id: "other", label: "Handyman / Other", emoji: "🔧", desc: "General repairs, assembly, carpentry" },
] as const;

type SkillId = (typeof SKILL_OPTIONS)[number]["id"];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const WEEKDAY_MAP: Record<string, number> = {
  Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0,
};

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  mahalle: string;
  bio: string;
  categories: SkillId[];
  experienceYears: number;
  hourlyPrice: number;
  serviceRadiusKm: number;
  availableDays: string[];
  bankName: string;
  accountHolderName: string;
  iban: string;
  agreeTerms: boolean;
}

const INITIAL: FormState = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  district: "",
  mahalle: "",
  bio: "",
  categories: [],
  experienceYears: 1,
  hourlyPrice: 25,
  serviceRadiusKm: 10,
  availableDays: [],
  bankName: "",
  accountHolderName: "",
  iban: "",
  agreeTerms: false,
};

const STEPS = ["About You", "Your Skills", "Rates & Schedule", "Bank Details", "Review & Submit"];

interface Props {
  onBack: () => void;
}

export default function BecomeWorkerPage({ onBack }: Props) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | "submit", string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ id: string; name: string } | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleCategory = (id: SkillId) => {
    setForm((f) => ({
      ...f,
      categories: f.categories.includes(id)
        ? f.categories.filter((c) => c !== id)
        : [...f.categories, id],
    }));
    setErrors((e) => ({ ...e, categories: undefined }));
  };

  const toggleDay = (day: string) => {
    setForm((f) => ({
      ...f,
      availableDays: f.availableDays.includes(day)
        ? f.availableDays.filter((d) => d !== day)
        : [...f.availableDays, day],
    }));
  };

  const validateStep = (): boolean => {
    const errs: typeof errors = {};
    if (step === 0) {
      if (!form.fullName.trim() || form.fullName.length < 2) errs.fullName = "Please enter your full name.";
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Please enter a valid email address.";
      if (!form.phone.trim()) errs.phone = "Please enter your phone number.";
      if (!form.city.trim()) errs.city = "Please enter your city.";
    }
    if (step === 1) {
      if (form.categories.length === 0) errs.categories = "Please select at least one skill.";
      if (!form.bio.trim() || form.bio.length < 20) errs.bio = "Please write at least 20 characters about yourself.";
    }
    if (step === 2) {
      if (form.hourlyPrice < 5 || form.hourlyPrice > 500) errs.hourlyPrice = "Please enter a rate between ₺5 and ₺500.";
      if (form.availableDays.length === 0) errs.availableDays = "Please select at least one available day.";
    }
    if (step === 3) {
      if (!form.bankName) errs.bankName = "Please select your bank.";
      if (!form.accountHolderName.trim() || form.accountHolderName.length < 2) errs.accountHolderName = "Please enter the account holder name.";
      if (!form.iban.trim()) {
        errs.iban = "IBAN is required for payouts.";
      } else {
        const normalized = form.iban.replace(/\s/g, "");
        if (!/^TR\d{24}$/.test(normalized)) errs.iban = "Please enter a valid Turkish IBAN (TR + 24 digits).";
      }
    }
    if (step === 4) {
      if (!form.agreeTerms) errs.agreeTerms = "You must agree to the terms to continue.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validateStep()) setStep((s) => s + 1); };
  const back = () => setStep((s) => s - 1);

  const submit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    try {
      const availability = form.availableDays.map((d) => ({
        weekday: WEEKDAY_MAP[d],
        from: "08:00",
        to: "20:00",
      }));

      const res = await apiPost<{ user: { id: string; fullName: string } }>("/auth/register", {
        role: "worker",
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        district: form.district.trim() || undefined,
        mahalle: form.mahalle.trim() || undefined,
        bio: form.bio.trim(),
        categories: form.categories,
        experienceYears: form.experienceYears,
        hourlyPrice: form.hourlyPrice,
        serviceRadiusKm: form.serviceRadiusKm,
        bankName: form.bankName,
        accountHolderName: form.accountHolderName.trim(),
        iban: form.iban.replace(/\s/g, ""),
        availability,
      });
      setSuccess({ id: res.user.id, name: res.user.fullName });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed. Please try again.";
      setErrors({ submit: msg });
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="root">
        <Navbar onBack={onBack} />
        <div className="bw-success-page">
          <div className="bw-success-card">
            <div className="bw-success-icon">🎉</div>
            <h1 className="bw-success-title">Welcome to UstayaBirak, {success.name}!</h1>
            <p className="bw-success-subtitle">Your worker profile has been created. Our team will review and verify your account — you'll get an email within 24 hours.</p>
            <div className="bw-success-steps">
              <div className="bw-success-step"><span>✅</span><p>Profile submitted</p></div>
              <div className="bw-success-step"><span>🔍</span><p>Under review (24h)</p></div>
              <div className="bw-success-step"><span>📲</span><p>Start receiving jobs</p></div>
            </div>
            <p className="bw-success-id">Worker ID: <strong>{success.id}</strong></p>
            <button className="btn-primary" style={{ marginTop: "1.5rem", padding: ".85rem 2.5rem" }} onClick={onBack}>
              Back to Home
            </button>
          </div>
        </div>
        <Footer onBack={onBack} />
      </div>
    );
  }

  return (
    <div className="root">
      <Navbar onBack={onBack} />

      {/* ── Hero Banner ── */}
      <div className="bw-reg-hero">
        <div className="bw-reg-hero-content">
          <h1 className="bw-reg-hero-title">Become a Worker</h1>
          <p className="bw-reg-hero-sub">Join 3,200+ verified Taskers earning on their own schedule</p>
        </div>
      </div>

      {/* ── Progress Bar ── */}
      <div className="bw-progress-bar-wrap">
        <div className="bw-progress-bar-inner">
          {STEPS.map((label, i) => (
            <div
              key={label}
              className={
                "bw-progress-step" +
                (i === step ? " bw-progress-step--active" : "") +
                (i < step ? " bw-progress-step--done" : "")
              }
            >
              <div className="bw-progress-circle">
                {i < step ? <span>✓</span> : <span>{i + 1}</span>}
              </div>
              <span className="bw-progress-label">{label}</span>
              {i < STEPS.length - 1 && <div className="bw-progress-line" />}
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Form ── */}
      <div className="bw-reg-body">
        <div className="bw-reg-card">

          {/* ── Step 0: About You ── */}
          {step === 0 && (
            <div className="bw-step">
              <h2 className="bw-step-title">Tell us about yourself</h2>
              <p className="bw-step-subtitle">This information will be used to create your public worker profile.</p>

              <div className="bw-form-grid">
                <div className="bw-field bw-field--full">
                  <label className="bw-label">Full Name <span className="bw-req">*</span></label>
                  <input
                    className={"bw-input" + (errors.fullName ? " bw-input--error" : "")}
                    type="text"
                    placeholder="e.g. Ahmed Yilmaz"
                    value={form.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                  />
                  {errors.fullName && <span className="bw-error">{errors.fullName}</span>}
                </div>

                <div className="bw-field">
                  <label className="bw-label">Email Address <span className="bw-req">*</span></label>
                  <input
                    className={"bw-input" + (errors.email ? " bw-input--error" : "")}
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                  {errors.email && <span className="bw-error">{errors.email}</span>}
                </div>

                <div className="bw-field">
                  <label className="bw-label">Phone Number <span className="bw-req">*</span></label>
                  <input
                    className={"bw-input" + (errors.phone ? " bw-input--error" : "")}
                    type="tel"
                    placeholder="+90 555 000 00 00"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                  />
                  {errors.phone && <span className="bw-error">{errors.phone}</span>}
                </div>

                <div className="bw-field">
                  <label className="bw-label">City (İl) <span className="bw-req">*</span></label>
                  <select
                    className={"bw-select" + (errors.city ? " bw-input--error" : "")}
                    value={form.city}
                    onChange={(e) => {
                      set("city", e.target.value);
                      set("district", "");
                      set("mahalle", "");
                    }}
                  >
                    <option value="">— Şehir seçin —</option>
                    {TURKEY_CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.city && <span className="bw-error">{errors.city}</span>}
                </div>

                <div className="bw-field">
                  <label className="bw-label">District (İlçe) <span className="bw-optional">(optional)</span></label>
                  <select
                    className="bw-select"
                    value={form.district}
                    disabled={!form.city}
                    onChange={(e) => {
                      set("district", e.target.value);
                      set("mahalle", "");
                    }}
                  >
                    <option value="">— İlçe seçin —</option>
                    {(TURKEY_DISTRICTS[form.city] ?? []).map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="bw-field">
                  <label className="bw-label">Neighbourhood (Mahalle) <span className="bw-optional">(optional)</span></label>
                  <select
                    className="bw-select"
                    value={form.mahalle}
                    disabled={!form.district}
                    onChange={(e) => set("mahalle", e.target.value)}
                  >
                    <option value="">— Mahalle seçin —</option>
                    {(TURKEY_MAHALLELER[`${form.city}|${form.district}`] ?? []).map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  {!form.district || TURKEY_MAHALLELER[`${form.city}|${form.district}`] ? null : (
                    <p className="bw-field-hint">No neighbourhood data for this district.</p>
                  )}
                </div>
              </div>

              <div className="bw-info-box">
                <span>🔒</span>
                <p>Your personal details are kept private. Only your name, skills, and rating are shown to customers.</p>
              </div>
            </div>
          )}

          {/* ── Step 1: Your Skills ── */}
          {step === 1 && (
            <div className="bw-step">
              <h2 className="bw-step-title">What are your skills?</h2>
              <p className="bw-step-subtitle">Select all the services you can offer. You can add more later.</p>

              <div className="bw-skills-grid">
                {SKILL_OPTIONS.map((skill) => {
                  const active = form.categories.includes(skill.id);
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      className={"bw-skill-card" + (active ? " bw-skill-card--active" : "")}
                      onClick={() => toggleCategory(skill.id)}
                    >
                      <span className="bw-skill-emoji">{skill.emoji}</span>
                      <span className="bw-skill-label">{skill.label}</span>
                      <span className="bw-skill-desc">{skill.desc}</span>
                      {active && <span className="bw-skill-check">✓</span>}
                    </button>
                  );
                })}
              </div>
              {errors.categories && <span className="bw-error" style={{ marginTop: ".5rem", display: "block" }}>{errors.categories}</span>}

              <div className="bw-form-grid" style={{ marginTop: "2rem" }}>
                <div className="bw-field">
                  <label className="bw-label">Years of Experience</label>
                  <div className="bw-range-wrap">
                    <input
                      type="range"
                      min={0}
                      max={30}
                      value={form.experienceYears}
                      onChange={(e) => set("experienceYears", Number(e.target.value))}
                      className="bw-range"
                    />
                    <span className="bw-range-val">
                      {form.experienceYears === 0 ? "Less than 1 year" : `${form.experienceYears} year${form.experienceYears !== 1 ? "s" : ""}`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bw-field bw-field--full" style={{ marginTop: "1.5rem" }}>
                <label className="bw-label">About You <span className="bw-req">*</span></label>
                <textarea
                  className={"bw-textarea" + (errors.bio ? " bw-input--error" : "")}
                  placeholder="Describe your experience, tools you own, and what makes you a great Tasker..."
                  rows={5}
                  value={form.bio}
                  onChange={(e) => set("bio", e.target.value)}
                />
                <div className="bw-char-count">
                  <span className={form.bio.length < 20 ? "bw-char-under" : "bw-char-ok"}>{form.bio.length} / 20 min</span>
                </div>
                {errors.bio && <span className="bw-error">{errors.bio}</span>}
              </div>
            </div>
          )}

          {/* ── Step 2: Rates & Schedule ── */}
          {step === 2 && (
            <div className="bw-step">
              <h2 className="bw-step-title">Set your rates & schedule</h2>
              <p className="bw-step-subtitle">You decide how much to charge and when you're available. You can update this any time.</p>

              <div className="bw-form-grid">
                <div className="bw-field">
                  <label className="bw-label">Hourly Rate (€) <span className="bw-req">*</span></label>
                  <div className="bw-price-input-wrap">
                    <span className="bw-price-symbol">€</span>
                    <input
                      className={"bw-input bw-input--price" + (errors.hourlyPrice ? " bw-input--error" : "")}
                      type="number"
                      min={5}
                      max={500}
                      value={form.hourlyPrice}
                      onChange={(e) => set("hourlyPrice", Number(e.target.value))}
                    />
                    <span className="bw-price-unit">/ hr</span>
                  </div>
                  {errors.hourlyPrice && <span className="bw-error">{errors.hourlyPrice}</span>}
                  <p className="bw-field-hint">Average on our platform: <strong>€28–€42 / hr</strong></p>
                </div>

                <div className="bw-field">
                  <label className="bw-label">Service Radius</label>
                  <div className="bw-range-wrap">
                    <input
                      type="range"
                      min={1}
                      max={50}
                      value={form.serviceRadiusKm}
                      onChange={(e) => set("serviceRadiusKm", Number(e.target.value))}
                      className="bw-range"
                    />
                    <span className="bw-range-val">{form.serviceRadiusKm} km from your location</span>
                  </div>
                </div>

                <div className="bw-field bw-field--full">
                  <label className="bw-label">Available Days <span className="bw-req">*</span></label>
                  <div className="bw-days-row">
                    {DAYS.map((day) => (
                      <button
                        key={day}
                        type="button"
                        className={"bw-day-btn" + (form.availableDays.includes(day) ? " bw-day-btn--active" : "")}
                        onClick={() => toggleDay(day)}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                  {errors.availableDays && <span className="bw-error">{errors.availableDays}</span>}
                </div>
              </div>

              <div className="bw-earnings-preview">
                <h3 className="bw-earnings-title">💰 Your estimated earnings</h3>
                <div className="bw-earnings-grid">
                  <div className="bw-earnings-item">
                    <strong>€{(form.hourlyPrice * 3).toFixed(0)}</strong>
                    <span>Per 3-hour job</span>
                  </div>
                  <div className="bw-earnings-item">
                    <strong>€{(form.hourlyPrice * 20).toFixed(0)}</strong>
                    <span>Part-time (20h/wk)</span>
                  </div>
                  <div className="bw-earnings-item">
                    <strong>€{(form.hourlyPrice * 40).toFixed(0)}</strong>
                    <span>Full-time (40h/wk)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Step 3: Bank Details ── */}
          {step === 3 && (
            <div className="bw-step">
              <h2 className="bw-step-title">Bank details for payouts</h2>
              <p className="bw-step-subtitle">Required to receive payments after job completion. Your data is encrypted and never shared with customers.</p>

              <div className="bw-bank-section">
                <div className="bw-form-grid">
                  <div className="bw-field bw-field--full">
                    <label className="bw-label">Bank <span className="bw-req">*</span></label>
                    <select
                      className={"bw-select" + (errors.bankName ? " bw-input--error" : "")}
                      value={form.bankName}
                      onChange={(e) => set("bankName", e.target.value)}
                    >
                      <option value="">— Banka seçin —</option>
                      {TURKISH_BANKS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    {errors.bankName && <span className="bw-error">{errors.bankName}</span>}
                  </div>

                  <div className="bw-field bw-field--full">
                    <label className="bw-label">Account Holder Name <span className="bw-req">*</span></label>
                    <input
                      className={"bw-input" + (errors.accountHolderName ? " bw-input--error" : "")}
                      type="text"
                      placeholder="Full name as it appears on your bank account"
                      value={form.accountHolderName}
                      onChange={(e) => set("accountHolderName", e.target.value)}
                    />
                    {errors.accountHolderName && <span className="bw-error">{errors.accountHolderName}</span>}
                    <p className="bw-field-hint">Must match the name registered with your bank exactly.</p>
                  </div>

                  <div className="bw-field bw-field--full">
                    <label className="bw-label">IBAN <span className="bw-req">*</span></label>
                    <input
                      className={"bw-input bw-input--mono" + (errors.iban ? " bw-input--error" : "")}
                      type="text"
                      placeholder="TR00 0000 0000 0000 0000 0000 00"
                      value={form.iban}
                      onChange={(e) => {
                        const raw = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
                        const formatted = raw.replace(/(.{4})/g, "$1 ").trim();
                        set("iban", formatted);
                      }}
                      maxLength={32}
                    />
                    {errors.iban && <span className="bw-error">{errors.iban}</span>}
                    <p className="bw-field-hint">Turkish IBANs start with <strong>TR</strong> followed by 24 digits — 26 characters total.</p>
                  </div>
                </div>

                <div className="bw-info-box bw-info-box--secure">
                  <span>🔐</span>
                  <p>Your banking details are encrypted with AES-256 and used solely for payout transfers. We never charge your account.</p>
                </div>
              </div>
            </div>
          )}

          {/* ── Step 4: Review & Submit ── */}
          {step === 4 && (
            <div className="bw-step">
              <h2 className="bw-step-title">Review your profile</h2>
              <p className="bw-step-subtitle">Everything look good? Submit to create your worker account.</p>

              <div className="bw-review-card">
                <div className="bw-review-avatar">{form.fullName.charAt(0).toUpperCase() || "?"}</div>
                <div className="bw-review-info">
                  <h3 className="bw-review-name">{form.fullName || "—"}</h3>
                  <p className="bw-review-location">{[form.mahalle, form.district, form.city].filter(Boolean).join(", ") || "—"}</p>
                </div>
                <div className="bw-review-price">₺{form.hourlyPrice}<span>/hr</span></div>
              </div>

              <div className="bw-review-sections">
                <div className="bw-review-section">
                  <h4>Contact</h4>
                  <p>{form.email} · {form.phone}</p>
                </div>
                <div className="bw-review-section">
                  <h4>Skills</h4>
                  <div className="bw-review-tags">
                    {form.categories.length > 0
                      ? form.categories.map((c) => (
                          <span key={c} className="bw-review-tag">
                            {SKILL_OPTIONS.find((s) => s.id === c)?.emoji}{" "}
                            {SKILL_OPTIONS.find((s) => s.id === c)?.label}
                          </span>
                        ))
                      : <span className="bw-review-empty">No skills selected</span>}
                  </div>
                </div>
                <div className="bw-review-section">
                  <h4>Experience</h4>
                  <p>{form.experienceYears === 0 ? "Less than 1 year" : `${form.experienceYears} year${form.experienceYears !== 1 ? "s" : ""}`}</p>
                </div>
                <div className="bw-review-section">
                  <h4>About</h4>
                  <p className="bw-review-bio">{form.bio || "—"}</p>
                </div>
                <div className="bw-review-section">
                  <h4>Availability</h4>
                  <p>{form.availableDays.length > 0 ? form.availableDays.join(", ") : "—"} · {form.serviceRadiusKm} km radius</p>
                </div>
                <div className="bw-review-section bw-review-section--bank">
                  <h4>🏦 Bank Details</h4>
                  <p><strong>{form.bankName}</strong></p>
                  <p>{form.accountHolderName}</p>
                  <p className="bw-review-iban">{"•".repeat(18)} {form.iban.replace(/\s/g, "").slice(-4)}</p>
                </div>
              </div>

              <div className="bw-terms-row">
                <label className="bw-terms-label">
                  <input
                    type="checkbox"
                    checked={form.agreeTerms}
                    onChange={(e) => set("agreeTerms", e.target.checked)}
                    className="bw-terms-check"
                  />
                  <span>
                    I agree to the <a href="#" className="bw-terms-link">Terms of Service</a> and{" "}
                    <a href="#" className="bw-terms-link">Worker Agreement</a>. I confirm that all information is accurate.
                  </span>
                </label>
                {errors.agreeTerms && <span className="bw-error" style={{ display: "block", marginTop: ".4rem" }}>{errors.agreeTerms}</span>}
              </div>

              {errors.submit && (
                <div className="bw-submit-error">
                  <span>⚠️</span> {errors.submit}
                </div>
              )}
            </div>
          )}

          {/* ── Navigation ── */}
          <div className="bw-nav-row">
            {step > 0 ? (
              <button className="btn-ghost bw-back-btn" onClick={back} disabled={submitting}>
                ← Back
              </button>
            ) : (
              <button className="btn-ghost bw-back-btn" onClick={onBack}>
                ← Home
              </button>
            )}

            {step < STEPS.length - 1 ? (
              <button className="btn-primary bw-next-btn" onClick={next}>
                Continue →
              </button>
            ) : (
              <button
                className="btn-primary bw-next-btn"
                onClick={submit}
                disabled={submitting}
              >
                {submitting ? "Creating profile…" : "Create my Worker Profile 🚀"}
              </button>
            )}
          </div>
        </div>

        {/* ── Side Panel (visible steps 0–3) ── */}
        {step < 4 && (
          <div className="bw-reg-side">
            <div className="bw-side-why">
              <h3 className="bw-side-why-title">Why join UstayaBirak?</h3>
              <div className="bw-side-points">
                {[
                  { icon: "💰", title: "Set your own rates", text: "Charge what you're worth. Adjust any time." },
                  { icon: "📅", title: "Work your schedule", text: "Full-time, part-time, or weekends only." },
                  { icon: "📍", title: "Jobs near you", text: "Pick jobs within your preferred radius." },
                  { icon: "⭐", title: "Build your reputation", text: "Grow reviews and become a top-rated Tasker." },
                  { icon: "💳", title: "Fast, secure payouts", text: "Get paid within 24 hours of job completion." },
                  { icon: "🛡️", title: "Insurance & support", text: "Every job is covered by our worker guarantee." },
                ].map((p) => (
                  <div key={p.title} className="bw-side-point">
                    <span className="bw-side-icon">{p.icon}</span>
                    <div>
                      <strong>{p.title}</strong>
                      <p>{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bw-side-earners">
                <p className="bw-side-earners-label">Top earners this month</p>
                {[
                  { name: "Aryan K.", cat: "Electrical", earn: "€3,200" },
                  { name: "Leila M.", cat: "Cleaning", earn: "€2,800" },
                  { name: "Deniz Y.", cat: "Moving", earn: "€2,450" },
                ].map((w) => (
                  <div key={w.name} className="bw-side-earner">
                    <div className="bw-side-earner-av">{w.name.charAt(0)}</div>
                    <div className="bw-side-earner-info">
                      <span>{w.name}</span>
                      <span className="bw-side-earner-cat">{w.cat}</span>
                    </div>
                    <span className="bw-side-earner-earn">{w.earn}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer onBack={onBack} />
    </div>
  );
}

function Navbar({ onBack }: { onBack: () => void }) {
  const [showAuth, setShowAuth] = useState(false);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <button className="nav-logo-btn" onClick={onBack} aria-label="Go to homepage">
            <img src="/logo.png" alt="UstayaBirak" height={52} />
          </button>
          <div className="nav-links">
            <button className="nav-link nav-link-btn" onClick={onBack}>Services</button>
            <button className="nav-link nav-link-btn" onClick={onBack}>Workers</button>
            <span className="nav-link" style={{ color: "var(--primary)", fontWeight: 700 }}>Become a Worker</span>
          </div>
          <div className="nav-auth">
            <button className="btn-ghost" onClick={() => setShowAuth(true)}>Sign up / Log in</button>
          </div>
        </div>
      </nav>
      {showAuth && (
        <AuthModal onClose={() => setShowAuth(false)} onSuccess={() => setShowAuth(false)} />
      )}
    </>
  );
}

function Footer({ onBack }: { onBack: () => void }) {
  return (
    <footer className="footer">
      <button className="nav-logo-btn" onClick={onBack}>
        <img src="/logo.png" alt="UstayaBirak" height={26} />
      </button>
      <p>© {new Date().getFullYear()} UstayaBirak.com — All rights reserved.</p>
    </footer>
  );
}
