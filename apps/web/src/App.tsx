import { useEffect, useRef, useState } from "react";
import type { Role, WorkerProfile } from "@ustaya/shared";
import { apiGet } from "./api";
import { socket } from "./socket";
import ServiceDetailPage from "./ServiceDetailPage";
import BecomeWorkerPage from "./BecomeWorkerPage";
import AuthModal from "./AuthModal";
import CheckoutModal, { type BookingRecord } from "./CheckoutModal";
import TaskDescriptionModal, { type TaskDescription } from "./TaskDescriptionModal";
import DateTimePickerModal from "./DateTimePickerModal";
import MyBookingsPage from "./MyBookingsPage";
import UserProfilePage from "./UserProfilePage";
import WorkerDashboardPage from "./WorkerDashboardPage";
import { SERVICE_DETAILS } from "./serviceData";
import { useLang } from "./LangContext";
import { t } from "./translations";

interface AppUser {
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
}

interface BookingFlowState {
  worker: WorkerProfile;
  serviceTitle: string;
  catId: string;
  taskDescription?: TaskDescription;
  selectedDate?: string;
  selectedTime?: string;
}

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

const CAT_LABEL: Record<string, { en: string; tr: string }> = {
  electrician: { en: "Electrical",   tr: "Elektrik" },
  plumber:     { en: "Plumbing",     tr: "Su Tesisatı" },
  cleaning:    { en: "Cleaning",     tr: "Temizlik" },
  painting:    { en: "Painting",     tr: "Boyama" },
  "ac-repair": { en: "AC & Heating", tr: "Klima & Isıtma" },
  moving:      { en: "Moving",       tr: "Nakliyat" },
  other:       { en: "Home Repairs", tr: "Ev Tamiratı" },
  _trending:   { en: "Trending",     tr: "Popüler" },
};

const SUB_PILL_PAGE_MAP: Record<string, string> = {
  "Outlet Repair": "Electrical Help",
  "Light Fixture Install": "Light Installation",
  "Fuse Box": "Electrical Help",
  "Smart Wiring": "Smart Home Installation",
  "Circuit Breaker": "Electrical Help",
  "Leak Repair": "Plumbing",
  "Tap & Faucet": "Plumbing",
  "Toilet Fix": "Plumbing",
  "Pipe Inspection": "Plumbing",
  "Boiler Check": "Plumbing",
  "Deep Clean": "Deep Cleaning",
  "Regular Clean": "Cleaning",
  "Office Clean": "Office Services",
  "Move-Out Clean": "Cleaning",
  "Window Clean": "Cleaning",
  "Interior Painting": "Painting",
  "Exterior Painting": "Painting",
  "Wallpapering": "Wallpapering Service",
  "Accent Wall": "Painting",
  "Wood Staining": "Painting",
  "AC Service": "Install Air Conditioner",
  "AC Install": "Install Air Conditioner",
  "Heating Repair": "Home Maintenance",
  "Filter Change": "Home Maintenance",
  "Duct Cleaning": "Home Maintenance",
  "Help Moving": "Help Moving",
  "Packing & Unpacking": "Packing Services & Help",
  "Furniture Removal": "Furniture Removal",
  "Heavy Lifting": "Heavy Lifting",
  "Junk Removal": "Junk Pickup",
  "Door & Cabinet": "Door, Cabinet & Furniture Repair",
  "Wall Repair": "Drywall Repair Service",
  "Flooring Help": "Flooring & Tiling Help",
  "Appliance Install": "Appliance Installation & Repairs",
  "Light Carpentry": "Carpentry Services",
  "General Cleaning": "Cleaning",
  "Light Fixture": "Light Installation",
};

const CATEGORIES = [
  { id: "electrician", label: "Electrical", Icon: ElectricalIcon, accent: "#fff4f2", iconBg: "#fde8e4",
    subs: ["Outlet Repair", "Light Fixture Install", "Fuse Box", "Smart Wiring", "Circuit Breaker"],
    headline: "Electrical Help",        headlineTr: "Elektrik Yardımı",
    bullets: ["Fix outlets, switches, and power issues safely.", "Install light fixtures, fans, and smart home devices."],
    bulletsTr: ["Priz, anahtar ve elektrik sorunlarını güvenle çözün.", "Aydınlatma armatürleri, fanlar ve akıllı ev cihazları kurun."],
    trending: "Smart home setups, EV charger installs, and LED upgrades are highly requested.",
    trendingTr: "Akıllı ev kurulumları, EV şarj cihazları ve LED yükseltmeleri yoğun talep görüyor." },
  { id: "plumber", label: "Plumbing", Icon: PlumbingIcon, accent: "#f0f7ff", iconBg: "#d6eaff",
    subs: ["Leak Repair", "Tap & Faucet", "Toilet Fix", "Pipe Inspection", "Boiler Check"],
    headline: "Plumbing Services",      headlineTr: "Su Tesisatı Hizmetleri",
    bullets: ["Fix leaks, blocked drains, and burst pipes fast.", "Install taps, boilers, and bathroom fixtures."],
    bulletsTr: ["Su kaçaklarını, tıkalı boruları ve patlak boruları hızla çözün.", "Musluklar, kazanlar ve banyo armatürleri kurulumu yapın."],
    trending: "Boiler servicing, smart showers, and water-saving faucets.",
    trendingTr: "Kazan servisi, akıllı duşlar ve su tasarruflu musluklar." },
  { id: "cleaning", label: "Cleaning", Icon: CleaningIcon, accent: "#f3fbff", iconBg: "#caeeff",
    subs: ["Deep Clean", "Regular Clean", "Office Clean", "Move-Out Clean", "Window Clean"],
    headline: "Cleaning",               headlineTr: "Temizlik",
    bullets: ["Clean your home or office; deep clean appliances and every space.", "Eco-friendly products and professional-grade equipment."],
    bulletsTr: ["Ev veya ofisinizi temizleyin; cihazları ve her alanı derinlemesine temizleyin.", "Çevre dostu ürünler ve profesyonel ekipmanlarla."],
    trending: "Post-renovation deep cleans and eco-friendly cleaning kits.",
    trendingTr: "Tadilat sonrası derin temizlik ve çevre dostu temizlik kitleri." },
  { id: "painting", label: "Painting", Icon: PaintingIcon, accent: "#fff8f0", iconBg: "#fde6c8",
    subs: ["Interior Painting", "Exterior Painting", "Wallpapering", "Accent Wall", "Wood Staining"],
    headline: "Painting",               headlineTr: "Boyama",
    bullets: ["Paint walls, ceilings, molding, and doors; includes prep and cleanup.", "Color blocking, feature walls, and specialist finishes."],
    bulletsTr: ["Duvarlar, tavanlar, pervazlar ve kapıları boyayın; hazırlık ve temizlik dahildir.", "Renk blokları, özellik duvarları ve uzman kaplamalar."],
    trending: "Limewash finishes, accent walls, and bold statement colors.",
    trendingTr: "Kireç boyaları, aksan duvarlar ve cesur renkler popüler." },
  { id: "ac-repair", label: "AC & Heating", Icon: AcIcon, accent: "#f0fafc", iconBg: "#c8ecf8",
    subs: ["AC Service", "AC Install", "Heating Repair", "Filter Change", "Duct Cleaning"],
    headline: "AC & Heating",           headlineTr: "Klima & Isıtma",
    bullets: ["Service, repair, and install air conditioning and heating units.", "Seasonal maintenance to keep your home comfortable all year."],
    bulletsTr: ["Klima ve ısıtma sistemleri için bakım, onarım ve kurulum.", "Evinizi yıl boyunca konforlu tutmak için mevsimlik bakım."],
    trending: "Smart thermostats, energy-efficient units, and air quality sensors.",
    trendingTr: "Akıllı termostatlar, enerji verimli cihazlar ve hava kalitesi sensörleri." },
  { id: "moving", label: "Moving", Icon: MovingIcon, accent: "#f5fff2", iconBg: "#c8f0be",
    subs: ["Help Moving", "Packing & Unpacking", "Furniture Removal", "Heavy Lifting", "Junk Removal"],
    headline: "Moving",                 headlineTr: "Nakliyat",
    bullets: ["Packing, loading, and lifting help for any move size.", "Single-item moves, apartment moves, and junk removal."],
    bulletsTr: ["Her boyutta taşıma için paketleme, yükleme ve kaldırma yardımı.", "Tek parça taşıma, daire taşıma ve hurda kaldırma."],
    trending: "Single-item moves, last-mile delivery, and apartment relocations.",
    trendingTr: "Tek parça taşıma, son kilometre teslimat ve daire taşınmaları." },
  { id: "other", label: "Home Repairs", Icon: RepairIcon, accent: "#fffbf0", iconBg: "#faeabe",
    subs: ["Door & Cabinet", "Wall Repair", "Flooring Help", "Appliance Install", "Light Carpentry"],
    headline: "Home Repairs",           headlineTr: "Ev Tamiratı",
    bullets: ["Home improvements: plumbing, electrical, and appliance installation.", "Small fixes done right — no job is too small."],
    bulletsTr: ["Ev bakımı: tesisat, elektrik ve beyaz eşya kurulumu.", "Küçük onarımlar doğru yapılır — hiçbir iş küçük değildir."],
    trending: "Smart home devices, energy-efficient appliances, and bathroom upgrades.",
    trendingTr: "Akıllı ev cihazları, enerji verimli beyaz eşyalar ve banyo yenilemeleri." },
  { id: "_trending", label: "Trending", Icon: TrendingIcon, accent: "#fff4f2", iconBg: "#ffcdc6",
    subs: ["Help Moving", "General Cleaning", "Appliance Install", "AC Service", "Light Fixture"],
    headline: "Trending Now",           headlineTr: "Şu An Popüler",
    bullets: ["Discover the most-booked services on the platform this week.", "Book a top-rated worker before they fill up."],
    bulletsTr: ["Bu hafta platformdaki en çok rezerve edilen hizmetleri keşfedin.", "Dolmadan önce en yüksek puanlı ustayı rezerve edin."],
    trending: "Spring cleaning, AC tune-ups, and smart lighting are all surging.",
    trendingTr: "Bahar temizliği, klima ayarı ve akıllı aydınlatma yoğun talep görüyor." },
] as const;

