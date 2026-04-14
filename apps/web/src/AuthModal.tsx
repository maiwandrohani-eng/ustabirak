import { useState } from "react";
import { apiPost } from "./api";

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
          <img src="/logo.png" alt="UstayaBirak" height={44} />
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={"auth-tab" + (mode === "signin" ? " auth-tab--active" : "")}
            onClick={() => { setMode("signin"); setError(""); }}
          >
            Sign In
          </button>
          <button
            className={"auth-tab" + (mode === "signup" ? " auth-tab--active" : "")}
            onClick={() => { setMode("signup"); setError(""); }}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {mode === "signup" && (
            <div className="auth-field">
              <label className="auth-label">Full Name</label>
              <input
                className="auth-input"
                type="text"
                placeholder="Ahmed Yılmaz"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
              />
            </div>
          )}

          <div className="auth-field">
            <label className="auth-label">Email Address</label>
            <input
              className="auth-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          {mode === "signup" && (
            <div className="auth-field">
              <label className="auth-label">Phone Number</label>
              <input
                className="auth-input"
                type="tel"
                placeholder="+90 555 000 00 00"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
              />
            </div>
          )}

          {error && <p className="auth-error">⚠️ {error}</p>}

          <button className="btn-primary auth-submit" type="submit" disabled={loading}>
            {loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
          {mode === "signin" ? (
            <>New to UstayaBirak?{" "}
              <button className="auth-switch-btn" onClick={() => { setMode("signup"); setError(""); }}>
                Create an account
              </button>
            </>
          ) : (
            <>Already have an account?{" "}
              <button className="auth-switch-btn" onClick={() => { setMode("signin"); setError(""); }}>
                Sign in
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
