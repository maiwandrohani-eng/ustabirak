import { useState } from "react";

interface Props {
  user: { id: string; fullName: string; role: string };
  onBack: () => void;
  onSignOut: () => void;
  onNavigate: (page: string | null) => void;
}

export default function UserProfilePage({ user, onBack, onSignOut, onNavigate }: Props) {
  const [name, setName] = useState(user.fullName);
  const [email, setEmail] = useState("user@example.com");
  const [phone, setPhone] = useState("+90 555 000 0000");
  const [city, setCity] = useState("Istanbul");
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

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
              <button className="btn-ghost" onClick={onSignOut}>Sign out</button>
            </div>
          </div>
        </div>
      </nav>

      <section className="profile-page">
        <div className="profile-inner">
          <button className="static-back-btn" onClick={onBack}>← Back</button>

          <div className="profile-header">
            <div className="profile-avatar-large">{user.fullName.charAt(0).toUpperCase()}</div>
            <div className="profile-header-info">
              <h1 className="profile-name">{name}</h1>
              <span className="profile-role-badge">
                {user.role === "worker" ? "🔧 Worker" : "👤 Customer"}
              </span>
              <span className="profile-member-since">Member since April 2026</span>
            </div>
          </div>

          {saved && (
            <div className="profile-saved-banner">✅ Profile updated successfully!</div>
          )}

          <div className="profile-card">
            <div className="profile-card-header">
              <h2>Personal Information</h2>
              <button className="btn-ghost" onClick={() => setEditing(!editing)}>
                {editing ? "Cancel" : "Edit"}
              </button>
            </div>
            <div className="profile-fields">
              {[
                { label: "Full Name", value: name, setter: setName, type: "text" },
                { label: "Email", value: email, setter: setEmail, type: "email" },
                { label: "Phone", value: phone, setter: setPhone, type: "tel" },
                { label: "City", value: city, setter: setCity, type: "text" },
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
                Save Changes
              </button>
            )}
          </div>

          <div className="profile-card">
            <div className="profile-card-header">
              <h2>Saved Addresses</h2>
              <button className="btn-ghost">+ Add</button>
            </div>
            {[
              { icon: "🏠", label: "Home", address: "Bağcılar Mah. No:12, Beyoğlu, Istanbul" },
              { icon: "🏢", label: "Office", address: "Levent İş Merkezi Kat:5, Beşiktaş, Istanbul" },
            ].map(({ icon, label, address }) => (
              <div className="profile-address-item" key={label}>
                <span className="address-icon">{icon}</span>
                <div>
                  <strong>{label}</strong>
                  <p>{address}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="profile-card">
            <div className="profile-card-header">
              <h2>Payment Methods</h2>
              <button className="btn-ghost">+ Add Card</button>
            </div>
            <div className="profile-payment-item">
              <span className="payment-icon">💳</span>
              <div>
                <strong>Visa ending in 4242</strong>
                <p>Expires 12/28</p>
              </div>
              <span className="payment-default-badge">Default</span>
            </div>
          </div>

          <div className="profile-danger-zone">
            <button className="btn-ghost btn-danger" onClick={onSignOut}>
              Sign out of your account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