type CatId = (typeof CATEGORIES)[number]["id"];

const POPULAR_PROJECTS = [
  { emoji: "🪑", title: "Furniture Assembly",    titleTr: "Mobilya Montajı",          startPrice: 199, color: "#eef0ff", page: "Furniture Assembly" },
  { emoji: "🖼️", title: "Mount Art or Shelves", titleTr: "Tablo veya Raf Asma",       startPrice: 249, color: "#fff0f0", page: "Mounting & Installation" },
  { emoji: "📺", title: "Mount a TV",            titleTr: "TV Montajı",               startPrice: 269, color: "#f0fff8", page: "Mounting & Installation" },
  { emoji: "🚚", title: "Help Moving",           titleTr: "Taşıma Yardımı",           startPrice: 279, color: "#fff8f0", page: "Moving Services" },
  { emoji: "🧹", title: "Home Cleaning",         titleTr: "Ev Temizliği",             startPrice: 199, color: "#f0f8ff", page: "Cleaning" },
  { emoji: "🔧", title: "Minor Plumbing Repair", titleTr: "Küçük Tesisat Tamiri",     startPrice: 299, color: "#fffff0", page: "Handyman" },
  { emoji: "⚡", title: "Electrical Help",       titleTr: "Elektrik Yardımı",         startPrice: 279, color: "#fffaf0", page: "Handyman" },
  { emoji: "💪", title: "Heavy Lifting",         titleTr: "Ağır Kaldırma",            startPrice: 249, color: "#fff0fc", page: "Moving Services" },
];

const REVIEWS = [
  {
    name: "Ayşe D.",
    stars: 5,
    text: "Fantastic service! They mounted our TV and two shelves exactly where we wanted. Quick, tidy and friendly. Will definitely book again.",
    textTr: "Harika hizmet! TV'mizi ve iki rafa tam istediğimiz yere monte ettiler. Hızlı, düzenli ve güler yüzlü. Kesinlikle tekrar rezervasyon yapacağız.",
    service: "Mounting & Installation",
    serviceTr: "Montaj & Kurulum",
    page: "Mounting & Installation",
  },
  {
    name: "Ali R.",
    stars: 5,
    text: "We had the whole apartment deep-cleaned before moving in. The difference was incredible — spotless from top to bottom. Highly recommend!",
    textTr: "Taşınmadan önce tüm apartmanı derinlemesine temizlettirdik. Fark inanılmazdı — baştan sona tertemiz. Kesinlikle tavsiye ederim!",
    service: "Home Cleaning",
    serviceTr: "Ev Temizliği",
    page: "Cleaning",
  },
];

const SERVICE_QUICK_LINKS = [
  { label: "General Mounting", page: "General Mounting" },
  { label: "TV Mounting", page: "TV Mounting" },
  { label: "Furniture Assembly", page: "Furniture Assembly" },
  { label: "Help Moving", page: "Help Moving" },
  { label: "House Cleaning", page: "Cleaning" },
  { label: "Yardwork", page: "Yardwork" },
  { label: "Furniture Removal", page: "Furniture Removal" },
  { label: "Lawn Care", page: "Yardwork" },
  { label: "Hang Pictures", page: "Mounting & Installation" },
  { label: "In Home Furniture Movers", page: "Moving Services" },
  { label: "Shelf Mounting", page: "Install Shelves, Rods & Hooks" },
  { label: "Light Installation", page: "Handyman" },
  { label: "Plumbing", page: "Plumbing" },
  { label: "Electrical Help", page: "Electrical Help" },
  { label: "Home Repairs", page: "Home Repairs" },
  { label: "Painting", page: "Painting" },
  { label: "Personal Assistant", page: "Personal Assistant" },
];

const SEARCH_INDEX: { label: string; labelTr: string; page: string }[] = [
  { label: "Handyman", labelTr: "Tamirci", page: "Handyman" },
  { label: "Cleaning", labelTr: "Temizlik", page: "Cleaning" },
  { label: "Furniture Assembly", labelTr: "Mobilya Kurulum", page: "Furniture Assembly" },
  { label: "Mounting & Installation", labelTr: "Montaj ve Kurulum", page: "Mounting & Installation" },
  { label: "Moving Services", labelTr: "Taşıma Hizmetleri", page: "Moving Services" },
  { label: "Yardwork", labelTr: "Bahçe İşleri", page: "Yardwork" },
  { label: "Shopping & Delivery", labelTr: "Alışveriş ve Teslimat", page: "Shopping & Delivery" },
  { label: "Painting", labelTr: "Boyama", page: "Painting" },
  { label: "Virtual & Online Tasks", labelTr: "Sanal ve Online İşler", page: "Virtual & Online Tasks" },
  { label: "Office Services", labelTr: "Ofis Hizmetleri", page: "Office Services" },
  { label: "Baby Prep", labelTr: "Bebek Hazırlığı", page: "Baby Prep" },
  { label: "Holidays", labelTr: "Tatil Dekorasyonu", page: "Holidays" },
  { label: "Winter Tasks", labelTr: "Kış İşleri", page: "Winter Tasks" },
  { label: "Personal Assistant", labelTr: "Kişisel Asistan", page: "Personal Assistant" },
  { label: "Contactless Tasks", labelTr: "Temassız Görevler", page: "Contactless Tasks" },
  { label: "Featured Tasks", labelTr: "Öne Çıkan Görevler", page: "Featured Tasks" },
  { label: "Door, Cabinet & Furniture Repair", labelTr: "Kapı, Dolap ve Mobilya Tamiri", page: "Door, Cabinet & Furniture Repair" },
  { label: "Appliance Installation & Repairs", labelTr: "Cihaz Kurulumu ve Tamiri", page: "Appliance Installation & Repairs" },
  { label: "TV Mounting", labelTr: "TV Montajı", page: "TV Mounting" },
  { label: "Drywall Repair Service", labelTr: "Alçıpan Tamiri", page: "Drywall Repair Service" },
  { label: "Flooring & Tiling Help", labelTr: "Zemin ve Fayans Yardımı", page: "Flooring & Tiling Help" },
  { label: "Electrical Help", labelTr: "Elektrik Yardımı", page: "Electrical Help" },
  { label: "Plumbing", labelTr: "Sıhhi Tesisat", page: "Plumbing" },
  { label: "Window & Blinds Repair", labelTr: "Pencere ve Stor Tamiri", page: "Window & Blinds Repair" },
  { label: "Ceiling Fan Installation", labelTr: "Tavan Vantilatörü Kurulumu", page: "Ceiling Fan Installation" },
  { label: "Smart Home Installation", labelTr: "Akıllı Ev Kurulumu", page: "Smart Home Installation" },
  { label: "Heavy Lifting", labelTr: "Ağır Taşıma", page: "Heavy Lifting" },
  { label: "Install Air Conditioner", labelTr: "Klima Kurulumu", page: "Install Air Conditioner" },
  { label: "Home Maintenance", labelTr: "Ev Bakımı", page: "Home Maintenance" },
  { label: "Baby Proofing", labelTr: "Bebek Güvenliği", page: "Baby Prep" },
  { label: "Carpentry Services", labelTr: "Marangozluk", page: "Carpentry Services" },
  { label: "General Mounting", labelTr: "Genel Montaj", page: "General Mounting" },
  { label: "Cabinet Installation", labelTr: "Dolap Kurulumu", page: "Cabinet Installation" },
  { label: "Wallpapering Service", labelTr: "Duvar Kağıdı Servis", page: "Wallpapering Service" },
  { label: "Fence Installation & Repair", labelTr: "Çit Kurulumu ve Tamiri", page: "Fence Installation & Repair" },
  { label: "Deck Restoration Services", labelTr: "Deck Restorasyon", page: "Deck Restoration Services" },
  { label: "Doorbell Installation", labelTr: "Kapı Zili Kurulumu", page: "Doorbell Installation" },
  { label: "Home Repairs", labelTr: "Ev Tamiri", page: "Home Repairs" },
  { label: "Sealing & Caulking", labelTr: "Sızdırmazlık ve Derz", page: "Sealing & Caulking" },
  { label: "Home Theater Installing", labelTr: "Ev Sineması Kurulumu", page: "Home Theater Installing" },
  { label: "House Cleaning Services", labelTr: "Ev Temizlik Hizmetleri", page: "Cleaning" },
  { label: "Deep Cleaning", labelTr: "Derin Temizlik", page: "Deep Cleaning" },
  { label: "Move In Cleaning", labelTr: "Taşınma Öncesi Temizlik", page: "Move In Cleaning" },
  { label: "Move Out Cleaning", labelTr: "Taşınma Sonrası Temizlik", page: "Cleaning" },
  { label: "Carpet Cleaning Service", labelTr: "Halı Temizleme", page: "Carpet Cleaning Service" },
  { label: "Garage Cleaning", labelTr: "Garaj Temizliği", page: "Cleaning" },
  { label: "Spring Cleaning", labelTr: "Bahar Temizliği", page: "Spring Cleaning" },
  { label: "Pressure Washing", labelTr: "Basınçlı Yıkama", page: "Cleaning" },
  { label: "Disinfecting Services", labelTr: "Dezenfeksiyon Hizmeti", page: "Disinfecting Services" },
  { label: "Patio Furniture Assembly", labelTr: "Bahçe Mobilyası Kurulumu", page: "Furniture Assembly" },
  { label: "Desk Assembly", labelTr: "Masa Kurulumu", page: "Furniture Assembly" },
  { label: "Bed Assembly", labelTr: "Yatak Kurulumu", page: "Furniture Assembly" },
  { label: "Bookshelf Assembly", labelTr: "Kitaplık Kurulumu", page: "Furniture Assembly" },
  { label: "Wardrobe Assembly", labelTr: "Gardırop Kurulumu", page: "Furniture Assembly" },
  { label: "Install Shelves, Rods & Hooks", labelTr: "Raf, Askı ve Kanca Kurulumu", page: "Install Shelves, Rods & Hooks" },
  { label: "Hang Art, Mirror & Decor", labelTr: "Tablo, Ayna ve Dekor Asma", page: "Hang Art, Mirror & Decor" },
  { label: "Hang Christmas Lights", labelTr: "Yılbaşı Işığı Asma", page: "Mounting & Installation" },
  { label: "Help Moving", labelTr: "Taşınma Yardımı", page: "Help Moving" },
  { label: "Packing Services & Help", labelTr: "Paketleme Hizmeti", page: "Packing Services & Help" },
  { label: "Junk Pickup", labelTr: "Hurda Toplama", page: "Junk Pickup" },
  { label: "Furniture Removal", labelTr: "Mobilya Kaldırma", page: "Furniture Removal" },
  { label: "Mattress Pick-Up & Removal", labelTr: "Yatak Alma ve Kaldırma", page: "Moving Services" },
  { label: "Gardening Services", labelTr: "Bahçe Bakımı", page: "Gardening Services" },
  { label: "Lawn Mowing Services", labelTr: "Çim Biçme", page: "Lawn Mowing Services" },
  { label: "Landscaping Services", labelTr: "Peyzaj Hizmetleri", page: "Yardwork" },
  { label: "Tree Trimming Service", labelTr: "Ağaç Budama", page: "Tree Trimming Service" },
  { label: "Gutter Cleaning", labelTr: "Oluk Temizliği", page: "Yardwork" },
  { label: "Weed Removal", labelTr: "Yabani Ot Temizleme", page: "Weed Removal" },
  { label: "Hedge Trimming Service", labelTr: "Çit Budama", page: "Hedge Trimming Service" },
  { label: "Grocery Shopping & Delivery", labelTr: "Market Alışverişi ve Teslimat", page: "Grocery Shopping & Delivery" },
  { label: "Delivery Service", labelTr: "Teslimat Hizmeti", page: "Shopping & Delivery" },
  { label: "Running Your Errands", labelTr: "İş Takibi", page: "Running Your Errands" },
  { label: "Wait in Line", labelTr: "Kuyrukta Bekleme", page: "Wait in Line" },
  { label: "Interior Painting", labelTr: "İç Mekan Boyama", page: "Painting" },
  { label: "Exterior Painting", labelTr: "Dış Cephe Boyama", page: "Painting" },
  { label: "Accent Wall", labelTr: "Vurgu Duvarı Boyama", page: "Painting" },
  { label: "Wood Staining", labelTr: "Ahşap Boyama", page: "Painting" },
  { label: "Virtual Assistant", labelTr: "Sanal Asistan", page: "Virtual & Online Tasks" },
  { label: "Data Entry", labelTr: "Veri Girişi", page: "Virtual & Online Tasks" },
  { label: "Computer Help", labelTr: "Bilgisayar Yardımı", page: "Virtual & Online Tasks" },
  { label: "Snow Removal", labelTr: "Kar Temizleme", page: "Winter Tasks" },
  { label: "Gift Wrapping Services", labelTr: "Hediye Paketleme", page: "Holidays" },
  { label: "Holiday Decorating", labelTr: "Tatil Dekorasyonu", page: "Holidays" },
  { label: "Christmas Tree Delivery", labelTr: "Yılbaşı Ağacı Teslimatı", page: "Holidays" },
];

