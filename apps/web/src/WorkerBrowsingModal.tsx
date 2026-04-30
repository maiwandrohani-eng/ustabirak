import { useState } from "react";
import type { WorkerProfile } from "@ustaya/shared";
import { useLang } from "./LangContext";
import { t, type TKey } from "./translations";

interface Props {
  workers: WorkerProfile[];
  onSelectWorker: (worker: WorkerProfile) => void;
  onBack: () => void;
}

type SortOption = "recommended" | "price-low" | "price-high" | "rating";

export default function WorkerBrowsingModal({ workers, onSelectWorker, onBack }: Props) {
  const { lang } = useLang();
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [priceFilter, setPriceFilter] = useState<[number, number]>([0, 150]);
  const sortOptions: ReadonlyArray<{ value: SortOption; key: TKey }> = [
    { value: "recommended", key: "wb_recommended" },
    { value: "price-low", key: "wb_price_low" },
    { value: "price-high", key: "wb_price_high" },
    { value: "rating", key: "wb_rating_high" },
  ];

  const sorted = [...workers].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.hourlyPrice - b.hourlyPrice;
      case "price-high":
        return b.hourlyPrice - a.hourlyPrice;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      default: // recommended
        return (b.rating || 0) - (a.rating || 0);
    }
  });

  const filtered = sorted.filter((w) => w.hourlyPrice >= priceFilter[0] && w.hourlyPrice <= priceFilter[1]);

  const StarIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );

  return (
    <div className="wb-overlay" onClick={(e) => e.target === e.currentTarget && onBack()}>
      <div className="wb-modal">
        <div className="wb-header">
          <button className="wb-back-btn" onClick={onBack}>← {t("wb_back", lang)}</button>
          <h2 className="wb-title">
            {t("wb_title", lang)}
          </h2>
          <p className="wb-subtitle">
            {filtered.length} {t("wb_found", lang)}
          </p>
        </div>

        <div className="wb-content">
          {/* Sidebar */}
          <div className="wb-sidebar">
            <div className="wb-filter-section">
              <h3 className="wb-filter-title">
                {t("wb_sort", lang)}
              </h3>
              <div className="wb-sort-options">
                {sortOptions.map((opt) => (
                  <label key={opt.value} className="wb-sort-option">
                    <input
                      type="radio"
                      name="sort"
                      value={opt.value}
                      checked={sortBy === opt.value}
                      onChange={() => setSortBy(opt.value as SortOption)}
                    />
                    <span>{t(opt.key, lang)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="wb-filter-section">
              <h3 className="wb-filter-title">
                {t("wb_price", lang)}
              </h3>
              <div className="wb-price-range">
                <input
                  type="range"
                  min="0"
                  max="150"
                  value={priceFilter[0]}
                  onChange={(e) => setPriceFilter([parseInt(e.target.value), priceFilter[1]])}
                  className="wb-slider"
                />
                <input
                  type="range"
                  min="0"
                  max="150"
                  value={priceFilter[1]}
                  onChange={(e) => setPriceFilter([priceFilter[0], parseInt(e.target.value)])}
                  className="wb-slider"
                />
              </div>
              <div className="wb-price-display">
                <span>₺{priceFilter[0]}</span>
                <span>-</span>
                <span>₺{priceFilter[1]}+</span>
              </div>
            </div>
          </div>

          {/* Worker List */}
          <div className="wb-workers">
            {filtered.length === 0 ? (
              <div className="wb-empty">
                <p>{t("wb_no_workers", lang)}</p>
              </div>
            ) : (
              filtered.map((worker) => (
                <div key={worker.id} className="wb-worker-card">
                  <div className="wb-worker-header">
                    <div className="wb-worker-avatar">
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
                    <div className="wb-worker-info">
                      <h3 className="wb-worker-name">{worker.fullName}</h3>
                      <div className="wb-worker-meta">
                        {worker.rating && (
                          <span className="wb-rating">
                            <StarIcon /> {worker.rating} ({worker.reviewCount || 0})
                          </span>
                        )}
                        <span className="wb-tasks">{worker.categories.length} {t("wb_categories", lang)}</span>
                      </div>
                    </div>
                    <div className="wb-worker-price">
                      <span className="wb-price-amount">₺{worker.hourlyPrice}</span>
                      <span className="wb-price-unit">{t("co_per_hr", lang)}</span>
                    </div>
                  </div>

                  <div className="wb-worker-desc">
                    <p className="wb-worker-bio">{worker.bio || t("wb_professional", lang)}</p>
                  </div>

                  <div className="wb-worker-footer">
                    <button className="wb-view-profile-btn">
                      {t("wb_view_profile", lang)}
                    </button>
                    <button className="wb-select-btn" onClick={() => onSelectWorker(worker)}>
                      {t("wb_select", lang)}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        .wb-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .wb-modal {
          background: white;
          border-radius: 12px;
          max-width: 1000px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .wb-header {
          padding: 2rem;
          border-bottom: 1px solid #eee;
          position: relative;
        }

        .wb-back-btn {
          background: none;
          border: none;
          color: #16a34a;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 1rem;
        }

        .wb-back-btn:hover {
          color: #15803d;
        }

        .wb-title {
          margin: 0;
          font-size: 1.75rem;
          font-weight: 600;
          color: #222;
        }

        .wb-subtitle {
          margin: 0.5rem 0 0;
          color: #666;
          font-size: 0.95rem;
        }

        .wb-content {
          flex: 1;
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 0;
        }

        @media (max-width: 800px) {
          .wb-content {
            grid-template-columns: 1fr;
          }
        }

        .wb-sidebar {
          background: #fafafa;
          border-right: 1px solid #eee;
          padding: 1.5rem;
          max-height: 60vh;
          overflow-y: auto;
        }

        .wb-filter-section {
          margin-bottom: 2rem;
        }

        .wb-filter-title {
          margin: 0 0 1rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: #222;
        }

        .wb-sort-options {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .wb-sort-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 4px;
          transition: background-color 0.2s;
        }

        .wb-sort-option:hover {
          background-color: #f0f0f0;
        }

        .wb-sort-option input {
          margin: 0;
          cursor: pointer;
          accent-color: #16a34a;
        }

        .wb-sort-option span {
          font-size: 0.9rem;
          color: #444;
        }

        .wb-price-range {
          position: relative;
          height: 40px;
          margin-bottom: 1rem;
        }

        .wb-slider {
          position: absolute;
          width: 100%;
          height: 4px;
          background: none;
          border: none;
          -webkit-appearance: none;
          appearance: none;
          cursor: pointer;
          top: 18px;
          pointer-events: none;
        }

        .wb-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: #16a34a;
          border-radius: 50%;
          cursor: pointer;
          pointer-events: auto;
        }

        .wb-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #16a34a;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          pointer-events: auto;
        }

        .wb-price-display {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          font-weight: 600;
          color: #222;
        }

        .wb-workers {
          padding: 1.5rem;
          overflow-y: auto;
          max-height: 60vh;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .wb-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #999;
          text-align: center;
        }

        .wb-worker-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1rem;
          transition: all 0.2s;
        }

        .wb-worker-card:hover {
          border-color: #16a34a;
          box-shadow: 0 4px 12px rgba(22, 163, 74, 0.1);
        }

        .wb-worker-header {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 1rem;
          align-items: center;
          margin-bottom: 1rem;
        }

        .wb-worker-avatar {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .wb-worker-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .wb-worker-name {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: #222;
        }

        .wb-worker-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.85rem;
          color: #666;
        }

        .wb-rating {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .wb-tasks {
          display: none;
        }

        .wb-worker-price {
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.1rem;
        }

        .wb-price-amount {
          font-size: 1.1rem;
          font-weight: 700;
          color: #222;
        }

        .wb-price-unit {
          font-size: 0.8rem;
          color: #999;
        }

        .wb-worker-desc {
          margin-bottom: 1rem;
        }

        .wb-worker-bio {
          margin: 0;
          font-size: 0.9rem;
          color: #555;
          line-height: 1.4;
        }

        .wb-worker-footer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .wb-view-profile-btn,
        .wb-select-btn {
          padding: 0.6rem 1rem;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          font-size: 0.9rem;
        }

        .wb-view-profile-btn {
          background: white;
          border: 1px solid #ddd;
          color: #666;
        }

        .wb-view-profile-btn:hover {
          background: #f5f5f5;
          border-color: #999;
        }

        .wb-select-btn {
          background: #16a34a;
          color: white;
        }

        .wb-select-btn:hover {
          background: #15803d;
        }
      `}</style>
    </div>
  );
}
