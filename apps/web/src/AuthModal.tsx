import { useEffect, useState } from "react";
import type { Role } from "@ustaya/shared";
import { apiPost } from "./api";
import { useLang } from "./LangContext";
import { t } from "./translations";

type Mode = "signin" | "signup";
type SignInRole = "customer" | "worker";

interface Props {
  onClose: () => void;
  onSuccess: (user: { id: string; fullName: string; role: Role; avatarUrl?: string; email?: string; phone?: string; location?: { city: string; district?: string } }) => void;
  defaultSignInRole?: SignInRole;
}

export default function AuthModal({ onClose, onSuccess, defaultSignInRole = "customer" }: Props) {
  const [mode, setMode] = useState<Mode>("signin");
  const [signInRole, setSignInRole] = useState<SignInRole>(defaultSignInRole);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { lang } = useLang();

  useEffect(() => {
    setSignInRole(defaultSignInRole);
  }, [defaultSignInRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "signup") {
      if (!fullName.trim() || fullName.length < 2) { setError(t("auth_error_name", lang)); return; }
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError(t("auth_error_email", lang)); return; }
      if (!phone.trim()) { setError(t("auth_error_phone", lang)); return; }
      if (password.length < 8) { setError(t("auth_error_password", lang)); return; }
      if (password !== confirmPassword) { setError(t("auth_error_password_match", lang)); return; }
    } else {
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError(t("auth_error_email", lang)); return; }
      if (password.length < 8) { setError(t("auth_error_password", lang)); return; }
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        const res = await apiPost<{ user: { id: string; fullName: string; avatarUrl?: string; email?: string; phone?: string; location?: { city: string; district?: string } }; role: "customer" | "worker" }>("/auth/register", {
          role: "customer",
          fullName: fullName.trim(),
          email: email.trim(),
          password,
          phone: phone.trim(),
          city: "Istanbul",
        });
        onSuccess({ ...res.user, role: res.role });
      } else {
        // Sign in — in dev mode just find by email or create session
        const res = await apiPost<{ user: { id: string; fullName: string; avatarUrl?: string; email?: string; phone?: string; location?: { city: string; district?: string } }; role: "customer" | "worker" }>("/auth/login", {
          email: email.trim(),
          password,
          role: signInRole,
        });
        onSuccess({ ...res.user, role: res.role });
      }
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : t("auth_error_generic", lang);
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
            onClick={() => { setMode("signin"); setError(""); setPassword(""); setConfirmPassword(""); }}
          >
            {t("auth_signin", lang)}
          </button>
          <button
            className={"auth-tab" + (mode === "signup" ? " auth-tab--active" : "")}
            onClick={() => { setMode("signup"); setError(""); setPassword(""); setConfirmPassword(""); }}
          >
            {t("auth_signup", lang)}
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {mode === "signin" && (
            <div className="auth-field">
              <label className="auth-label">{t("auth_login_as", lang)}</label>
              <div className="auth-tabs" style={{ marginTop: ".4rem" }}>
                <button
                  type="button"
                  className={"auth-tab" + (signInRole === "customer" ? " auth-tab--active" : "")}
                  onClick={() => setSignInRole("customer")}
                >
                  {t("auth_role_customer", lang)}
                </button>
                <button
                  type="button"
                  className={"auth-tab" + (signInRole === "worker" ? " auth-tab--active" : "")}
                  onClick={() => setSignInRole("worker")}
                >
                  {t("auth_role_worker", lang)}
                </button>
              </div>
            </div>
          )}

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

          <div className="auth-field">
            <label className="auth-label">{t("auth_password", lang)}</label>
            <input
              className="auth-input"
              type="password"
              placeholder={t("auth_password_ph", lang)}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
            />
          </div>

          {mode === "signup" && (
            <div className="auth-field">
              <label className="auth-label">{t("auth_confirm_password", lang)}</label>
              <input
                className="auth-input"
                type="password"
                placeholder={t("auth_confirm_password_ph", lang)}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
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
          {t("auth_disclaimer_1", lang)} <a href="#" className="auth-link">{t("auth_terms", lang)}</a> {t("auth_disclaimer_2", lang)} <a href="#" className="auth-link">{t("auth_privacy", lang)}</a>.
        </p>
      </div>
    </div>
  );
}
