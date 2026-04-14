import { useEffect, useMemo, useState } from "react";
import type { WorkerProfile } from "@ustaya/shared";
import { apiGet, apiPost } from "./api";
import { socket } from "./socket";

type SearchResponse = { workers: WorkerProfile[] };

export default function App() {
  const [workers, setWorkers] = useState<WorkerProfile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("electrician");
  const [statusLog, setStatusLog] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const customerId = "c1";

  useEffect(() => {
    socket.emit("join:customer", customerId);

    socket.on("job:accepted", (payload) => {
      setStatusLog((prev) => [`Worker accepted: ${payload.job.id}`, ...prev].slice(0, 8));
    });
    socket.on("job:started", (payload) => {
      setStatusLog((prev) => [`Job started: ${payload.job.id}`, ...prev].slice(0, 8));
    });
    socket.on("job:completed", (payload) => {
      setStatusLog((prev) => [`Job completed: ${payload.job.id}`, ...prev].slice(0, 8));
    });

    return () => {
      socket.off("job:accepted");
      socket.off("job:started");
      socket.off("job:completed");
    };
  }, []);

  const loadWorkers = async () => {
    setIsLoading(true);
    try {
      const result = await apiGet<SearchResponse>(`/workers/search?category=${selectedCategory}`);
      setWorkers(result.workers);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadWorkers();
  }, [selectedCategory]);

  const topWorker = useMemo(() => workers[0], [workers]);

  const instantBook = async () => {
    if (!topWorker) {
      return;
    }

    const now = new Date();
    const scheduledAt = new Date(now.getTime() + 30 * 60 * 1000).toISOString();

    const result = await apiPost<{ job: { id: string } }>("/jobs/request", {
      customerId,
      category: selectedCategory,
      title: `${selectedCategory} service needed`,
      description: "Urgent fix requested from the app",
      scheduledAt,
      amount: topWorker.hourlyPrice,
      location: {
        lat: 41.015,
        lng: 28.98,
        city: "Istanbul",
        district: "Beyoglu"
      }
    });

    setStatusLog((prev) => [`Request sent: ${result.job.id}`, ...prev].slice(0, 8));
  };

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="badge">On-demand services network</p>
          <h1>
            Ustaya<span>Birak</span>
          </h1>
          <p className="sub">Book verified professionals in minutes with real-time matching.</p>
        </div>
        <button onClick={instantBook} className="cta" disabled={!workers.length}>
          Instant book top match
        </button>
      </header>

      <section className="panel">
        <div className="panel-head">
          <h2>Find workers</h2>
          <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
            <option value="electrician">Electrician</option>
            <option value="plumber">Plumber</option>
            <option value="cleaning">Cleaning</option>
            <option value="painting">Painting</option>
            <option value="ac-repair">AC Repair</option>
            <option value="moving">Moving</option>
          </select>
        </div>

        {isLoading ? <p>Loading worker intelligence...</p> : null}

        <div className="cards">
          {workers.map((worker) => (
            <article className="card" key={worker.id}>
              <div className="row">
                <h3>{worker.fullName}</h3>
                <span className={worker.verified ? "verified" : "plain"}>
                  {worker.verified ? "Verified" : "Pending"}
                </span>
              </div>
              <p>{worker.bio}</p>
              <p>
                {worker.rating} stars ({worker.reviewCount} reviews) | {worker.experienceYears} years exp.
              </p>
              <p>{worker.hourlyPrice} EUR / hour</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Live booking events</h2>
        <ul className="events">
          {statusLog.map((item, index) => (
            <li key={`${item}-${index}`}>{item}</li>
          ))}
          {!statusLog.length ? <li>No events yet.</li> : null}
        </ul>
      </section>
    </div>
  );
}
