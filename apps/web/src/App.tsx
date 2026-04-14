import { useEffect, useState } from "react";
import type { WorkerProfile } from "@ustaya/shared";
import { apiGet, apiPost } from "./api";
import { socket } from "./socket";
import ServiceDetailPage from "./ServiceDetailPage";
import BecomeWorkerPage from "./BecomeWorkerPage";
import AuthModal from "./AuthModal";

const ElectricalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const PlumbingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a5 5 0 0 1 5 5v3H7V7a5 5 0 0 1 5-5z" /><rect x="7" y="10" width="10" height="4" rx="1" /><path d="M9 14v6M15 14v6M7 20h10" />
  </svg>
);
const CleaningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21l9-9M12.2 6.2 17 2l5 5-4.8 4.8M9 15l-5 5" /><circle cx="17" cy="7" r="1" />
  </svg>
);
const PaintingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 22l10-10M12 12l5-5-3-3-5 5M17 7l3-3a1 1 0 0 1 1.4 0l.6.6a1 1 0 0 1 0 1.4L19 8" /><circle cx="20" cy="19" r="3" />
  </svg>
);
const AcIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="8" rx="2" /><path d="M7 11v4M12 11v8M17 11v4M5 19h14" />
  </svg>
);
const MovingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);
const RepairIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);
const TrendingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const VerifiedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
    <path d="M9 12l2 2 4-4" /><path d="M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z" />
  </svg>
);

const CATEGORIES = [
  { id: "electrician", label: "Electrical", Icon: ElectricalIcon, accent: "#fff4f2", iconBg: "#fde8e4",
    subs: ["Outlet Repair", "Light Fixture Install", "Fuse Box", "Smart Wiring", "Circuit Breaker"],
    headline: "Electrical Help",
    bullets: ["Fix outlets, switches, and power issues safely.", "Install light fixtures, fans, and smart home devices."],
    trending: "Smart home setups, EV charger installs, and LED upgrades are highly requested." },
  { id: "plumber", label: "Plumbing", Icon: PlumbingIcon, accent: "#f0f7ff", iconBg: "#d6eaff",
    subs: ["Leak Repair", "Tap & Faucet", "Toilet Fix", "Pipe Inspection", "Boiler Check"],
    headline: "Plumbing Services",
    bullets: ["Fix leaks, blocked drains, and burst pipes fast.", "Install taps, boilers, and bathroom fixtures."],
    trending: "Boiler servicing, smart showers, and water-saving faucets." },
  { id: "cleaning", label: "Cleaning", Icon: CleaningIcon, accent: "#f3fbff", iconBg: "#caeeff",
    subs: ["Deep Clean", "Regular Clean", "Office Clean", "Move-Out Clean", "Window Clean"],
    headline: "Cleaning",
    bullets: ["Clean your home or office; deep clean appliances and every space.", "Eco-friendly products and professional-grade equipment."],
    trending: "Post-renovation deep cleans and eco-friendly cleaning kits." },
  { id: "painting", label: "Painting", Icon: PaintingIcon, accent: "#fff8f0", iconBg: "#fde6c8",
    subs: ["Interior Painting", "Exterior Painting", "Wallpapering", "Accent Wall", "Wood Staining"],
    headline: "Painting",
    bullets: ["Paint walls, ceilings, molding, and doors; includes prep and cleanup.", "Color blocking, feature walls, and specialist finishes."],
    trending: "Limewash finishes, accent walls, and bold statement colors." },
  { id: "ac-repair", label: "AC & Heating", Icon: AcIcon, accent: "#f0fafc", iconBg: "#c8ecf8",
    subs: ["AC Service", "AC Install", "Heating Repair", "Filter Change", "Duct Cleaning"],
    headline: "AC & Heating",
    bullets: ["Service, repair, and install air conditioning and heating units.", "Seasonal maintenance to keep your home comfortable all year."],
    trending: "Smart thermostats, energy-efficient units, and air quality sensors." },
  { id: "moving", label: "Moving", Icon: MovingIcon, accent: "#f5fff2", iconBg: "#c8f0be",
    subs: ["Help Moving", "Packing & Unpacking", "Furniture Removal", "Heavy Lifting", "Junk Removal"],
    headline: "Moving",
    bullets: ["Packing, loading, and lifting help for any move size.", "Single-item moves, apartment moves, and junk removal."],
    trending: "Single-item moves, last-mile delivery, and apartment relocations." },
  { id: "other", label: "Home Repairs", Icon: RepairIcon, accent: "#fffbf0", iconBg: "#faeabe",
    subs: ["Door & Cabinet", "Wall Repair", "Flooring Help", "Appliance Install", "Light Carpentry"],
    headline: "Home Repairs",
    bullets: ["Home improvements: plumbing, electrical, and appliance installation.", "Small fixes done right — no job is too small."],
    trending: "Smart home devices, energy-efficient appliances, and bathroom upgrades." },
  { id: "_trending", label: "Trending", Icon: TrendingIcon, accent: "#fff4f2", iconBg: "#ffcdc6",
    subs: ["Help Moving", "General Cleaning", "Appliance Install", "AC Service", "Light Fixture"],
    headline: "Trending Now",
    bullets: ["Discover the most-booked services on the platform this week.", "Book a top-rated worker before they fill up."],
    trending: "Spring cleaning, AC tune-ups, and smart lighting are all surging." },
] as const;

