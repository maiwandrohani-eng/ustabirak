import { useState } from "react";
import { apiPost } from "./api";
import { useLang } from "./LangContext";
import { t } from "./translations";

type Mode = "signin" | "signup";

interface Props {
  onClose: () => void;
  onSuccess: (user: { id: string; fullName: string; role: string }) => void;
}

export default function AuthModal({ onClose, onSuccess }: Props) {
  const [mode, setMode] = useState<Mode>("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { lang } = useLang();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "signup") {
      if (!fullName.trim() || fullName.length < 2) { setError("Please enter your full name."); return; }
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email address."); return; }
      if (!phone.trim()) { setError("Please enter your phone number."); return; }
    } else {
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email address."); return; }
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        const res = await apiPost<{ user: { id: string; fullName: string } }>("/auth/register", {
          role: "customer",
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          city: "Istanbul",
        });
        onSuccess({ ...res.user, role: "customer" });
      } else {
        // Sign in — in dev mode just find by email or create session
        const res = await apiPost<{ user: { id: string; fullName: string } }>("/auth/login", {
          email: email.trim(),
        });
        onSuccess({ ...res.user, role: "customer" });
      }
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="auth-modal">
        <button className="auth-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="auth-logo">
          <img src="/logo.png" alt="UstaYolda" height={44} />
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={"auth-tab" + (mode === "signin" ? " auth-tab--active" : "")}
            onClick={() => { setMode("signin"); setError(""); }}
          >
            {t("auth_signin", lang)}
          </button>
          <button
            className={"auth-tab" + (mode === "signup" ? " auth-tab--active" : "")}
            onClick={() => { setMode("signup"); setError(""); }}
          >
            {t("auth_signup", lang)}
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {mode === "signup" && (
            <div className="auth-field">
              <label className="auth-label">{t("auth_fullname", lang)}</label>
              <input
                className="auth-input"
                type="text"
                placeholder={t("auth_name_ph", lang)}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
              />
            </div>
          )}

          <div className="auth-field">
            <label className="auth-label">{t("auth_email", lang)}</label>
            <input
              className="auth-input"
              type="email"
              placeholder={t("auth_email_ph", lang)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          {mode === "signup" && (
            <div className="auth-field">
              <label className="auth-label">{t("auth_phone", lang)}</label>
              <input
                className="auth-input"
                type="tel"
                placeholder={t("auth_phone_ph", lang)}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
              />
            </div>
          )}

          {error && <p className="auth-error">⚠️ {error}</p>}

          <button className="btn-primary auth-submit" type="submit" disabled={loading}>
            {loading ? t("auth_loading", lang) : mode === "signin" ? t("auth_submit_in", lang) : t("auth_submit_up", lang)}
          </button>
        </form>

        <p className="auth-switch">
          {mode === "signin" ? (
            <>{t("auth_new", lang)}{" "}
              <button className="auth-switch-btn" onClick={() => { setMode("signup"); setError(""); }}>
                {t("auth_signup_link", lang)}
              </button>
            </>
          ) : (
            <>{t("auth_have_acct", lang)}{" "}
              <button className="auth-switch-btn" onClick={() => { setMode("signin"); setError(""); }}>
                {t("auth_signin_link", lang)}
              </button>
            </>
          )}
        </p>

        <p className="auth-disclaimer">
          By continuing, you agree to our <a href="#" className="auth-link">Terms of Service</a> and <a href="#" className="auth-link">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
