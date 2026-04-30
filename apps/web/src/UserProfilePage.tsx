import { useEffect, useState, type ChangeEvent } from "react";
import type { Role } from "@ustaya/shared";
import { apiPut } from "./api";
import { useLang } from "./LangContext";
import { t } from "./translations";

interface Props {
  user: {
    id: string;
    fullName: string;
    role: Role;
    avatarUrl?: string;
    email?: string;
    phone?: string;
    location?: {
      city: string;
      district?: string;
    };
  };
  onBack: () => void;
  onSignOut: () => void;
  onNavigate: (page: string | null) => void;
  onUserChange: (user: Props["user"]) => void;
}

export default function UserProfilePage({ user, onBack, onSignOut, onNavigate, onUserChange }: Props) {
  const { lang } = useLang();
  const [name, setName] = useState(user.fullName);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user.avatarUrl ?? null);
  const [email, setEmail] = useState(user.email ?? "");
  const [phone, setPhone] = useState(user.phone ?? "");
  const [city, setCity] = useState(user.location?.city ?? "");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setName(user.fullName);
    setAvatarUrl(user.avatarUrl ?? null);
    setEmail(user.email ?? "");
    setPhone(user.phone ?? "");
    setCity(user.location?.city ?? "");
  }, [user]);

  const handleAvatarFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError(t("prof_avatar_invalid", lang));
      return;
    }

    if (file.size > 1024 * 1024) {
      setError(t("prof_avatar_too_large", lang));
      return;
    }

    const reader = new FileReader();
    setUploadingAvatar(true);
    reader.onload = () => {
      setAvatarUrl(typeof reader.result === "string" ? reader.result : null);
      setEditing(true);
      setUploadingAvatar(false);
      setError("");
    };
    reader.onerror = () => {
      setUploadingAvatar(false);
      setError(t("auth_error_generic", lang));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setError("");
    try {
      const body = {
        fullName: name.trim(),
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        city: city.trim() || undefined,
        avatarUrl,
      };

      let nextUser: Props["user"];
      if (user.role === "worker") {
        const response = await apiPut<{ worker: Props["user"] }>(`/workers/${user.id}/profile`, body);
        nextUser = { ...response.worker, role: "worker" };
      } else {
        const response = await apiPut<{ user: Props["user"] }>(`/customers/${user.id}/profile`, body);
        nextUser = { ...response.user, role: user.role };
      }

      onUserChange(nextUser);
      setSaved(true);
      setEditing(false);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not save profile.");
    }
  };

  return (
    <div className="root">
      <nav className="navbar">
        <div className="navbar-inner">
          <button className="nav-logo-btn" onClick={() => onNavigate(null)} aria-label="Home">
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
              <button className="btn-ghost" onClick={onSignOut}>{t("nav_signout", lang)}</button>
            </div>
          </div>
        </div>
      </nav>

      <section className="profile-page">
        <div className="profile-inner">
          <button className="static-back-btn" onClick={onBack}>{t("back", lang)}</button>

          <div className="profile-header">
            <div className="profile-avatar-large">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                />
              ) : (
                user.fullName.charAt(0).toUpperCase()
              )}
            </div>
            <div className="profile-header-info">
              <h1 className="profile-name">{name}</h1>
              <span className="profile-role-badge">
                {user.role === "worker" ? t("prof_worker_role", lang) : t("prof_customer", lang)}
              </span>
              <span className="profile-member-since">{t("prof_member", lang)}</span>
            </div>
          </div>

          <div className="profile-card">
            <div className="profile-card-header">
              <h2>{t("prof_photo", lang)}</h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: ".75rem", flexWrap: "wrap" }}>
              <label className="btn-ghost" style={{ cursor: "pointer" }}>
                {uploadingAvatar ? t("prof_avatar_uploading", lang) : t("prof_upload_photo", lang)}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarFileChange}
                  style={{ display: "none" }}
                  disabled={uploadingAvatar}
                />
              </label>
              {avatarUrl && (
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => {
                    setAvatarUrl(null);
                    setEditing(true);
                  }}
                >
                  {t("prof_remove_photo", lang)}
                </button>
              )}
            </div>
            <p className="profile-empty-state" style={{ marginTop: ".65rem" }}>{t("prof_photo_hint", lang)}</p>
          </div>

          {saved && (
            <div className="profile-saved-banner">{t("prof_saved", lang)}</div>
          )}
          {error && <div className="profile-saved-banner" style={{ background: "#fee2e2", color: "#b91c1c" }}>{error}</div>}

          <div className="profile-card">
            <div className="profile-card-header">
              <h2>{t("prof_personal", lang)}</h2>
              <button className="btn-ghost" onClick={() => setEditing(!editing)}>
                {editing ? t("prof_cancel", lang) : t("prof_edit", lang)}
              </button>
            </div>
            <div className="profile-fields">
              {[
                { label: t("prof_name", lang), value: name, setter: setName, type: "text" },
                { label: t("prof_email", lang), value: email, setter: setEmail, type: "email" },
                { label: t("prof_phone", lang), value: phone, setter: setPhone, type: "tel" },
                { label: t("prof_city", lang), value: city, setter: setCity, type: "text" },
              ].map(({ label, value, setter, type }) => (
                <div className="profile-field" key={label}>
                  <label>{label}</label>
                  {editing ? (
                    <input
                      className="checkout-input"
                      type={type}
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                    />
                  ) : (
                    <span>{value}</span>
                  )}
                </div>
              ))}
            </div>
            {editing && (
              <button className="btn-primary" style={{ marginTop: "1rem" }} onClick={handleSave}>
                {t("prof_save", lang)}
              </button>
            )}
          </div>

          <div className="profile-card">
            <div className="profile-card-header">
              <h2>{t("prof_addresses", lang)}</h2>
            </div>
            <p className="profile-empty-state">{t("prof_no_addresses", lang)}</p>
          </div>

          <div className="profile-card">
            <div className="profile-card-header">
              <h2>{t("prof_payment", lang)}</h2>
            </div>
            <p className="profile-empty-state">{t("prof_no_payment", lang)}</p>
          </div>

          <div className="profile-danger-zone">
            <button className="btn-ghost btn-danger" onClick={onSignOut}>
              {t("prof_signout", lang)}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