const STATIC_PAGES: Record<string, { title: string; sections: { heading: string; body: string }[] }> = {
  "__about": {
    title: "About Us",
    sections: [
      { heading: "Our Story", body: "UstaYolda was founded with a simple mission: make it easy for people in Turkey to get reliable help at home. We connect customers with vetted, skilled local workers — from electricians and cleaners to movers and handymen — all in one place." },
      { heading: "Our Mission", body: "We believe everyone deserves a well-maintained home without the stress of finding trustworthy help. By combining transparent pricing, real customer reviews, and rigorous background checks, we take the guesswork out of hiring." },
      { heading: "How We Vet Our Workers", body: "Every worker on UstaYolda goes through identity verification, background screening, and skills assessment before being approved. We continuously monitor ratings and reviews to ensure consistently high quality." },
      { heading: "Our Vision", body: "We're building Turkey's most trusted home services platform — one task at a time. From Istanbul to Ankara, Izmir to Antalya, our goal is to be the first place you turn whenever you need help around the house." },
    ],
  },
  "__careers": {
    title: "Careers",
    sections: [
      { heading: "Join Our Team", body: "We're a fast-growing startup on a mission to transform how people get home tasks done in Turkey. We're always looking for talented, driven people to join us." },
      { heading: "Open Roles", body: "🚀 Full Stack Engineer (Istanbul / Remote)\n🎨 Product Designer (Istanbul)\n📣 Growth & Marketing Manager (Istanbul)\n🤝 City Operations Manager (Multiple Cities)\n\nDon't see your role? Send a general application to careers@ustayolda.com — we'd love to hear from you." },
      { heading: "Why UstaYolda?", body: "Competitive salary and equity. Flexible remote-friendly culture. Real impact from day one — you'll shape how millions of Turks get help at home. Generous leave, health insurance, and team off-sites." },
    ],
  },
  "__blog": {
    title: "Blog",
    sections: [
      { heading: "5 Home Tasks You Should Never Put Off", body: "Leaky taps, loose door hinges, blocked gutters — small problems compound fast. Here's our guide to the five tasks every homeowner should tackle before they become expensive repairs." },
      { heading: "How to Find a Reliable Handyman in Istanbul", body: "With hundreds of handymen available, how do you choose? We break down what to look for: verifications, reviews, response time, and the questions you should always ask before booking." },
      { heading: "Spring Cleaning Checklist: Room by Room", body: "It's that time of year. Our room-by-room checklist covers everything from deep-cleaning kitchen appliances to decluttering wardrobes — plus tips on when to call in a professional." },
      { heading: "Behind the App: How UstaYolda Matches You with Workers", body: "Our matching algorithm considers location, availability, skills, and ratings to find you the best Tasker within minutes. Here's a peek under the hood at how it all works." },
    ],
  },
  "__terms": {
    title: "Terms & Privacy",
    sections: [
      { heading: "Terms of Service", body: "By using UstaYolda you agree to our terms. You must be 18 or older to book services. All bookings are subject to worker availability and platform approval. Payments are processed securely and refunds are handled per our cancellation policy." },
      { heading: "Privacy Policy", body: "We collect only the data necessary to provide our service: your name, email, location, and booking history. We never sell your personal data to third parties. All data is stored securely and encrypted in transit." },
      { heading: "Cookie Policy", body: "UstaYolda uses essential cookies to keep you logged in and remember your preferences. We also use analytics cookies (with your consent) to improve the platform. You can manage cookie preferences in your browser settings." },
      { heading: "Contact", body: "For questions about these policies, contact us at legal@ustayolda.com or write to UstaYolda Ltd., Levent, Istanbul, Turkey." },
    ],
  },
  "__help": {
    title: "Help & Support",
    sections: [
      { heading: "How do I book a Worker?", body: "Search for the service you need, browse available workers, and click Book Now. Choose a time that works for you and complete the secure payment online. You'll receive a confirmation and can chat with your worker directly in the app." },
      { heading: "What if I need to cancel?", body: "You can cancel or reschedule up to 24 hours before your appointment at no charge. Cancellations within 24 hours may incur a small fee. Navigate to My Bookings in your account to manage your appointments." },
      { heading: "Is my payment secure?", body: "Yes. All payments are processed through our certified payment provider with bank-level encryption. We never store your card details on our servers." },
      { heading: "What is the Happiness Pledge?", body: "If you're not satisfied with a completed task, contact our support team within 72 hours and we'll work to make it right — either by sending another worker or issuing a refund." },
      { heading: "How do I contact support?", body: "Email us at support@ustayolda.com or use the in-app chat. Our support team is available 7 days a week, 08:00–22:00 Istanbul time." },
    ],
  },
};


