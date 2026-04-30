import { useState } from "react";
import { useLang } from "./LangContext";
import { t } from "./translations";

interface Props {
  onConfirm: (date: string, time: string) => void;
  onCancel: () => void;
}

export default function DateTimePickerModal({ onConfirm, onCancel }: Props) {
  const { lang } = useLang();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split("T")[0]);
  const [selectedTime, setSelectedTime] = useState("10:00");

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const getDaysArray = () => {
    const days: (number | null)[] = [];
    const firstDay = firstDayOfMonth(currentMonth);
    const totalDays = daysInMonth(currentMonth);

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= totalDays; i++) days.push(i);

    return days;
  };

  const getDayOfWeekName = (index: number) => {
    const names = lang === "tr"
      ? ["PzR", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"]
      : ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return names[index];
  };

  const getMonthName = (date: Date) => {
    const names = lang === "tr"
      ? ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
      : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return names[date.getMonth()];
  };

  const makeDate = (year: number, month: number, day: number) => {
    return new Date(year, month, day).toISOString().split("T")[0];
  };

  const isToday = (dateStr: string) => dateStr === today.toISOString().split("T")[0];

  const isPastDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date < today && !isToday(dateStr);
  };

  const handleDateClick = (day: number) => {
    if (day) {
      const dateStr = makeDate(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      if (!isPastDate(dateStr)) {
        setSelectedDate(dateStr);
      }
    }
  };

  const handleConfirm = () => {
    onConfirm(selectedDate, selectedTime);
  };

  const days = getDaysArray();

  return (
    <div className="dtp-overlay" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="dtp-modal">
        <button className="dtp-close" onClick={onCancel}>✕</button>

        <div className="dtp-header">
          <h2 className="dtp-title">
            {t("dtp_title", lang)}
          </h2>
        </div>

        <div className="dtp-content">
          {/* Calendar */}
          <div className="dtp-calendar">
            <div className="dtp-month-nav">
              <button
                className="dtp-nav-btn"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              >
                ←
              </button>
              <h3 className="dtp-month-title">
                {getMonthName(currentMonth)} {currentMonth.getFullYear()}
              </h3>
              <button
                className="dtp-nav-btn"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              >
                →
              </button>
            </div>

            <div className="dtp-weekdays">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="dtp-weekday">
                  {getDayOfWeekName(i)}
                </div>
              ))}
            </div>

            <div className="dtp-days">
              {days.map((day, idx) => {
                const dateStr = day
                  ? makeDate(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                  : null;
                const isSelected = dateStr === selectedDate;
                const isPast = dateStr ? isPastDate(dateStr) : false;
                const isTodayDate = dateStr ? isToday(dateStr) : false;

                return (
                  <button
                    key={idx}
                    className={`dtp-day ${isSelected ? "dtp-day--selected" : ""} ${isTodayDate ? "dtp-day--today" : ""} ${isPast ? "dtp-day--disabled" : ""}`}
                    disabled={!day || isPast}
                    onClick={() => handleDateClick(day!)}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Picker */}
          <div className="dtp-time">
            <label className="dtp-time-label">
              {t("dtp_start_time", lang)}
            </label>
            <select className="dtp-time-select" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
              {Array.from({ length: 48 }, (_, i) => {
                const hour = Math.floor(i / 2);
                const minute = (i % 2) * 30;
                const timeStr = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
                return (
                  <option key={timeStr} value={timeStr}>
                    {timeStr}
                  </option>
                );
              })}
            </select>

            <div className="dtp-time-info">
              <p className="dtp-time-request">
                {t("dtp_request_for", lang)}
              </p>
              <p className="dtp-time-display">
                {new Date(selectedDate).toLocaleDateString(lang === "tr" ? "tr-TR" : "en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}, {selectedTime}
              </p>
              <p className="dtp-time-hint">
                {t("dtp_hint", lang)}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="dtp-actions">
          <button className="dtp-btn dtp-btn--cancel" onClick={onCancel}>
            {t("dtp_cancel", lang)}
          </button>
          <button className="dtp-btn dtp-btn--confirm" onClick={handleConfirm}>
            {t("dtp_select", lang)}
          </button>
        </div>
      </div>

      <style>{`
        .dtp-overlay {
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

        .dtp-modal {
          background: white;
          border-radius: 12px;
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          position: relative;
        }

        .dtp-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #999;
          z-index: 10;
        }

        .dtp-header {
          padding: 2rem 2rem 1rem;
          border-bottom: 1px solid #eee;
        }

        .dtp-title {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: #222;
        }

        .dtp-content {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          padding: 2rem;
        }

        @media (max-width: 600px) {
          .dtp-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        .dtp-calendar {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .dtp-month-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .dtp-nav-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #16a34a;
          padding: 0.5rem;
        }

        .dtp-nav-btn:hover {
          color: #15803d;
        }

        .dtp-month-title {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: #222;
          text-align: center;
          flex: 1;
        }

        .dtp-weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .dtp-weekday {
          text-align: center;
          font-weight: 600;
          font-size: 0.75rem;
          color: #999;
          padding: 0.5rem 0;
        }

        .dtp-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.5rem;
        }

        .dtp-day {
          aspect-ratio: 1;
          border: 1px solid #ddd;
          border-radius: 6px;
          background: white;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          color: #222;
          transition: all 0.2s;
          padding: 0;
        }

        .dtp-day:hover:not(.dtp-day--disabled) {
          border-color: #16a34a;
          background: #f0fdf4;
        }

        .dtp-day--selected {
          background: #16a34a;
          color: white;
          border-color: #16a34a;
        }

        .dtp-day--today {
          border-color: #16a34a;
          font-weight: 700;
        }

        .dtp-day--disabled {
          color: #ccc;
          cursor: not-allowed;
          background: #fafafa;
        }

        .dtp-time {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .dtp-time-label {
          display: block;
          font-weight: 600;
          color: #222;
          font-size: 0.95rem;
        }

        .dtp-time-select {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          font-family: inherit;
          cursor: pointer;
        }

        .dtp-time-select:focus {
          outline: none;
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
        }

        .dtp-time-info {
          background: #f9fafb;
          border-left: 3px solid #16a34a;
          padding: 1rem;
          border-radius: 4px;
        }

        .dtp-time-request {
          margin: 0 0 0.25rem;
          font-size: 0.85rem;
          color: #666;
          text-transform: uppercase;
        }

        .dtp-time-display {
          margin: 0 0 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          color: #222;
        }

        .dtp-time-hint {
          margin: 0;
          font-size: 0.85rem;
          color: #666;
        }

        .dtp-actions {
          display: flex;
          gap: 1rem;
          padding: 1.5rem 2rem;
          border-top: 1px solid #eee;
          background: #fafafa;
        }

        .dtp-btn {
          flex: 1;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.95rem;
        }

        .dtp-btn--cancel {
          background: white;
          border: 1px solid #ddd;
          color: #666;
        }

        .dtp-btn--cancel:hover {
          background: #f5f5f5;
          border-color: #ccc;
        }

        .dtp-btn--confirm {
          background: #16a34a;
          color: white;
        }

        .dtp-btn--confirm:hover {
          background: #15803d;
        }
      `}</style>
    </div>
  );
}
