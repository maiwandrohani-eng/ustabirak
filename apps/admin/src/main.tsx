import React from "react";
import ReactDOM from "react-dom/client";
import { io } from "socket.io-client";
import "./styles.css";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:4000";
const socket = io(API);

type Lang = "en" | "tr";

const copy = {
  en: {
    title: "Admin",
    subtitle: "Real-time operations, trust, and marketplace performance control center.",
    users: "Users",
    customers: "Customers",
    workers: "Workers",
    jobs: "Jobs",
    total: "Total",
    finance: "Finance",
    commission: "Commission",
    payments: "Payments",
    liveEvents: "Live Events",
    noEvents: "No events yet.",
    language: "TR",
    pendingApprovals: "Pending Worker Approvals",
    noPending: "No pending workers.",
    approve: "Approve",
    approved: "Approved",
  },
  tr: {
    title: "Yonetim",
    subtitle: "Gercek zamanli operasyonlar, guven ve pazar yeri performansi kontrol merkezi.",
    users: "Kullanicilar",
    customers: "Musteriler",
    workers: "Ustalar",
    jobs: "Isler",
    total: "Toplam",
    finance: "Finans",
    commission: "Komisyon",
    payments: "Odemeler",
    liveEvents: "Canli Olaylar",
    noEvents: "Henuz olay yok.",
    language: "EN",
    pendingApprovals: "Onay Bekleyen Ustalar",
    noPending: "Bekleyen usta yok.",
    approve: "Onayla",
    approved: "Onaylandi",
  },
} as const;

function App() {
  const [overview, setOverview] = React.useState<any>(null);
  const [events, setEvents] = React.useState<string[]>([]);
  const [lang, setLang] = React.useState<Lang>("en");
  const [pendingWorkers, setPendingWorkers] = React.useState<any[]>([]);
  const [approvingId, setApprovingId] = React.useState<string | null>(null);
  const text = copy[lang];

  const loadPending = React.useCallback(async () => {
    const res = await fetch(`${API}/admin/workers/pending`);
    const json = await res.json();
    setPendingWorkers(json.workers ?? []);
  }, []);

  const approveWorker = async (workerId: string) => {
    setApprovingId(workerId);
    await fetch(`${API}/admin/workers/${workerId}/approve`, { method: "PUT" });
    await loadPending();
    setApprovingId(null);
  };

  const load = React.useCallback(async () => {
    const response = await fetch(`${API}/admin/overview`);
    const json = await response.json();
    setOverview(json);
  }, []);

  React.useEffect(() => {
    socket.emit("join:admin");
    void load();
    void loadPending();

    socket.on("admin:event", (event) => {
      setEvents((prev) => [`${event.type} - ${event.jobId}`, ...prev].slice(0, 10));
      void load();
      void loadPending();
    });

    return () => {
      socket.off("admin:event");
    };
  }, [load, loadPending]);

  return (
    <main className="layout">
      <header>
        <img src="/logo.png" alt="UstaYolda" />
        <div>
          <h1>UstaYolda {text.title}</h1>
          <p>{text.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={() => setLang((value) => (value === "en" ? "tr" : "en"))}
          style={{ marginLeft: "auto" }}
        >
          {text.language}
        </button>
      </header>

      <section className="grid">
        <article className="card">
          <h2>{text.users}</h2>
          <p>{text.customers}: {overview?.users?.customers ?? 0}</p>
          <p>{text.workers}: {overview?.users?.workers ?? 0}</p>
        </article>
        <article className="card">
          <h2>{text.jobs}</h2>
          <p>{text.total}: {overview?.jobs?.total ?? 0}</p>
          <pre>{JSON.stringify(overview?.jobs?.byStatus ?? {}, null, 2)}</pre>
        </article>
        <article className="card">
          <h2>{text.finance}</h2>
          <p>{text.commission}: EUR {overview?.finance?.totalCommissionRevenue ?? 0}</p>
          <p>{text.payments}: {overview?.finance?.payments ?? 0}</p>
        </article>
        <article className="card">
          <h2>{text.liveEvents}</h2>
          <ul>
            {events.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
            {!events.length ? <li>{text.noEvents}</li> : null}
          </ul>
        </article>
        <article className="card" style={{ gridColumn: "1 / -1" }}>
          <h2>{text.pendingApprovals} ({pendingWorkers.length})</h2>
          {pendingWorkers.length === 0 ? (
            <p>{text.noPending}</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "0.75rem" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
                  <th style={{ padding: "0.4rem 0.75rem" }}>Name</th>
                  <th style={{ padding: "0.4rem 0.75rem" }}>Email</th>
                  <th style={{ padding: "0.4rem 0.75rem" }}>Categories</th>
                  <th style={{ padding: "0.4rem 0.75rem" }}>City</th>
                  <th style={{ padding: "0.4rem 0.75rem" }}></th>
                </tr>
              </thead>
              <tbody>
                {pendingWorkers.map((w) => (
                  <tr key={w.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "0.4rem 0.75rem" }}>{w.fullName}</td>
                    <td style={{ padding: "0.4rem 0.75rem" }}>{w.email ?? "—"}</td>
                    <td style={{ padding: "0.4rem 0.75rem" }}>{(w.categories ?? []).join(", ")}</td>
                    <td style={{ padding: "0.4rem 0.75rem" }}>{w.location?.city ?? "—"}</td>
                    <td style={{ padding: "0.4rem 0.75rem" }}>
                      <button
                        onClick={() => approveWorker(w.id)}
                        disabled={approvingId === w.id}
                        style={{ padding: "0.3rem 0.9rem", background: "#16a34a", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}
                      >
                        {approvingId === w.id ? "..." : text.approve}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </article>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
