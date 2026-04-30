import { useState } from "react";
import { useLang } from "./LangContext";
import { t, type TKey } from "./translations";
import { TURKEY_CITIES, TURKEY_DISTRICTS, TURKEY_MAHALLELER } from "./turkeyData";

export interface TaskDescription {
  location: string;
  unitApt: string;
  taskSize: "small" | "medium" | "large" | null;
  vehicleRequired: "none" | "car" | "truck" | null;
  details: string;
}

interface Props {
  serviceName: string;
  onConfirm: (task: TaskDescription) => void;
  onCancel: () => void;
}

export default function TaskDescriptionModal({ serviceName, onConfirm, onCancel }: Props) {
  const { lang } = useLang();
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [unitApt, setUnitApt] = useState("");
  const [taskSize, setTaskSize] = useState<"small" | "medium" | "large" | null>(null);
  const [vehicleRequired, setVehicleRequired] = useState<"none" | "car" | "truck" | null>(null);
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");
  
  const handleLocationChange = (value: string) => {
    setLocation(value);
    
    if (value.trim().length > 0) {
      const query = value.toLowerCase();
      const locationSuggestions: string[] = [];
      
      // Search in cities
      TURKEY_CITIES.forEach((city) => {
        if (city.toLowerCase().includes(query)) {
          locationSuggestions.push(city);
        }
      });
      
      // Search in districts
      Object.entries(TURKEY_DISTRICTS).forEach(([city, districts]) => {
        districts.forEach((district) => {
          if (district.toLowerCase().includes(query)) {
            locationSuggestions.push(`${district}, ${city}`);
          }
        });
      });
      
      // Search in mahalleler (neighborhoods)
      Object.entries(TURKEY_MAHALLELER).forEach(([district, mahalleler]) => {
        mahalleler.forEach((mahalle) => {
          if (mahalle.toLowerCase().includes(query)) {
            locationSuggestions.push(`${mahalle}, ${district}`);
          }
        });
      });
      
      setSuggestions([...new Set(locationSuggestions)].slice(0, 8));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };
  
  const handleLocationSelect = (selected: string) => {
    setLocation(selected);
    setShowSuggestions(false);
    setSuggestions([]);
  };
  const taskSizeOptions: ReadonlyArray<{ value: "small" | "medium" | "large"; key: TKey }> = [
    { value: "small", key: "td_size_small" },
    { value: "medium", key: "td_size_medium" },
    { value: "large", key: "td_size_large" },
  ];
  const vehicleOptions: ReadonlyArray<{ value: "none" | "car" | "truck"; key: TKey }> = [
    { value: "none", key: "td_vehicle_none" },
    { value: "car", key: "td_vehicle_car" },
    { value: "truck", key: "td_vehicle_truck" },
  ];

  const handleConfirm = () => {
    if (!location.trim()) {
      setError(t("td_err_location", lang));
      return;
    }
    if (!taskSize) {
      setError(t("td_err_size", lang));
      return;
    }
    if (vehicleRequired === null) {
      setError(t("td_err_vehicle", lang));
      return;
    }
    if (!details.trim()) {
      setError(t("td_err_details", lang));
      return;
    }

    setError("");
    onConfirm({
      location,
      unitApt,
      taskSize,
      vehicleRequired,
      details,
    });
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="modal-container" style={{ maxWidth: "600px" }}>
        <button className="modal-close" onClick={onCancel} aria-label="Close">✕</button>

        <div className="modal-header">
          <h2 className="modal-title">
            {t("td_title", lang)}
          </h2>
          <p className="modal-subtitle">
            {t("td_subtitle", lang)}
          </p>
        </div>

        <div className="modal-body">
          {/* Location */}
          <div className="form-group" style={{ position: "relative" }}>
            <label className="form-label">
              {t("td_location", lang)} *
            </label>
            <input
              type="text"
              className="form-input"
              placeholder={t("td_location_ph", lang)}
              value={location}
              onChange={(e) => handleLocationChange(e.target.value)}
              onFocus={() => location.trim().length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              autoComplete="off"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "#fff",
                border: "1px solid #e0e0e0",
                borderTop: "none",
                borderRadius: "0 0 8px 8px",
                maxHeight: "280px",
                overflowY: "auto",
                zIndex: 10,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}>
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLocationSelect(suggestion)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "12px 16px",
                      textAlign: "left",
                      background: "none",
                      border: "none",
                      borderBottom: idx < suggestions.length - 1 ? "1px solid #f0f0f0" : "none",
                      cursor: "pointer",
                      fontSize: ".95rem",
                      color: "#333",
                      transition: "background-color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    📍 {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Unit/Apt */}
          <div className="form-group">
            <label className="form-label">
              {t("td_unit", lang)}
            </label>
            <input
              type="text"
              className="form-input"
              placeholder={t("td_unit_ph", lang)}
              value={unitApt}
              onChange={(e) => setUnitApt(e.target.value)}
            />
          </div>

          {/* Task Size */}
          <div className="form-group">
            <label className="form-label">
              {t("td_size", lang)} *
            </label>
            <div className="radio-group">
              {taskSizeOptions.map((opt) => (
                <label key={opt.value} className="radio-label">
                  <input
                    type="radio"
                    name="taskSize"
                    value={opt.value}
                    checked={taskSize === opt.value}
                    onChange={() => setTaskSize(opt.value as "small" | "medium" | "large")}
                  />
                  <span>{t(opt.key, lang)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Vehicle */}
          <div className="form-group">
            <label className="form-label">
              {t("td_vehicle", lang)} *
            </label>
            <div className="radio-group">
              {vehicleOptions.map((opt) => (
                <label key={opt.value} className="radio-label">
                  <input
                    type="radio"
                    name="vehicle"
                    value={opt.value}
                    checked={vehicleRequired === opt.value}
                    onChange={() => setVehicleRequired(opt.value as "none" | "car" | "truck")}
                  />
                  <span>{t(opt.key, lang)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Task Details */}
          <div className="form-group">
            <label className="form-label">
              {t("td_details", lang)} *
            </label>
            <textarea
              className="form-textarea"
              placeholder={t("td_details_ph", lang)}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={5}
            />
            <p className="form-hint">
              {t("td_details_hint", lang)}
            </p>
          </div>

          {error && <div className="form-error">{error}</div>}

          {/* Actions */}
          <div className="form-actions">
            <button className="btn-ghost" onClick={onCancel}>
              {t("dtp_cancel", lang)}
            </button>
            <button className="btn-primary" onClick={handleConfirm}>
              {t("td_next", lang)}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .modal-overlay {
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

        .modal-container {
          background: white;
          border-radius: 12px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          width: 100%;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
          z-index: 10;
        }

        .modal-header {
          padding: 2rem 2rem 1rem;
          border-bottom: 1px solid #eee;
        }

        .modal-title {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
          color: #222;
        }

        .modal-subtitle {
          margin: 0.5rem 0 0;
          color: #666;
          font-size: 0.9rem;
        }

        .modal-body {
          padding: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #222;
          font-size: 0.95rem;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .form-input:focus {
          outline: none;
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
        }

        .form-textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          font-family: inherit;
          resize: vertical;
          transition: border-color 0.2s;
        }

        .form-textarea:focus {
          outline: none;
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
        }

        .form-hint {
          margin: 0.5rem 0 0;
          font-size: 0.85rem;
          color: #999;
        }

        .radio-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .radio-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 6px;
          transition: background-color 0.2s;
        }

        .radio-label:hover {
          background-color: #f5f5f5;
        }

        .radio-label input[type="radio"] {
          margin: 0;
          cursor: pointer;
          accent-color: #16a34a;
        }

        .radio-label span {
          color: #444;
          font-size: 0.95rem;
        }

        .form-error {
          background-color: #fee2e2;
          border: 1px solid #f87171;
          color: #dc2626;
          padding: 0.75rem;
          border-radius: 6px;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #eee;
        }

        .form-actions .btn-ghost {
          flex: 1;
          padding: 0.75rem 1.5rem;
          background: #f5f5f5;
          border: 1px solid #ddd;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .form-actions .btn-ghost:hover {
          background: #efefef;
          border-color: #ccc;
        }

        .form-actions .btn-primary {
          flex: 1;
          padding: 0.75rem 1.5rem;
          background: #16a34a;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .form-actions .btn-primary:hover {
          background: #15803d;
        }
      `}</style>
    </div>
  );
}
