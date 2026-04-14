import React from "react";
import ReactDOM from "react-dom/client";
import { io } from "socket.io-client";
import "./styles.css";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:4000";
const socket = io(API);

function App() {
  const [overview, setOverview] = React.useState<any>(null);
  const [events, setEvents] = React.useState<string[]>([]);

  const load = React.useCallback(async () => {
    const response = await fetch(`${API}/admin/overview`);
    const json = await response.json();
    setOverview(json);
  }, []);

  React.useEffect(() => {
    socket.emit("join:admin");
    void load();

    socket.on("admin:event", (event) => {
      setEvents((prev) => [`${event.type} - ${event.jobId}`, ...prev].slice(0, 10));
      void load();
    });

    return () => {
      socket.off("admin:event");
    };
  }, [load]);

  return (
    <main className="layout">
      <header>
        <h1>
          Ustaya<span>Birak</span> Admin
        </h1>
        <p>Real-time operations, trust, and marketplace performance control center.</p>
      </header>

      <section className="grid">
        <article className="card">
          <h2>Users</h2>
          <p>Customers: {overview?.users?.customers ?? 0}</p>
          <p>Workers: {overview?.users?.workers ?? 0}</p>
        </article>
        <article className="card">
          <h2>Jobs</h2>
          <p>Total: {overview?.jobs?.total ?? 0}</p>
          <pre>{JSON.stringify(overview?.jobs?.byStatus ?? {}, null, 2)}</pre>
        </article>
        <article className="card">
          <h2>Finance</h2>
          <p>Commission: EUR {overview?.finance?.totalCommissionRevenue ?? 0}</p>
          <p>Payments: {overview?.finance?.payments ?? 0}</p>
        </article>
        <article className="card">
          <h2>Live Events</h2>
          <ul>
            {events.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
            {!events.length ? <li>No events yet.</li> : null}
          </ul>
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