const STATIC_PAGES_TR: Record<string, { title: string; sections: { heading: string; body: string }[] }> = {
  "__about": {
    title: "Hakkımızda",
    sections: [
      { heading: "Hikayemiz", body: "UstaYolda, Türkiye'deki insanların evde güvenilir yardım bulmasını kolaylaştırmak için kuruldu. Elektrikçilerden temizlikçilere, nakliyecilerden tamircilere kadar tüm yerel ve güvenilir ustalarımızı tek çatı altında birleştiriyoruz." },
      { heading: "Misyonumuz", body: "Herkesin güven içinde, stres olmadan evinde ihtiyacı olan yardımı alabilmesi gerektiğine inanıyoruz. Şeffaf fiyatlar, gerçek müşteri yorumları ve kapsamlı kimlik doğrulaması ile sizi doğru ustayla buluşturuyoruz." },
      { heading: "Ustalarımızı Nasıl Seçiyoruz?", body: "UstaYolda'daki her usta; kimlik doğrulama, geçmiş taraması ve beceri değerlendirmesinden geçtikten sonra platforma kabul edilir. Kaliteyi sürekli yüksek tutmak için puanları ve yorumları düzenli olarak takip ediyoruz." },
      { heading: "Vizyonumuz", body: "İstanbul'dan Ankara'ya, İzmir'den Antalya'ya Türkiye'nin en güvenilir ev hizmetleri platformunu inşa ediyoruz. Evinizle ilgili bir ihtiyacınız olduğunda akla gelen ilk isim olmak istiyoruz." },
    ],
  },
  "__careers": {
    title: "Kariyer",
    sections: [
      { heading: "Ekibimize Katılın", body: "Türkiye'de ev işlerinin yapılma şeklini dönüştürme misyonuyla büyüyen bir girişimiz. Her zaman yetenekli ve hırslı insanları arıyoruz." },
      { heading: "Açık Pozisyonlar", body: "🚀 Full Stack Mühendis (İstanbul / Uzaktan)\n🎨 Ürün Tasarımcısı (İstanbul)\n📣 Büyüme & Pazarlama Müdürü (İstanbul)\n🤝 Şehir Operasyon Müdürü (Birden fazla şehir)\n\nRolünüzü bulamadınız mı? careers@ustayolda.com adresine genel başvuru gönderin." },
      { heading: "Neden UstaYolda?", body: "Rekabetçi maaş ve hisse senedi. Esnek ve uzaktan çalışmaya uygun kültür. İlk günden itibaren somut etki: milyonlarca insanın evde yardım almasına katkıda bulunacaksınız. Cömert izin, sağlık sigortası ve düzenli ekip buluşmaları." },
    ],
  },
  "__blog": {
    title: "Blog",
    sections: [
      { heading: "Asla Ertelememek Gereken 5 Ev Görevi", body: "Akan musluklar, gevşek kapı menteşeleri, tıkalı oluklar — küçük sorunlar hızla büyür. İşte her ev sahibinin pahalı tamiratlara dönüşmeden önce halletmesi gereken beş görev." },
      { heading: "İstanbul'da Güvenilir Tamirci Nasıl Bulunur?", body: "Yüzlerce tamirci arasından doğru kişiyi nasıl seçersiniz? Nelere dikkat etmeli: kimlik doğrulama, yorumlar, yanıt süresi ve rezervasyon yapmadan önce sormanız gereken sorular." },
      { heading: "Bahar Temizliği Kontrol Listesi: Oda Oda", body: "Zamanı geldi. Oda oda kontrol listemiz, mutfak ekipmanlarının derin temizliğinden dolap düzenine kadar her adımı kapsar; ne zaman profesyonel destek almanız gerektiğine dair ipuçları da içerir." },
      { heading: "Perde Arkası: UstaYolda Sizi Ustalarla Nasıl Eşleştiriyor?", body: "Eşleştirme algoritmamız, dakikalar içinde size en iyi ustayı bulmak için konum, müsaitlik, beceri ve puanları değerlendirir. İşin perde arkasına bir göz atın." },
    ],
  },
  "__terms": {
    title: "Koşullar & Gizlilik",
    sections: [
      { heading: "Kullanım Koşulları", body: "UstaYolda'yı kullanarak koşullarımızı kabul etmiş olursunuz. Hizmet rezervasyonu yapabilmek için 18 yaşında veya daha büyük olmanız gerekmektedir. Tüm rezervasyonlar usta müsaitliğine ve platform onayına tabidir." },
      { heading: "Gizlilik Politikası", body: "Yalnızca hizmetimizi sunmak için gerekli verileri topluyoruz: adınız, e-postanız, konumunuz ve rezervasyon geçmişiniz. Kişisel verilerinizi üçüncü taraflarla asla paylaşmıyoruz." },
      { heading: "Çerez Politikası", body: "UstaYolda, oturum açık tutmak ve tercihlerinizi hatırlamak için zorunlu çerezler kullanır. Ayrıca onayınızla platformu geliştirmek için analitik çerezler kullanıyoruz." },
      { heading: "İletişim", body: "Bu politikalar hakkında sorularınız için legal@ustayolda.com adresine yazabilir ya da UstaYolda Ltd., Levent, İstanbul, Türkiye adresine ulaşabilirsiniz." },
    ],
  },
  "__help": {
    title: "Yardım & Destek",
    sections: [
      { heading: "Usta Nasıl Rezerve Edilir?", body: "İhtiyacınız olan hizmeti arayın, müsait ustalar arasından seçin ve Rezervasyon Yap'a tıklayın. Size uygun bir zaman seçin ve güvenli ödemeyi çevrimiçi tamamlayın. Onay alacaksınız ve usta ile doğrudan uygulama içinde iletişime geçebilirsiniz." },
      { heading: "İptal Etmem Gerekirse?", body: "Randevunuzdan 24 saat öncesine kadar ücretsiz iptal veya yeniden zamanlama yapabilirsiniz. 24 saat içindeki iptallerde küçük bir ücret uygulanabilir." },
      { heading: "Ödeme Güvenli mi?", body: "Evet. Tüm ödemeler banka düzeyinde şifreleme kullanan onaylı ödeme sağlayıcımız aracılığıyla işlenir. Kart bilgilerinizi sunucularımızda asla saklamıyoruz." },
      { heading: "Mutluluk Taahhüdü Nedir?", body: "Tamamlanan bir görevden memnun kalmazsanız, 72 saat içinde destek ekibimizle iletişime geçin. Sorunu çözmek için başka bir usta göndereceğiz ya da para iadesi yapacağız." },
      { heading: "Destek ile Nasıl İletişime Geçilir?", body: "support@ustayolda.com adresine e-posta gönderebilir veya uygulama içi sohbeti kullanabilirsiniz. Destek ekibimiz haftanın 7 günü, 08:00–22:00 İstanbul saatiyle hizmetinizdedir." },
    ],
  },
};