type CatId = (typeof CATEGORIES)[number]["id"];

const POPULAR_PROJECTS = [
  { emoji: "🪑", title: "Furniture Assembly", startPrice: 199, color: "#eef0ff", page: "Furniture Assembly" },
  { emoji: "🖼️", title: "Mount Art or Shelves", startPrice: 249, color: "#fff0f0", page: "Mounting & Installation" },
  { emoji: "📺", title: "Mount a TV", startPrice: 269, color: "#f0fff8", page: "Mounting & Installation" },
  { emoji: "🚚", title: "Help Moving", startPrice: 279, color: "#fff8f0", page: "Moving Services" },
  { emoji: "🧹", title: "Home Cleaning", startPrice: 199, color: "#f0f8ff", page: "Cleaning" },
  { emoji: "🔧", title: "Minor Plumbing Repair", startPrice: 299, color: "#fffff0", page: "Handyman" },
  { emoji: "⚡", title: "Electrical Help", startPrice: 279, color: "#fffaf0", page: "Handyman" },
  { emoji: "💪", title: "Heavy Lifting", startPrice: 249, color: "#fff0fc", page: "Moving Services" },
];

const REVIEWS = [
  {
    name: "Mehmet K.",
    stars: 5,
    text: "The worker arrived on time and assembled our IKEA wardrobe perfectly in under an hour. Very professional and cleaned up everything afterward.",
    service: "IKEA Furniture Assembly",
    page: "IKEA Services",
  },
  {
    name: "Ayşe D.",
    stars: 5,
    text: "Fantastic service! They mounted our TV and two shelves exactly where we wanted. Quick, tidy and friendly. Will definitely book again.",
    service: "Mounting & Installation",
    page: "Mounting & Installation",
  },
  {
    name: "Ali R.",
    stars: 5,
    text: "We had the whole apartment deep-cleaned before moving in. The difference was incredible — spotless from top to bottom. Highly recommend!",
    service: "Home Cleaning",
    page: "Cleaning",
  },
];

const SERVICE_QUICK_LINKS = [
  { label: "General Mounting", page: "Mounting & Installation" },
  { label: "TV Mounting", page: "Mounting & Installation" },
  { label: "Furniture Assembly", page: "Furniture Assembly" },
  { label: "IKEA Furniture Assembly", page: "IKEA Services" },
  { label: "Help Moving", page: "Moving Services" },
  { label: "House Cleaning", page: "Cleaning" },
  { label: "Yardwork", page: "Yardwork" },
  { label: "Furniture Removal", page: "Moving Services" },
  { label: "Lawn Care", page: "Yardwork" },
  { label: "Hang Pictures", page: "Mounting & Installation" },
  { label: "In Home Furniture Movers", page: "Moving Services" },
  { label: "Shelf Mounting", page: "Mounting & Installation" },
  { label: "Light Installation", page: "Handyman" },
  { label: "Plumbing", page: "Handyman" },
  { label: "Electrical Help", page: "Handyman" },
  { label: "Home Repairs", page: "Handyman" },
  { label: "Painting", page: "Painting" },
  { label: "Personal Assistant", page: "Personal Assistant" },
];

