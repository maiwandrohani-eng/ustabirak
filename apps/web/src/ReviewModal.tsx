import { useState } from "react";

interface Props {
  workerName: string;
  serviceTitle: string;
  onClose: () => void;
  onSubmit: (rating: number, text: string) => void;
}

export default function ReviewModal({ workerName, serviceTitle, onClose, onSubmit }: Props) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const labels = ["", "Poor", "Fair", "Good", "Great", "Excellent!"];

  const handleSubmit = () => {
    if (rating === 0) return;
    setSubmitted(true);
    onSubmit(rating, text);
  };

  return (
    <div className="auth-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="auth-modal review-modal">
        <button className="auth-close" onClick={onClose} aria-label="Close">✕</button>

        {submitted ? (
          <div className="review-success">
            <div className="review-success-icon">🌟</div>
            <h3>Thank you for your review!</h3>
            <p>Your feedback helps the UstaYolda community.</p>
            <button className="btn-primary" onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <h2 className="review-modal-title">Rate your experience</h2>
            <p className="review-modal-sub">with <strong>{workerName}</strong> — {serviceTitle}</p>

            <div className="review-stars-input">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  className={"review-star-btn" + (n <= (hovered || rating) ? " review-star-btn--active" : "")}
                  onMouseEnter={() => setHovered(n)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(n)}
                  aria-label={`${n} star`}
                >
                  ★
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="review-rating-label">{labels[rating]}</p>
            )}

            <div className="checkout-field-group" style={{ marginTop: "1rem" }}>
              <label className="checkout-label">Your review <span className="optional">(optional)</span></label>
              <textarea
                className="checkout-textarea"
                placeholder="Tell others about your experience..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
              />
            </div>

            <button
              className="btn-primary"
              style={{ width: "100%", marginTop: "1.25rem" }}
              onClick={handleSubmit}
              disabled={rating === 0}
            >
              Submit Review
            </button>
          </>
        )}
      </div>
    </div>
  );
}