export default function App() {
  const [activeCat, setActiveCat] = useState<CatId>("electrician");
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<string | null>(null);
  const [workers, setWorkers] = useState<WorkerProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { lang, setLang } = useLang();
  const LangToggle = () => (
    <button className="lang-toggle" onClick={() => setLang(lang === "tr" ? "en" : "tr")}>
      {lang === "tr" ? "🇺🇸 EN" : "🇹🇷 TR"}
    </button>
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [statusLog, setStatusLog] = useState<Array<{ key: string; id: string }>>([]);
  const [showAuth, setShowAuth] = useState(false);
  const [authRole, setAuthRole] = useState<"customer" | "worker">("customer");
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [bookingFlow, setBookingFlow] = useState<BookingFlowState | null>(null);
  const [bookingStep, setBookingStep] = useState<null | "describe" | "datetime" | "confirm">(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const customerId = currentUser?.role === "customer" ? currentUser.id : "c1";
  const category = CATEGORIES.find((c) => c.id === activeCat)!;

  const resetBookingFlow = () => {
    setBookingFlow(null);
    setBookingStep(null);
  };

  useEffect(() => {
    if (currentUser?.role === "worker") {
      socket.emit("join:worker", currentUser.id);
    } else {
      socket.emit("join:customer", customerId);
    }

    socket.on("job:pending", (p: { job: { id: string } }) =>
      setStatusLog((prev) => [{ key: "status_pending_worker", id: p.job.id }, ...prev].slice(0, 5))
    );
    socket.on("job:accepted", (p) =>
      setStatusLog((prev) => [{ key: "status_accepted", id: p.job.id }, ...prev].slice(0, 5))
    );
    socket.on("job:started", (p) =>
      setStatusLog((prev) => [{ key: "status_started", id: p.job.id }, ...prev].slice(0, 5))
    );
    socket.on("job:completed", (p) =>
      setStatusLog((prev) => [{ key: "status_completed", id: p.job.id }, ...prev].slice(0, 5))
    );
    socket.on("job:cancelled", (p: { job: { id: string }; reason?: string }) => {
      const key = p.reason === "Worker declined" ? "status_declined" : "status_booking_cancelled";
      setStatusLog((prev) => [{ key, id: p.job.id }, ...prev].slice(0, 5));
    });
    return () => {
      socket.off("job:pending");
      socket.off("job:accepted");
      socket.off("job:started");
      socket.off("job:completed");
      socket.off("job:cancelled");
    };
  }, [currentUser?.id, currentUser?.role, customerId]);

  useEffect(() => {
    const apiCat = activeCat === "_trending" ? "cleaning" : activeCat;
    apiGet<{ workers: WorkerProfile[] }>(`/workers/search?category=${apiCat}`)
      .then((r) => setWorkers(r.workers))
      .catch(() => {});
    setActiveSub(null);
  }, [activeCat]);

  const handleBook = (worker: WorkerProfile) => {
    const apiCat = activeCat === "_trending" ? "other" : activeCat;
    const serviceTitle = `${category.headline} - ${activeSub ?? category.subs[0]}`;
    setBookingFlow({ worker, serviceTitle, catId: apiCat });
    setBookingStep("describe");
  };

  const handleAuthSuccess = (user: AppUser) => {
    setCurrentUser(user);
    setShowAuth(false);
    if (user.role === "worker") {
      setActivePage("__worker-dashboard");
    }
  };

  const openAuth = (role: "customer" | "worker") => {
    setAuthRole(role);
    setShowAuth(true);
  };

  const suggestions = searchQuery.trim().length > 0
    ? SEARCH_INDEX.filter((s) => {
        const q = searchQuery.toLowerCase();
        return lang === "tr"
          ? s.labelTr.toLowerCase().includes(q) || s.label.toLowerCase().includes(q)
          : s.label.toLowerCase().includes(q);
      }).slice(0, 8)
    : [];

  const filteredWorkers = searchQuery.trim()
    ? workers.filter(
        (w) =>
          w.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          w.categories.some((c) => c.includes(searchQuery.toLowerCase()))
      )
    : workers;

  if (activePage === "__my-bookings" && currentUser) {
    return (
      <MyBookingsPage
        user={currentUser}
        onBack={() => setActivePage(null)}
        onNavigate={(p) => setActivePage(p)}
      />
    );
  }

  if (activePage === "__profile" && currentUser) {
    return (
      <UserProfilePage
        user={currentUser}
        onBack={() => setActivePage(null)}
        onSignOut={() => { setCurrentUser(null); setActivePage(null); }}
        onNavigate={(p) => setActivePage(p)}
        onUserChange={(user) => setCurrentUser(user)}
      />
    );
  }

  if (activePage === "__worker-dashboard" && currentUser) {
    return (
      <WorkerDashboardPage
        user={currentUser}
        onBack={() => setActivePage(null)}
        onNavigate={(p) => setActivePage(p)}
      />
    );
  }

  if (activePage && STATIC_PAGES[activePage]) {
    const sp = lang === "tr" && STATIC_PAGES_TR[activePage] ? STATIC_PAGES_TR[activePage] : STATIC_PAGES[activePage];
    return (
      <div className="root">
        <nav className="navbar">
          <div className="navbar-inner">
            <button className="nav-logo-btn" onClick={() => setActivePage(null)} aria-label="Go to homepage">
              <img src="/logo.png" alt="UstaYolda" height={72} />
            </button>
            <div className="nav-links">
              <button className="nav-link nav-link-btn" onClick={() => setActivePage("__services")}>{t("nav_services", lang)}</button>
              <button className="nav-link nav-link-btn" onClick={() => setActivePage("__workers")}>{t("nav_workers", lang)}</button>
            </div>
            <div className="nav-auth">
              <LangToggle />
              {currentUser ? (
                <div className="nav-user" ref={userMenuRef} style={{ position: "relative" }}>
                  <button className="nav-user-btn" onClick={() => setShowUserMenu((v) => !v)}>
                    <span className="nav-user-avatar">
                      {currentUser.avatarUrl ? (
                        <img
                          src={currentUser.avatarUrl}
                          alt={currentUser.fullName}
                          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                        />
                      ) : (
                        currentUser.fullName.charAt(0).toUpperCase()
                      )}
                    </span>
                    <span className="nav-user-name">{currentUser.fullName}</span>
                    <span className="nav-caret">▾</span>
                  </button>
                  {showUserMenu && (
                    <div className="user-dropdown">
                      <button onClick={() => { setActivePage("__profile"); setShowUserMenu(false); }}>{t("nav_profile", lang)}</button>
                      <button onClick={() => { setActivePage("__my-bookings"); setShowUserMenu(false); }}>{t("nav_bookings", lang)}</button>
                      {currentUser.role === "worker" && (
                        <button onClick={() => { setActivePage("__worker-dashboard"); setShowUserMenu(false); }}>{t("nav_dashboard", lang)}</button>
                      )}
                      <hr className="dropdown-divider" />
                      <button className="dropdown-signout" onClick={() => { setCurrentUser(null); setShowUserMenu(false); }}>{t("nav_signout", lang)}</button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button className="btn-ghost" onClick={() => openAuth("customer")}>{t("nav_login_customer", lang)}</button>
                  <button className="btn-ghost" onClick={() => openAuth("worker")}>{t("nav_login_worker", lang)}</button>
                </>
              )}
              <button className="btn-primary" onClick={() => setActivePage("__become-worker")}>{t("nav_become_worker", lang)}</button>
            </div>
          </div>
        </nav>

        <section className="static-page-section">
          <div className="static-page-inner">
            <button className="static-back-btn" onClick={() => setActivePage(null)}>{t("back_home", lang)}</button>
            <h1 className="static-page-title">{sp.title}</h1>
            {sp.sections.map((sec) => (
              <div className="static-section" key={sec.heading}>
                <h2 className="static-section-heading">{sec.heading}</h2>
                <p className="static-section-body" style={{ whiteSpace: "pre-line" }}>{sec.body}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="footer-main">
          <div className="footer-inner">
            <div className="footer-brand">
              <img src="/logo.png" alt="UstaYolda" height={38} />
              <p>{t("footer_tagline", lang)}</p>
            </div>
            <div className="footer-col">
              <h4>{t("footer_discover", lang)}</h4>
              <button onClick={() => setActivePage("__become-worker")}>{t("nav_become_worker", lang)}</button>
              <button onClick={() => setActivePage("__services")}>{t("footer_all_svc", lang)}</button>
              <button onClick={() => setActivePage("__services")}>{t("footer_nearby", lang)}</button>
              <button onClick={() => setActivePage("__help")}>{t("footer_help", lang)}</button>
            </div>
            <div className="footer-col">
              <h4>{t("footer_company", lang)}</h4>
              <button onClick={() => setActivePage("__about")}>{t("footer_about", lang)}</button>
              <button onClick={() => setActivePage("__careers")}>{t("footer_careers", lang)}</button>
              <button onClick={() => setActivePage("__blog")}>{t("footer_blog", lang)}</button>
              <button onClick={() => setActivePage("__terms")}>{t("footer_terms", lang)}</button>
            </div>
            <div className="footer-col">
              <h4>{t("footer_download", lang)}</h4>
              <p>{t("footer_dl_sub", lang)}</p>
              <div className="footer-app-badges">
                <div className="app-badge">📱 App Store</div>
                <div className="app-badge">🤖 Google Play</div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} UstaYolda.com — {t("footer_rights", lang)}</p>
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
            onSuccess={handleAuthSuccess}
            defaultSignInRole={authRole}
          />
        )}
      </div>
    );
  }

  if (activePage === "__become-worker") {
    return (
      <BecomeWorkerPage
        onBackHome={() => setActivePage(null)}
        onOpenServices={() => setActivePage("__services")}
        onOpenWorkers={() => setActivePage("__workers")}
        onRegistered={(user) => { setCurrentUser(user); setActivePage("__worker-dashboard"); }}
      />
    );
  }

  if (activePage === "__services") {
    return (
      <div className="root">
        <nav className="navbar">
          <div className="navbar-inner">
            <button className="nav-logo-btn" onClick={() => setActivePage(null)} aria-label="Go to homepage">
              <img src="/logo.png" alt="UstaYolda" height={72} />
            </button>
            <div className="nav-links">
              <button className="nav-link nav-link-btn" style={{ color: "var(--primary)", fontWeight: 700 }}>{t("nav_services", lang)}</button>
              <button className="nav-link nav-link-btn" onClick={() => setActivePage("__workers")}>{t("nav_workers", lang)}</button>
            </div>
            <div className="nav-auth">
              <LangToggle />
              {currentUser ? (
                <div className="nav-user" ref={userMenuRef} style={{ position: "relative" }}>
                  <button className="nav-user-btn" onClick={() => setShowUserMenu((v) => !v)}>
                    <span className="nav-user-avatar">
                      {currentUser.avatarUrl ? (
                        <img
                          src={currentUser.avatarUrl}
                          alt={currentUser.fullName}
                          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                        />
                      ) : (
                        currentUser.fullName.charAt(0).toUpperCase()
                      )}
                    </span>
                    <span className="nav-user-name">{currentUser.fullName}</span>
                    <span className="nav-caret">▾</span>
                  </button>
                  {showUserMenu && (
                    <div className="user-dropdown">
                      <button onClick={() => { setActivePage("__profile"); setShowUserMenu(false); }}>{t("nav_profile", lang)}</button>
                      <button onClick={() => { setActivePage("__my-bookings"); setShowUserMenu(false); }}>{t("nav_bookings", lang)}</button>
                      {currentUser.role === "worker" && (
                        <button onClick={() => { setActivePage("__worker-dashboard"); setShowUserMenu(false); }}>{t("nav_dashboard", lang)}</button>
                      )}
                      <hr className="dropdown-divider" />
                      <button className="dropdown-signout" onClick={() => { setCurrentUser(null); setShowUserMenu(false); }}>{t("nav_signout", lang)}</button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button className="btn-ghost" onClick={() => openAuth("customer")}>{t("nav_login_customer", lang)}</button>
                  <button className="btn-ghost" onClick={() => openAuth("worker")}>{t("nav_login_worker", lang)}</button>
                </>
              )}
              <button className="btn-primary" onClick={() => setActivePage("__become-worker")}>{t("nav_become_worker", lang)}</button>
            </div>
          </div>
        </nav>

        <section className="services-page-section">
          <div className="services-page-inner">
            <button className="static-back-btn" onClick={() => setActivePage(null)}>{t("back_home", lang)}</button>
            <h2 className="services-page-title">{t("svc_title", lang)}</h2>
            <p className="services-page-subtitle">{t("svc_subtitle", lang)}</p>
            <div className="services-grid">
              {[
                { img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=70", title: "Featured Tasks", desc: "Let Taskers help tackle your to-do list", subs: ["Furniture Assembly", "Home Repairs", "Help Moving", "Yard Work Services", "Spring Cleaning", "TV Mounting", "Plumbing", "Hang Art, Mirror & Decor", "Electrical Help", "Wait in Line", "Closet Organization Service"] },
                { img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=70", title: "Handyman", desc: "Hire a Tasker for help around the house", subs: ["Door, Cabinet & Furniture Repair", "Appliance Installation & Repairs", "Furniture Assembly", "TV Mounting", "Drywall Repair Service", "Flooring & Tiling Help", "Electrical Help", "Sealing & Caulking", "Plumbing", "Window & Blinds Repair", "Ceiling Fan Installation", "Smart Home Installation", "Heavy Lifting", "Install Air Conditioner", "Painting", "Install Shelves, Rods & Hooks", "Home Maintenance", "Home Repairs", "Baby Proofing", "Carpentry Services", "General Mounting", "Cabinet Installation", "Wallpapering Service", "Fence Installation & Repair", "Deck Restoration Services", "Doorbell Installation", "Home Theater Installing"] },
                { img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=70", title: "Cleaning", desc: "Taskers will make your home sparkle!", subs: ["House Cleaning Services", "Deep Cleaning", "Disinfecting Services", "Move In Cleaning", "Move Out Cleaning", "Vacation Rental Cleaning", "Carpet Cleaning Service", "Garage Cleaning", "One Time Cleaning Services", "Car Washing", "Laundry Help", "Pressure Washing", "Spring Cleaning"] },
                { img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=70", title: "Furniture Assembly", desc: "Expert assembly for any furniture brand", subs: ["Furniture Assembly", "Patio Furniture Assembly", "Desk Assembly", "Dresser Assembly", "Bed Assembly", "Bookshelf Assembly", "Couch Assembly", "Chair Assembly", "Wardrobe Assembly", "Table Assembly", "Disassemble Furniture"] },
                { img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=70", title: "Mounting & Installation", desc: "Wall mounting for TVs, shelves, fans & more", subs: ["TV Mounting", "Install Shelves, Rods & Hooks", "Ceiling Fan Installation", "Install Blinds & Window Treatments", "Hang Art, Mirror & Decor", "General Mounting", "Hang Christmas Lights"] },
                { img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=70", title: "Moving Services", desc: "From heavy lifting to unpacking — make your move easy", subs: ["Help Moving", "Truck Assisted Help Moving", "Packing Services & Help", "Unpacking Services", "Heavy Lifting", "Local Movers", "Junk Pickup", "Furniture Movers", "One Item Movers", "Storage Unit Moving", "Couch Removal", "Mattress Pick-Up & Removal", "Furniture Removal", "Pool Table Movers", "Appliance Removal", "Heavy Furniture Moving", "Rearranging Furniture", "Full Service Help Moving", "In-Home Furniture Movers"] },
                { img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=70", title: "Yardwork", desc: "Hire a Tasker for yardwork & landscaping", subs: ["Gardening Services", "Weed Removal", "Lawn Care Services", "Lawn Mowing Services", "Landscaping Services", "Gutter Cleaning", "Tree Trimming Service", "Vacation Plant Watering", "Patio Cleaning", "Hot Tub Cleaning", "Fence Installation & Repair Services", "Deck Restoration Services", "Patio Furniture Assembly", "Fence Staining", "Mulching Services", "Lawn Fertilizer Service", "Hedge Trimming Service", "Outdoor Party Setup", "Urban Gardening Service", "Leaf Raking & Removal", "Produce Gardening", "Hose Installation", "Shed Maintenance", "Pressure Washing"] },
                { img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=70", title: "Shopping & Delivery", desc: "Get anything from groceries to furniture", subs: ["Delivery Service", "Grocery Shopping & Delivery", "Running Your Errands", "Christmas Tree Delivery", "Wait in Line", "Deliver Big Piece of Furniture", "Drop Off Donations", "Contactless Delivery", "Pet Food Delivery", "Baby Food Delivery", "Return Items", "Wait for Delivery", "Shipping", "Breakfast Delivery", "Coffee Delivery"] },
                { img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=70", title: "Painting", desc: "Interior, exterior & specialist finishes", subs: ["Interior Painting", "Exterior Painting", "Wallpapering", "Accent Wall", "Wood Staining"] },
                { img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=70", title: "Virtual & Online Tasks", desc: "Virtual assistance, organization, research & more", subs: ["Virtual Assistant", "Organization", "Data Entry", "Computer Help"] },
                { img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=70", title: "Office Services", desc: "Hire a Tasker to help around the office!", subs: ["Office Cleaning", "Office Tech Setup", "Office Movers", "Office Supply & Snack Delivery", "Office Furniture Assembly", "Office Setup & Organization", "Office Administration", "Office Interior Design", "Moving Office Furniture", "Office Mounting Service"] },
                { img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=70", title: "Baby Prep", desc: "Set up the nursery, childproof your home & more", subs: ["Baby Proofing", "Baby Food Delivery", "Organize a Room", "Painting", "Toy Assembly Service", "Smart Home Installation", "Shopping", "General Cleaning"] },
                { img: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=600&q=70", title: "Holidays", desc: "Holiday help — decorating, gifting & more", subs: ["Gift Wrapping Services", "Hang Christmas Lights", "Christmas Tree Delivery", "Holiday Decorating", "Party Cleaning", "Toy Assembly Service", "Wait in Line", "Christmas Tree Removal"] },
                { img: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=600&q=70", title: "Winter Tasks", desc: "Get help with winter tasks", subs: ["Snow Removal", "Sidewalk Salting", "Window Winterization", "Residential Snow Removal", "Christmas Tree Removal", "AC Winterization", "Winter Yardwork", "Pipe Insulation", "Storm Door Installation", "Winter Deck Maintenance", "Water Heater Maintenance", "Wait in Line"] },
                { img: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=600&q=70", title: "Personal Assistant", desc: "Hire a Tasker to be your personal assistant!", subs: ["Personal Assistant", "Running Your Errands", "Wait in Line", "Organization", "Organize Home", "Closet Organization Service", "Interior Design Service", "Virtual Assistant"] },
                { img: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=70", title: "Contactless Tasks", desc: "No-contact delivery, shopping & errands", subs: ["Contactless Delivery", "Contactless Prescription Pick-up & Delivery", "Running Your Errands", "Grocery Shopping & Delivery", "Disinfecting Services", "Drop Off Donations", "Yard Work Services", "Virtual Assistant"] },
              ].map(({ img, title, desc, subs }) => {
                const serviceDetail = SERVICE_DETAILS[title];
                const localizedTitle = lang === "tr" ? serviceDetail?.titleTr ?? title : title;
                const localizedDesc = lang === "tr" ? serviceDetail?.taglineTr ?? desc : serviceDetail?.tagline ?? desc;
                const localizedSubs = subs.map((s) => ({
                  page: s,
                  label: lang === "tr" ? SERVICE_DETAILS[s]?.titleTr ?? s : s,
                }));

                return (
                  <div
                    className="service-category-card"
                    key={title}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActivePage(title)}
                    onKeyDown={(e) => e.key === "Enter" && setActivePage(title)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="service-card-img-wrap">
                      <img src={img} alt={localizedTitle} className="service-card-img" loading="lazy" />
                    </div>
                    <div className="service-card-info">
                      <h3 className="service-card-title">{localizedTitle}</h3>
                      <p className="service-card-desc">{localizedDesc}</p>
                      <hr className="service-card-divider" />
                      <ul className="service-card-subs">
                        {localizedSubs.map((item) => (
                          <li key={`${title}-${item.page}`}>
                            <a className="service-sub-link" onClick={(e) => { e.stopPropagation(); setActivePage(item.page); }}>{item.label}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <footer className="footer-main">
          <div className="footer-inner">
            <div className="footer-brand">
              <img src="/logo.png" alt="UstaYolda" height={38} />
              <p>{t("footer_tagline", lang)}</p>
            </div>
            <div className="footer-col">
              <h4>{t("footer_discover", lang)}</h4>
              <button onClick={() => setActivePage("__become-worker")}>{t("nav_become_worker", lang)}</button>
              <button onClick={() => setActivePage("__services")}>{t("footer_all_svc", lang)}</button>
              <button onClick={() => setActivePage("__services")}>{t("footer_nearby", lang)}</button>
              <button onClick={() => setActivePage("__help")}>{t("footer_help", lang)}</button>
            </div>
            <div className="footer-col">
              <h4>{t("footer_company", lang)}</h4>
              <button onClick={() => setActivePage("__about")}>{t("footer_about", lang)}</button>
              <button onClick={() => setActivePage("__careers")}>{t("footer_careers", lang)}</button>
              <button onClick={() => setActivePage("__blog")}>{t("footer_blog", lang)}</button>
              <button onClick={() => setActivePage("__terms")}>{t("footer_terms", lang)}</button>
            </div>
            <div className="footer-col">
              <h4>{t("footer_download", lang)}</h4>
              <p>{t("footer_dl_sub", lang)}</p>
              <div className="footer-app-badges">
                <div className="app-badge">📱 App Store</div>
                <div className="app-badge">🤖 Google Play</div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} UstaYolda.com — {t("footer_rights", lang)}</p>
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
            onSuccess={handleAuthSuccess}
            defaultSignInRole={authRole}
          />
        )}
      </div>
    );
  }

  if (activePage === "__workers") {
    return (
      <div className="root">
        <nav className="navbar">
          <div className="navbar-inner">
            <button className="nav-logo-btn" onClick={() => setActivePage(null)} aria-label="Go to homepage">
              <img src="/logo.png" alt="UstaYolda" height={72} />
            </button>
            <div className="nav-links">
              <button className="nav-link nav-link-btn" onClick={() => setActivePage("__services")}>{t("nav_services", lang)}</button>
              <button className="nav-link nav-link-btn" style={{ color: "var(--primary)", fontWeight: 700 }}>{t("nav_workers", lang)}</button>
            </div>
            <div className="nav-auth">
              <LangToggle />
              {currentUser ? (
                <div className="nav-user" ref={userMenuRef} style={{ position: "relative" }}>
                  <button className="nav-user-btn" onClick={() => setShowUserMenu((v) => !v)}>
                    <span className="nav-user-avatar">
                      {currentUser.avatarUrl ? (
                        <img
                          src={currentUser.avatarUrl}
                          alt={currentUser.fullName}
                          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                        />
                      ) : (
                        currentUser.fullName.charAt(0).toUpperCase()
                      )}
                    </span>
                    <span className="nav-user-name">{currentUser.fullName}</span>
                    <span className="nav-caret">▾</span>
                  </button>
                  {showUserMenu && (
                    <div className="user-dropdown">
                      <button onClick={() => { setActivePage("__profile"); setShowUserMenu(false); }}>{t("nav_profile", lang)}</button>
                      <button onClick={() => { setActivePage("__my-bookings"); setShowUserMenu(false); }}>{t("nav_bookings", lang)}</button>
                      {currentUser.role === "worker" && (
                        <button onClick={() => { setActivePage("__worker-dashboard"); setShowUserMenu(false); }}>{t("nav_dashboard", lang)}</button>
                      )}
                      <hr className="dropdown-divider" />
                      <button className="dropdown-signout" onClick={() => { setCurrentUser(null); setShowUserMenu(false); }}>{t("nav_signout", lang)}</button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button className="btn-ghost" onClick={() => openAuth("customer")}>{t("nav_login_customer", lang)}</button>
                  <button className="btn-ghost" onClick={() => openAuth("worker")}>{t("nav_login_worker", lang)}</button>
                </>
              )}
              <button className="btn-primary" onClick={() => setActivePage("__become-worker")}>{t("nav_become_worker", lang)}</button>
            </div>
          </div>
        </nav>

        <section className="workers-page-hero">
          <div className="workers-page-inner">
            <button className="static-back-btn" onClick={() => setActivePage(null)}>{t("back_home", lang)}</button>
            <h1 className="workers-page-title">{t("wrk_title", lang)}</h1>
            <p className="workers-page-subtitle">{t("wrk_subtitle", lang)}</p>
            <div className="category-tabs" style={{ justifyContent: "center", marginTop: "1.5rem" }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={"cat-tab" + (activeCat === cat.id ? " cat-tab--active" : "")}
                  onClick={() => setActiveCat(cat.id)}
                >
                  <span className="cat-tab-icon"><cat.Icon /></span>
                  <span className="cat-tab-label">{CAT_LABEL[cat.id]?.[lang] ?? cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="workers-section" style={{ padding: "2.5rem 1.5rem 4rem" }}>
          {workers.length === 0 ? (
            <p className="empty-state">{t("wrk_empty", lang)}</p>
          ) : (
            <div className="worker-grid">
              {workers.map((worker) => (
                <article className="worker-card" key={worker.id}>
                  <div className="worker-card-top">
                    <div className="worker-avatar">
                      {worker.avatarUrl ? (
                        <img
                          src={worker.avatarUrl}
                          alt={worker.fullName}
                          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                        />
                      ) : (
                        worker.fullName.charAt(0)
                      )}
                    </div>
                    <div className="worker-meta">
                      <div className="worker-name-row">
                        <span className="worker-name">{worker.fullName}</span>
                        {worker.verified && (
                          <span className="verified-badge"><VerifiedIcon /> {t("verified_badge", lang)}</span>
                        )}
                      </div>
                      <div className="worker-rating">
                        <span className="star-icon"><StarIcon /></span>
                        <strong>{worker.rating}</strong>
                        <span className="review-count">({worker.reviewCount} {t("reviews_unit", lang)})</span>
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
                      <span className="price-unit"> {t("hour", lang)}</span>
                    </div>
                    <button
                      className="btn-primary btn-book"
                      onClick={() => handleBook(worker)}
                    >
                      {t("book_now", lang)}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="footer-main">
          <div className="footer-inner">
            <div className="footer-brand">
              <img src="/logo.png" alt="UstaYolda" height={38} />
              <p>{t("footer_tagline", lang)}</p>
            </div>
            <div className="footer-col">
              <h4>{t("footer_discover", lang)}</h4>
              <button onClick={() => setActivePage("__become-worker")}>{t("nav_become_worker", lang)}</button>
              <button onClick={() => setActivePage("__services")}>{t("footer_all_svc", lang)}</button>
              <button onClick={() => setActivePage("__services")}>{t("footer_nearby", lang)}</button>
              <button onClick={() => setActivePage("__help")}>{t("footer_help", lang)}</button>
            </div>
            <div className="footer-col">
              <h4>{t("footer_company", lang)}</h4>
              <button onClick={() => setActivePage("__about")}>{t("footer_about", lang)}</button>
              <button onClick={() => setActivePage("__careers")}>{t("footer_careers", lang)}</button>
              <button onClick={() => setActivePage("__blog")}>{t("footer_blog", lang)}</button>
              <button onClick={() => setActivePage("__terms")}>{t("footer_terms", lang)}</button>
            </div>
            <div className="footer-col">
              <h4>{t("footer_download", lang)}</h4>
              <p>{t("footer_dl_sub", lang)}</p>
              <div className="footer-app-badges">
                <div className="app-badge">📱 App Store</div>
                <div className="app-badge">🤖 Google Play</div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} UstaYolda.com — {t("footer_rights", lang)}</p>
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
            onSuccess={handleAuthSuccess}
            defaultSignInRole={authRole}
          />
        )}
      </div>
    );
  }

  if (activePage) {
    return (
      <ServiceDetailPage
        serviceId={activePage}
        customerId={customerId}
        onBackHome={() => setActivePage(null)}
        onBackServices={() => setActivePage("__services")}
        onOpenWorkers={() => setActivePage("__workers")}
        onOpenBecomeWorker={() => setActivePage("__become-worker")}
      />
    );
  }

  return (
    <div className="root">

      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="navbar-inner">
          <a href="/" className="nav-logo">
            <img src="/logo.png" alt="UstaYolda" height={72} />
          </a>
          <div className="nav-links">
            <button className="nav-link nav-link-btn" onClick={() => setActivePage("__services")}>{t("nav_services", lang)}</button>
            <button className="nav-link nav-link-btn" onClick={() => setActivePage("__workers")}>{t("nav_workers", lang)}</button>
          </div>
          <div className="nav-auth">
              <LangToggle />
            {currentUser ? (
              <div className="nav-user" ref={userMenuRef} style={{ position: "relative" }}>
                <button
                  className="nav-user-btn"
                  onClick={() => setShowUserMenu((v) => !v)}
                >
                  <span className="nav-user-avatar">
                    {currentUser.avatarUrl ? (
                      <img
                        src={currentUser.avatarUrl}
                        alt={currentUser.fullName}
                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                      />
                    ) : (
                      currentUser.fullName.charAt(0).toUpperCase()
                    )}
                  </span>
                  <span className="nav-user-name">{currentUser.fullName}</span>
                  <span className="nav-caret">▾</span>
                </button>
                {showUserMenu && (
                  <div className="user-dropdown">
                    <button onClick={() => { setActivePage("__profile"); setShowUserMenu(false); }}>{t("nav_profile", lang)}</button>
                    <button onClick={() => { setActivePage("__my-bookings"); setShowUserMenu(false); }}>{t("nav_bookings", lang)}</button>
                    {currentUser.role === "worker" && (
                      <button onClick={() => { setActivePage("__worker-dashboard"); setShowUserMenu(false); }}>{t("nav_dashboard", lang)}</button>
                    )}
                    <hr className="dropdown-divider" />
                    <button className="dropdown-signout" onClick={() => { setCurrentUser(null); setShowUserMenu(false); }}>{t("nav_signout", lang)}</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button className="btn-ghost" onClick={() => openAuth("customer")}>{t("nav_login_customer", lang)}</button>
                <button className="btn-ghost" onClick={() => openAuth("worker")}>{t("nav_login_worker", lang)}</button>
              </>
            )}
            <button className="btn-primary" onClick={() => setActivePage("__become-worker")}>{t("nav_become_worker", lang)}</button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero" id="services">
        <h1 className="hero-title">{t("hero_title_1", lang)}<br />{t("hero_title_2", lang)}</h1>
        <div className="search-bar" style={{ position: "relative" }}>
          <input
            className="search-input"
            type="text"
            placeholder={t("hero_placeholder", lang)}
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && suggestions.length > 0) {
                setActivePage(suggestions[0].page);
                setSearchQuery("");
                setShowSuggestions(false);
              }
            }}
          />
          <button
            className="search-btn"
            aria-label={t("search", lang)}
            onClick={() => {
              if (suggestions.length > 0) {
                setActivePage(suggestions[0].page);
                setSearchQuery("");
                setShowSuggestions(false);
              } else if (searchQuery.trim()) {
                setActivePage("__services");
              }
            }}
          ><SearchIcon /></button>
          {showSuggestions && suggestions.length > 0 && (
            <ul className="search-suggestions">
              {suggestions.map((s) => (
                <li
                  key={s.label}
                  className="search-suggestion-item"
                  onMouseDown={() => {
                    setActivePage(s.page);
                    setSearchQuery("");
                    setShowSuggestions(false);
                  }}
                >
                  <span className="suggestion-label">{lang === "tr" ? s.labelTr : s.label}</span>
                  <span className="suggestion-page">{lang === "tr" ? s.labelTr : s.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="category-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={"cat-tab" + (activeCat === cat.id ? " cat-tab--active" : "")}
              onClick={() => setActiveCat(cat.id)}
            >
              <span className="cat-tab-icon"><cat.Icon /></span>
              <span className="cat-tab-label">{CAT_LABEL[cat.id]?.[lang] ?? cat.label}</span>
            </button>
          ))}
        </div>
        <div className="sub-pills">
          {category.subs.map((sub) => (
            <button
              key={sub}
              className={"sub-pill" + (activeSub === sub ? " sub-pill--active" : "")}
              onClick={() => {
                setActiveSub(activeSub === sub ? null : sub);
                const targetPage = SUB_PILL_PAGE_MAP[sub] ?? sub;
                if (SERVICE_DETAILS[targetPage]) {
                  setActivePage(targetPage);
                }
              }}
            >
              {lang === "tr" ? (SERVICE_DETAILS[sub]?.titleTr ?? sub) : sub}
            </button>
          ))}
        </div>
      </section>

      {/* ── Spotlight Card ── */}
      <section className="spotlight-section">
        <div className="spotlight-card" style={{ background: category.accent }}>
          <div className="spotlight-text">
            <h2 className="spotlight-title">{lang === "tr" ? category.headlineTr : category.headline}</h2>
            <ul className="spotlight-bullets">
              {(lang === "tr" ? category.bulletsTr : category.bullets).map((b) => (
                <li key={b}><span className="bullet-check">&#10003;</span>{b}</li>
              ))}
            </ul>
            <p className="spotlight-trending">
              <strong>{t("now_trending", lang)}</strong> {lang === "tr" ? category.trendingTr : category.trending}
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
            { labelEn: "Tasks completed", labelTr: "Tamamlanan iş", value: "48.000+" },
            { labelEn: "Moving tasks", labelTr: "Tamamlanan nakliyat", value: "9.200+" },
            { labelEn: "Items mounted", labelTr: "Monte edilen ürün", value: "12.000+" },
            { labelEn: "Home repairs", labelTr: "Ev onarımı", value: "8.500+" },
            { labelEn: "Homes cleaned", labelTr: "Temizlenen konut", value: "15.000+" },
          ].map((s) => (
            <div className="tr-stat" key={s.labelEn}>
              <span className="tr-stat-label">{lang === "tr" ? s.labelTr : s.labelEn}:</span>
              <strong className="tr-stat-value">{s.value}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* ── Popular Projects ── */}
      <section className="popular-projects" id="services-page">
        <div className="pp-inner">
          <h2 className="pp-heading">{t("pp_heading", lang)}</h2>
          <div className="pp-grid">
            {POPULAR_PROJECTS.map((p) => (
              <div className="pp-card" key={p.title} onClick={() => setActivePage(p.page)}>
                <div className="pp-img" style={{ background: p.color }}>
                  <span className="pp-emoji">{p.emoji}</span>
                </div>
                <div className="pp-info">
                  <strong className="pp-title">{lang === "tr" ? p.titleTr : p.title}</strong>
                  <span className="pp-price">{t("from_short", lang)} ₺{p.startPrice}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Customer Reviews ── */}
      <section className="reviews-section">
        <div className="reviews-inner">
          <h2 className="reviews-heading">{t("reviews_heading", lang)}</h2>
          <div className="reviews-grid">
            {REVIEWS.map((r) => (
              <div className="review-card" key={r.name}>
                <div className="review-top">
                  <strong className="reviewer-name">{r.name}</strong>
                  <div className="review-stars">{"★".repeat(r.stars)}</div>
                </div>
                <p className="review-text">{lang === "tr" ? r.textTr : r.text}</p>
                <span className="review-service-link" onClick={() => setActivePage(r.page)}>
                  {lang === "tr" ? r.serviceTr : r.service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Satisfaction Guarantee ── */}
      <section className="guarantee-section">
        <div className="guarantee-inner">
          <h2 className="guarantee-heading">{t("guarantee_h1", lang)} <span className="guarantee-highlight">{t("guarantee_h2", lang)}</span></h2>
          <div className="guarantee-grid">
            <div className="guarantee-item">
              <div className="guarantee-icon">🛡️</div>
              <h3>{t("guarantee_pledge_t", lang)}</h3>
              <p>{t("guarantee_pledge_b", lang)}</p>
            </div>
            <div className="guarantee-item">
              <div className="guarantee-icon">✅</div>
              <h3>{t("guarantee_vetted_t", lang)}</h3>
              <p>{t("guarantee_vetted_b", lang)}</p>
            </div>
            <div className="guarantee-item">
              <div className="guarantee-icon">💬</div>
              <h3>{t("guarantee_support_t", lang)}</h3>
              <p>{t("guarantee_support_b", lang)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="how-it-works">
        <div className="hiw-inner">
          <div className="hiw-content">
            <h2 className="hiw-heading">{t("hiw_heading", lang)}</h2>
            {[
              { n: 1, textEn: "Choose a Worker by price, skills, and reviews.", textTr: "Fiyat, beceri ve yorumlara göre usta seçin." },
              { n: 2, textEn: "Schedule a Worker as early as today.", textTr: "Bugün bile randevu alabilirsiniz." },
              { n: 3, textEn: "Chat, pay, tip, and review all in one place.", textTr: "Tek platformda mesajlaşın, ödeme yapın, yorum bırakın." },
            ].map((s) => (
              <div className="hiw-step" key={s.n}>
                <span className="hiw-step-num">{s.n}</span>
                <p>{lang === "tr" ? s.textTr : s.textEn}</p>
              </div>
            ))}
            <button className="btn-primary" style={{ marginTop: "1.5rem" }} onClick={() => setActivePage("__become-worker")}>
              {t("hiw_cta", lang)}
            </button>
          </div>
          <div className="hiw-visual">
            <div className="hiw-card">
              <div className="hiw-card-row">
                <span className="hiw-card-icon">🔧</span>
                <span>{CAT_LABEL.other[lang]}</span>
                <span className="hiw-card-price">{t("from_short", lang)} ₺199</span>
              </div>
              <div className="hiw-card-row">
                <span className="hiw-card-icon">🧹</span>
                <span>{CAT_LABEL.cleaning[lang]}</span>
                <span className="hiw-card-price">{t("from_short", lang)} ₺199</span>
              </div>
              <div className="hiw-card-row">
                <span className="hiw-card-icon">🚚</span>
                <span>{CAT_LABEL.moving[lang]}</span>
                <span className="hiw-card-price">{t("from_short", lang)} ₺279</span>
              </div>
              <div className="hiw-card-row hiw-card-row--btn">
                <button className="btn-primary" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    {t("book_now", lang)}
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
            {activeSub
              ? lang === "tr"
                ? `“${activeSub}” için ustalar`
                : `${t("workers_for", lang)} "${activeSub}"`
              : `${t("workers_top", lang)} ${CAT_LABEL[category.id]?.[lang] ?? category.label} ${t("workers_label", lang)}`}
          </h2>
          {statusLog.length > 0 && (
            <div className="status-log">
              {statusLog.map((item, i) => (
                <span key={i} className="status-pill">{t(item.key as Parameters<typeof t>[0], lang)} {item.id}</span>
              ))}
            </div>
          )}
        </div>
        {filteredWorkers.length === 0 ? (
          <p className="empty-state">{t("no_workers", lang)}</p>
        ) : (
          <div className="worker-grid">
            {filteredWorkers.map((worker) => (
              <article className="worker-card" key={worker.id}>
                <div className="worker-card-top">
                  <div className="worker-avatar">
                    {worker.avatarUrl ? (
                      <img
                        src={worker.avatarUrl}
                        alt={worker.fullName}
                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                      />
                    ) : (
                      worker.fullName.charAt(0)
                    )}
                  </div>
                  <div className="worker-meta">
                    <div className="worker-name-row">
                      <span className="worker-name">{worker.fullName}</span>
                      {worker.verified && (
                        <span className="verified-badge"><VerifiedIcon /> {t("verified_badge", lang)}</span>
                      )}
                    </div>
                    <div className="worker-rating">
                      <span className="star-icon"><StarIcon /></span>
                      <strong>{worker.rating}</strong>
                      <span className="review-count">({worker.reviewCount} {t("reviews_unit", lang)})</span>
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
                    <span className="price-unit"> {t("hour", lang)}</span>
                  </div>
                  <button
                    className="btn-primary btn-book"
                    onClick={() => handleBook(worker)}
                  >
                    {t("book_now", lang)}
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
          <h2 className="ght-heading">{t("ght_heading", lang)}</h2>
          <div className="ght-pills">
            {SERVICE_QUICK_LINKS.map((s) => (
              <button key={s.label} className="ght-pill" onClick={() => setActivePage(s.page)}>
                {lang === "tr" ? (SERVICE_DETAILS[s.page]?.titleTr ?? SERVICE_DETAILS[s.label]?.titleTr ?? s.label) : s.label}
              </button>
            ))}
          </div>
          <button className="ght-see-all" onClick={() => setActivePage("__services")}>
            {t("ght_see_all", lang)}
          </button>
        </div>
      </section>

      {/* ── Become a Worker ── */}
      <section className="become-worker-section" id="become-worker">
        <div className="become-worker-inner">
          <div className="become-worker-text">
            <h2 className="become-worker-title">{t("bw_title", lang)}</h2>
            <p className="become-worker-subtitle">{t("bw_subtitle", lang)}</p>
            <div className="become-worker-points">
              <div className="bw-point"><span className="bw-point-icon">💰</span><div><strong>{t("bw_p1_t", lang)}</strong><p>{t("bw_p1_b", lang)}</p></div></div>
              <div className="bw-point"><span className="bw-point-icon">📅</span><div><strong>{t("bw_p2_t", lang)}</strong><p>{t("bw_p2_b", lang)}</p></div></div>
              <div className="bw-point"><span className="bw-point-icon">📍</span><div><strong>{t("bw_p3_t", lang)}</strong><p>{t("bw_p3_b", lang)}</p></div></div>
              <div className="bw-point"><span className="bw-point-icon">⭐</span><div><strong>{t("bw_p4_t", lang)}</strong><p>{t("bw_p4_b", lang)}</p></div></div>
            </div>
            <button className="btn-primary btn-become-worker" onClick={() => setActivePage("__become-worker")}>{t("bw_cta", lang)}</button>
          </div>
          <div className="become-worker-visual">
            <div className="become-worker-card">
              <div className="bw-card-header">{t("bw_top_earners", lang)}</div>
              {[
                { name: "Aryan K.", cat: "Electrical", catTr: "Elektrik",  earn: "₺3,200", rating: "4.9" },
                { name: "Leila M.", cat: "Cleaning",   catTr: "Temizlik",  earn: "₺2,800", rating: "5.0" },
                { name: "Deniz Y.", cat: "Moving",     catTr: "Nakliyat",  earn: "₺2,450", rating: "4.8" },
              ].map((w) => (
                <div className="bw-earner-row" key={w.name}>
                  <div className="bw-earner-avatar">{w.name.charAt(0)}</div>
                  <div className="bw-earner-info">
                    <span className="bw-earner-name">{w.name}</span>
                    <span className="bw-earner-cat">{lang === "tr" ? w.catTr : w.cat}</span>
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
            <img src="/logo.png" alt="UstaYolda" height={38} />
            <p>{t("footer_tagline", lang)}</p>
          </div>
          <div className="footer-col">
            <h4>{t("footer_discover", lang)}</h4>
            <button onClick={() => setActivePage("__become-worker")}>{t("nav_become_worker", lang)}</button>
            <button onClick={() => setActivePage("__services")}>{t("footer_all_svc", lang)}</button>
            <button onClick={() => setActivePage("__services")}>{t("footer_nearby", lang)}</button>
            <button onClick={() => setActivePage("__help")}>{t("footer_help", lang)}</button>
          </div>
          <div className="footer-col">
            <h4>{t("footer_company", lang)}</h4>
            <button onClick={() => setActivePage("__about")}>{t("footer_about", lang)}</button>
            <button onClick={() => setActivePage("__careers")}>{t("footer_careers", lang)}</button>
            <button onClick={() => setActivePage("__blog")}>{t("footer_blog", lang)}</button>
            <button onClick={() => setActivePage("__terms")}>{t("footer_terms", lang)}</button>
          </div>
          <div className="footer-col">
            <h4>{t("footer_download", lang)}</h4>
            <p>{t("footer_dl_sub", lang)}</p>
            <div className="footer-app-badges">
              <div className="app-badge">📱 App Store</div>
              <div className="app-badge">🤖 Google Play</div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} UstaYolda.com — {t("footer_rights", lang)}</p>
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
          onSuccess={handleAuthSuccess}
          defaultSignInRole={authRole}
        />
      )}

      {bookingStep === "describe" && bookingFlow && (
        <TaskDescriptionModal
          serviceName={bookingFlow.serviceTitle}
          onConfirm={(taskDescription) => {
            setBookingFlow((prev) => (prev ? { ...prev, taskDescription } : prev));
            setBookingStep("datetime");
          }}
          onCancel={resetBookingFlow}
        />
      )}

      {bookingStep === "datetime" && bookingFlow?.taskDescription && (
        <DateTimePickerModal
          onConfirm={(selectedDate, selectedTime) => {
            setBookingFlow((prev) => (
              prev ? { ...prev, selectedDate, selectedTime } : prev
            ));
            setBookingStep("confirm");
          }}
          onCancel={() => setBookingStep("describe")}
        />
      )}

      {bookingStep === "confirm" && bookingFlow?.taskDescription && bookingFlow.selectedDate && bookingFlow.selectedTime && (
        <CheckoutModal
          customerId={customerId}
          worker={bookingFlow.worker}
          serviceTitle={bookingFlow.serviceTitle}
          catId={bookingFlow.catId}
          taskDescription={bookingFlow.taskDescription}
          selectedDate={bookingFlow.selectedDate}
          selectedTime={bookingFlow.selectedTime}
          onClose={resetBookingFlow}
          onSuccess={(booking) => {
            setStatusLog((prev) => [{ key: "status_booked", id: booking.id }, ...prev].slice(0, 5));
            resetBookingFlow();
          }}
        />
      )}
    </div>
  );
}