export default function App() {
  const [activeCat, setActiveCat] = useState<CatId>("electrician");
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [workers, setWorkers] = useState<WorkerProfile[]>([]);
  const [statusLog, setStatusLog] = useState<string[]>([]);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [activePage, setActivePage] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ id: string; fullName: string; role: string } | null>(null);
  const customerId = "c1";
  const category = CATEGORIES.find((c) => c.id === activeCat)!;

  useEffect(() => {
    socket.emit("join:customer", customerId);
    socket.on("job:accepted", (p) =>
      setStatusLog((prev) => [`Worker accepted — job ${p.job.id}`, ...prev].slice(0, 5))
    );
    socket.on("job:started", (p) =>
      setStatusLog((prev) => [`Worker is on the way — ${p.job.id}`, ...prev].slice(0, 5))
    );
    socket.on("job:completed", (p) =>
      setStatusLog((prev) => [`Job completed — ${p.job.id}`, ...prev].slice(0, 5))
    );
    return () => {
      socket.off("job:accepted");
      socket.off("job:started");
      socket.off("job:completed");
    };
  }, []);

  useEffect(() => {
    const apiCat = activeCat === "_trending" ? "cleaning" : activeCat;
    apiGet<{ workers: WorkerProfile[] }>(`/workers/search?category=${apiCat}`)
      .then((r) => setWorkers(r.workers))
      .catch(() => {});
    setActiveSub(null);
  }, [activeCat]);

  const handleBook = async (worker: WorkerProfile) => {
    setBookingInProgress(true);
    try {
      const apiCat = activeCat === "_trending" ? "other" : activeCat;
      const res = await apiPost<{ job: { id: string } }>("/jobs/request", {
        customerId,
        category: apiCat,
        title: `${category.headline} - ${activeSub ?? category.subs[0]}`,
        description: "Booked via UstayaBirak web app",
        scheduledAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        amount: worker.hourlyPrice,
        location: { lat: 41.015, lng: 28.98, city: "Istanbul", district: "Beyoglu" },
      });
      setStatusLog((prev) =>
        [`Request sent to ${worker.fullName} — ${res.job.id}`, ...prev].slice(0, 5)
      );
    } finally {
      setBookingInProgress(false);
    }
  };

  const filteredWorkers = searchQuery.trim()
    ? workers.filter(
        (w) =>
          w.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          w.categories.some((c) => c.includes(searchQuery.toLowerCase()))
      )
    : workers;

  if (activePage === "__become-worker") {
    return <BecomeWorkerPage onBack={() => setActivePage(null)} />;
  }

  if (activePage === "__services") {
    return (
      <div className="root">
        <nav className="navbar">
          <div className="navbar-inner">
            <button className="nav-logo-btn" onClick={() => setActivePage(null)} aria-label="Go to homepage">
              <img src="/logo.png" alt="UstayaBirak" height={72} />
            </button>
            <div className="nav-links">
              <button className="nav-link nav-link-btn" onClick={() => setActivePage("__services")}>Services</button>
              <button className="nav-link nav-link-btn" onClick={() => setActivePage("__services")}>Workers</button>
            </div>
            <div className="nav-auth">
              {currentUser ? (
                <div className="nav-user">
                  <span className="nav-user-avatar">{currentUser.fullName.charAt(0).toUpperCase()}</span>
                  <span className="nav-user-name">{currentUser.fullName}</span>
                  <button className="btn-ghost" onClick={() => setCurrentUser(null)}>Sign out</button>
                </div>
              ) : (
                <button className="btn-ghost" onClick={() => setShowAuth(true)}>Sign up / Log in</button>
              )}
              <button className="btn-primary" onClick={() => setActivePage("__become-worker")}>Become a Worker</button>
            </div>
          </div>
        </nav>

        <section className="services-page-section">
          <div className="services-page-inner">
            <h2 className="services-page-title">What can we help with?</h2>
            <p className="services-page-subtitle">Browse our most popular service categories</p>
            <div className="services-grid">
              {[
                { emoji: "⭐", title: "Featured Tasks", desc: "Let Taskers help tackle your to-do list", subs: ["Furniture Assembly", "Home Repairs", "Help Moving", "Yard Work Services", "Spring Cleaning", "TV Mounting", "Plumbing", "Hang Art, Mirror & Decor", "Electrical Help", "Wait in Line", "Closet Organization Service"] },
                { emoji: "🔧", title: "Handyman", desc: "Hire a Tasker for help around the house", subs: ["Door, Cabinet & Furniture Repair", "Appliance Installation & Repairs", "Furniture Assembly", "TV Mounting", "Drywall Repair Service", "Flooring & Tiling Help", "Electrical Help", "Sealing & Caulking", "Plumbing", "Window & Blinds Repair", "Ceiling Fan Installation", "Smart Home Installation", "Heavy Lifting", "Install Air Conditioner", "Painting", "Install Shelves, Rods & Hooks", "Home Maintenance", "Home Repairs", "Baby Proofing", "Carpentry Services", "General Mounting", "Cabinet Installation", "Wallpapering Service", "Fence Installation & Repair", "Deck Restoration Services", "Doorbell Installation", "Home Theater Installing"] },
                { emoji: "🧹", title: "Cleaning", desc: "Taskers will make your home sparkle!", subs: ["House Cleaning Services", "Deep Cleaning", "Disinfecting Services", "Move In Cleaning", "Move Out Cleaning", "Vacation Rental Cleaning", "Carpet Cleaning Service", "Garage Cleaning", "One Time Cleaning Services", "Car Washing", "Laundry Help", "Pressure Washing", "Spring Cleaning"] },
                { emoji: "🪑", title: "Furniture Assembly", desc: "Expert assembly for any furniture brand", subs: ["Furniture Assembly", "Patio Furniture Assembly", "Desk Assembly", "Dresser Assembly", "Bed Assembly", "Bookshelf Assembly", "Couch Assembly", "Chair Assembly", "Wardrobe Assembly", "Table Assembly", "Disassemble Furniture"] },
                { emoji: "🖼️", title: "Mounting & Installation", desc: "Wall mounting for TVs, shelves, fans & more", subs: ["TV Mounting", "Install Shelves, Rods & Hooks", "Ceiling Fan Installation", "Install Blinds & Window Treatments", "Hang Art, Mirror & Decor", "General Mounting", "Hang Christmas Lights"] },
                { emoji: "🚚", title: "Moving Services", desc: "From heavy lifting to unpacking — make your move easy", subs: ["Help Moving", "Truck Assisted Help Moving", "Packing Services & Help", "Unpacking Services", "Heavy Lifting", "Local Movers", "Junk Pickup", "Furniture Movers", "One Item Movers", "Storage Unit Moving", "Couch Removal", "Mattress Pick-Up & Removal", "Furniture Removal", "Pool Table Movers", "Appliance Removal", "Heavy Furniture Moving", "Rearranging Furniture", "Full Service Help Moving", "In-Home Furniture Movers"] },
                { emoji: "🌿", title: "Yardwork", desc: "Hire a Tasker for yardwork & landscaping", subs: ["Gardening Services", "Weed Removal", "Lawn Care Services", "Lawn Mowing Services", "Landscaping Services", "Gutter Cleaning", "Tree Trimming Service", "Vacation Plant Watering", "Patio Cleaning", "Hot Tub Cleaning", "Fence Installation & Repair Services", "Deck Restoration Services", "Patio Furniture Assembly", "Fence Staining", "Mulching Services", "Lawn Fertilizer Service", "Hedge Trimming Service", "Outdoor Party Setup", "Urban Gardening Service", "Leaf Raking & Removal", "Produce Gardening", "Hose Installation", "Shed Maintenance", "Pressure Washing"] },
                { emoji: "🛒", title: "Shopping & Delivery", desc: "Get anything from groceries to furniture", subs: ["Delivery Service", "Grocery Shopping & Delivery", "Running Your Errands", "Christmas Tree Delivery", "Wait in Line", "Deliver Big Piece of Furniture", "Drop Off Donations", "Contactless Delivery", "Pet Food Delivery", "Baby Food Delivery", "Return Items", "Wait for Delivery", "Shipping", "Breakfast Delivery", "Coffee Delivery"] },
                { emoji: "🏢", title: "IKEA Services", desc: "Hire a Tasker for all your IKEA needs", subs: ["Light Installation", "Furniture Removal", "Smart Home Installation", "Organization", "Furniture Assembly", "General Mounting"] },
                { emoji: "🎨", title: "Painting", desc: "Interior, exterior & specialist finishes", subs: ["Interior Painting", "Exterior Painting", "Wallpapering", "Accent Wall", "Wood Staining"] },
                { emoji: "💼", title: "Virtual & Online Tasks", desc: "Virtual assistance, organization, research & more", subs: ["Virtual Assistant", "Organization", "Data Entry", "Computer Help"] },
                { emoji: "🏢", title: "Office Services", desc: "Hire a Tasker to help around the office!", subs: ["Office Cleaning", "Office Tech Setup", "Office Movers", "Office Supply & Snack Delivery", "Office Furniture Assembly", "Office Setup & Organization", "Office Administration", "Office Interior Design", "Moving Office Furniture", "Office Mounting Service"] },
                { emoji: "👶", title: "Baby Prep", desc: "Set up the nursery, childproof your home & more", subs: ["Baby Proofing", "Baby Food Delivery", "Organize a Room", "Painting", "Toy Assembly Service", "Smart Home Installation", "Shopping", "General Cleaning"] },
                { emoji: "🎁", title: "Holidays", desc: "Holiday help — decorating, gifting & more", subs: ["Gift Wrapping Services", "Hang Christmas Lights", "Christmas Tree Delivery", "Holiday Decorating", "Party Cleaning", "Toy Assembly Service", "Wait in Line", "Christmas Tree Removal"] },
                { emoji: "❄️", title: "Winter Tasks", desc: "Get help with winter tasks", subs: ["Snow Removal", "Sidewalk Salting", "Window Winterization", "Residential Snow Removal", "Christmas Tree Removal", "AC Winterization", "Winter Yardwork", "Pipe Insulation", "Storm Door Installation", "Winter Deck Maintenance", "Water Heater Maintenance", "Wait in Line"] },
                { emoji: "🙋", title: "Personal Assistant", desc: "Hire a Tasker to be your personal assistant!", subs: ["Personal Assistant", "Running Your Errands", "Wait in Line", "Organization", "Organize Home", "Closet Organization Service", "Interior Design Service", "Virtual Assistant"] },
                { emoji: "📦", title: "Contactless Tasks", desc: "No-contact delivery, shopping & errands", subs: ["Contactless Delivery", "Contactless Prescription Pick-up & Delivery", "Running Your Errands", "Grocery Shopping & Delivery", "Disinfecting Services", "Drop Off Donations", "Yard Work Services", "Virtual Assistant"] },
              ].map(({ emoji, title, desc, subs }) => (
                <div
                  className="service-category-card"
                  key={title}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActivePage(title)}
                  onKeyDown={(e) => e.key === "Enter" && setActivePage(title)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="service-card-emoji">{emoji}</div>
                  <div className="service-card-info">
                    <h3 className="service-card-title">{title}</h3>
                    <p className="service-card-desc">{desc}</p>
                    <hr className="service-card-divider" />
                    <ul className="service-card-subs">
                      {subs.map((s) => (
                        <li key={s}>
                          <a className="service-sub-link" onClick={(e) => { e.stopPropagation(); setActivePage(title); }}>{s}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {showAuth && (
          <AuthModal
            onClose={() => setShowAuth(false)}
            onSuccess={(user) => { setCurrentUser(user); setShowAuth(false); }}
          />
        )}
      </div>
    );
  }

  if (activePage) {
    return <ServiceDetailPage serviceId={activePage} onBack={() => setActivePage(null)} />;
  }

  return (
    <div className="root">

      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="navbar-inner">
          <a href="/" className="nav-logo">
            <img src="/logo.png" alt="UstayaBirak" height={72} />
          </a>
          <div className="nav-links">
            <button className="nav-link nav-link-btn" onClick={() => setActivePage("__services")}>Services</button>
            <button className="nav-link nav-link-btn" onClick={() => setActivePage("__services")}>Workers</button>
          </div>
          <div className="nav-auth">
            {currentUser ? (
              <div className="nav-user">
                <span className="nav-user-avatar">{currentUser.fullName.charAt(0).toUpperCase()}</span>
                <span className="nav-user-name">{currentUser.fullName}</span>
                <button className="btn-ghost" onClick={() => setCurrentUser(null)}>Sign out</button>
              </div>
            ) : (
              <button className="btn-ghost" onClick={() => setShowAuth(true)}>Sign up / Log in</button>
            )}
            <button className="btn-primary" onClick={() => setActivePage("__become-worker")}>Become a Worker</button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero" id="services">
        <h1 className="hero-title">Book trusted help<br />for home tasks</h1>
        <div className="search-bar">
          <input
            className="search-input"
            type="text"
            placeholder="What do you need help with?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn" aria-label="Search"><SearchIcon /></button>
        </div>
        <div className="category-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={"cat-tab" + (activeCat === cat.id ? " cat-tab--active" : "")}
              onClick={() => setActiveCat(cat.id)}
            >
              <span className="cat-tab-icon"><cat.Icon /></span>
              <span className="cat-tab-label">{cat.label}</span>
            </button>
          ))}
        </div>
        <div className="sub-pills">
          {category.subs.map((sub) => (
            <button
              key={sub}
              className={"sub-pill" + (activeSub === sub ? " sub-pill--active" : "")}
              onClick={() => setActiveSub(activeSub === sub ? null : sub)}
            >
              {sub}
            </button>
          ))}
        </div>
      </section>

      {/* ── Spotlight Card ── */}
      <section className="spotlight-section">
        <div className="spotlight-card" style={{ background: category.accent }}>
          <div className="spotlight-text">
            <h2 className="spotlight-title">{category.headline}</h2>
            <ul className="spotlight-bullets">
              {category.bullets.map((b) => (
                <li key={b}><span className="bullet-check">&#10003;</span>{b}</li>
              ))}
            </ul>
            <p className="spotlight-trending">
              <strong>Now Trending:</strong> {category.trending}
            </p>
          </div>
          <div className="spotlight-visual" style={{ background: category.iconBg }}>
            <div className="spotlight-big-icon"><category.Icon /></div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="tr-stats-section">
        <div className="tr-stats-inner">
          {[
            { label: "Tasks completed", value: "48,000+" },
            { label: "Moving tasks", value: "9,200+" },
            { label: "Items mounted", value: "12,000+" },
            { label: "Home repairs", value: "8,500+" },
            { label: "Homes cleaned", value: "15,000+" },
          ].map((s) => (
            <div className="tr-stat" key={s.label}>
              <span className="tr-stat-label">{s.label}:</span>
              <strong className="tr-stat-value">{s.value}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* ── Popular Projects ── */}
      <section className="popular-projects" id="services-page">
        <div className="pp-inner">
          <h2 className="pp-heading">Popular Projects</h2>
          <div className="pp-grid">
            {POPULAR_PROJECTS.map((p) => (
              <div className="pp-card" key={p.title} onClick={() => setActivePage(p.page)}>
                <div className="pp-img" style={{ background: p.color }}>
                  <span className="pp-emoji">{p.emoji}</span>
                </div>
                <div className="pp-info">
                  <strong className="pp-title">{p.title}</strong>
                  <span className="pp-price">Projects starting at ₺{p.startPrice}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Customer Reviews ── */}
      <section className="reviews-section">
        <div className="reviews-inner">
          <h2 className="reviews-heading">See what happy customers are saying about UstayaBirak</h2>
          <div className="reviews-grid">
            {REVIEWS.map((r) => (
              <div className="review-card" key={r.name}>
                <div className="review-top">
                  <strong className="reviewer-name">{r.name}</strong>
                  <div className="review-stars">{"★".repeat(r.stars)}</div>
                </div>
                <p className="review-text">{r.text}</p>
                <span className="review-service-link" onClick={() => setActivePage(r.page)}>
                  {r.service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Satisfaction Guarantee ── */}
      <section className="guarantee-section">
        <div className="guarantee-inner">
          <h2 className="guarantee-heading">Your satisfaction, <span className="guarantee-highlight">guaranteed</span></h2>
          <div className="guarantee-grid">
            <div className="guarantee-item">
              <div className="guarantee-icon">🛡️</div>
              <h3>Happiness Pledge</h3>
              <p>If you're not satisfied, we'll work to make it right.</p>
            </div>
            <div className="guarantee-item">
              <div className="guarantee-icon">✅</div>
              <h3>Vetted Workers</h3>
              <p>Workers are always background checked before joining the platform.</p>
            </div>
            <div className="guarantee-item">
              <div className="guarantee-icon">💬</div>
              <h3>Dedicated Support</h3>
              <p>Friendly service when you need us — every day of the week.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="how-it-works">
        <div className="hiw-inner">
          <div className="hiw-content">
            <h2 className="hiw-heading">How it works</h2>
            {[
              { n: 1, text: "Choose a Worker by price, skills, and reviews." },
              { n: 2, text: "Schedule a Worker as early as today." },
              { n: 3, text: "Chat, pay, tip, and review all in one place." },
            ].map((s) => (
              <div className="hiw-step" key={s.n}>
                <span className="hiw-step-num">{s.n}</span>
                <p>{s.text}</p>
              </div>
            ))}
            <button className="btn-primary" style={{ marginTop: "1.5rem" }} onClick={() => setActivePage("__become-worker")}>
              Get started today
            </button>
          </div>
          <div className="hiw-visual">
            <div className="hiw-card">
              <div className="hiw-card-row">
                <span className="hiw-card-icon">🔧</span>
                <span>Handyman services</span>
                <span className="hiw-card-price">from ₺199</span>
              </div>
              <div className="hiw-card-row">
                <span className="hiw-card-icon">🧹</span>
                <span>Cleaning</span>
                <span className="hiw-card-price">from ₺199</span>
              </div>
              <div className="hiw-card-row">
                <span className="hiw-card-icon">🚚</span>
                <span>Moving help</span>
                <span className="hiw-card-price">from ₺279</span>
              </div>
              <div className="hiw-card-row hiw-card-row--btn">
                <button className="btn-primary" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Workers ── */}
      <section className="workers-section" id="workers">
        <div className="workers-header">
          <h2 className="section-title">
            {activeSub ? `Workers for "${activeSub}"` : `Top ${category.label} workers`}
          </h2>
          {statusLog.length > 0 && (
            <div className="status-log">
              {statusLog.map((item, i) => (
                <span key={i} className="status-pill">{item}</span>
              ))}
            </div>
          )}
        </div>
        {filteredWorkers.length === 0 ? (
          <p className="empty-state">No workers found. Try a different category or search.</p>
        ) : (
          <div className="worker-grid">
            {filteredWorkers.map((worker) => (
              <article className="worker-card" key={worker.id}>
                <div className="worker-card-top">
                  <div className="worker-avatar">{worker.fullName.charAt(0)}</div>
                  <div className="worker-meta">
                    <div className="worker-name-row">
                      <span className="worker-name">{worker.fullName}</span>
                      {worker.verified && (
                        <span className="verified-badge"><VerifiedIcon /> Verified</span>
                      )}
                    </div>
                    <div className="worker-rating">
                      <span className="star-icon"><StarIcon /></span>
                      <strong>{worker.rating}</strong>
                      <span className="review-count">({worker.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                <p className="worker-bio">{worker.bio}</p>
                <div className="worker-tags">
                  {worker.categories.map((c) => (
                    <span key={c} className="worker-tag">{c.replace(/-/g, " ")}</span>
                  ))}
                </div>
                <div className="worker-footer">
                  <div className="worker-price">
                    <span className="price-amount">₺{worker.hourlyPrice}</span>
                    <span className="price-unit"> / hour</span>
                  </div>
                  <button
                    className="btn-primary btn-book"
                    onClick={() => handleBook(worker)}
                    disabled={bookingInProgress}
                  >
                    {bookingInProgress ? "Sending…" : "Book Now"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ── Get help Today ── */}
      <section className="get-help-today">
        <div className="ght-inner">
          <h2 className="ght-heading">Get help Today</h2>
          <div className="ght-pills">
            {SERVICE_QUICK_LINKS.map((s) => (
              <button key={s.label} className="ght-pill" onClick={() => setActivePage(s.page)}>
                {s.label}
              </button>
            ))}
          </div>
          <button className="ght-see-all" onClick={() => setActivePage("Handyman")}>
            See All Services &rsaquo;
          </button>
        </div>
      </section>

      {/* ── Become a Worker ── */}
      <section className="become-worker-section" id="become-worker">
        <div className="become-worker-inner">
          <div className="become-worker-text">
            <h2 className="become-worker-title">Earn money your way</h2>
            <p className="become-worker-subtitle">See how much you can make tasking on UstayaBirak</p>
            <div className="become-worker-points">
              <div className="bw-point"><span className="bw-point-icon">💰</span><div><strong>Set your own rates</strong><p>You decide how much to charge per hour for each task type.</p></div></div>
              <div className="bw-point"><span className="bw-point-icon">📅</span><div><strong>Choose your schedule</strong><p>Work when it suits you — full time, part time, or weekends only.</p></div></div>
              <div className="bw-point"><span className="bw-point-icon">📍</span><div><strong>Work in your area</strong><p>Pick jobs near you and build a local client base.</p></div></div>
              <div className="bw-point"><span className="bw-point-icon">⭐</span><div><strong>Build your reputation</strong><p>Get reviews, grow your profile, and become a top-rated worker.</p></div></div>
            </div>
            <button className="btn-primary btn-become-worker" onClick={() => setActivePage("__become-worker")}>Get started as a Worker</button>
          </div>
          <div className="become-worker-visual">
            <div className="become-worker-card">
              <div className="bw-card-header">Top earners this month</div>
              {[
                { name: "Aryan K.", cat: "Electrical", earn: "₺3,200", rating: "4.9" },
                { name: "Leila M.", cat: "Cleaning", earn: "₺2,800", rating: "5.0" },
                { name: "Deniz Y.", cat: "Moving", earn: "₺2,450", rating: "4.8" },
              ].map((w) => (
                <div className="bw-earner-row" key={w.name}>
                  <div className="bw-earner-avatar">{w.name.charAt(0)}</div>
                  <div className="bw-earner-info">
                    <span className="bw-earner-name">{w.name}</span>
                    <span className="bw-earner-cat">{w.cat}</span>
                  </div>
                  <div className="bw-earner-right">
                    <span className="bw-earner-earn">{w.earn}</span>
                    <span className="bw-earner-rating">★ {w.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer-main">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src="/logo.png" alt="UstayaBirak" height={38} />
            <p>Book trusted local workers for any home task — fast, affordable, and guaranteed.</p>
          </div>
          <div className="footer-col">
            <h4>Discover</h4>
            <button onClick={() => setActivePage("__become-worker")}>Become a Worker</button>
            <button onClick={() => setActivePage("Handyman")}>All Services</button>
            <button onClick={() => setActivePage("Moving Services")}>Services Nearby</button>
            <button onClick={() => setShowAuth(true)}>Help</button>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
            <a href="#">Terms &amp; Privacy</a>
          </div>
          <div className="footer-col">
            <h4>Download our app</h4>
            <p>Tackle your to-do list wherever you are with our mobile app.</p>
            <div className="footer-app-badges">
              <div className="app-badge">📱 App Store</div>
              <div className="app-badge">🤖 Google Play</div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} UstayaBirak.com — All rights reserved.</p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">ig</a>
            <a href="#" aria-label="LinkedIn">in</a>
          </div>
        </div>
      </footer>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={(user) => { setCurrentUser(user); setShowAuth(false); }}
        />
      )}
    </div>
  );
}
