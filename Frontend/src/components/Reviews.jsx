// components/Reviews.jsx
import React, { useRef, useEffect, useState } from "react";
import { ReviewsSkeleton } from "./Skeletons";

const Reviews = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [data]);

  if (!data) return <ReviewsSkeleton />;

  return (
    <section
      className={`reviews-section${visible ? " reviews-section--visible" : ""}`}
      ref={ref}
    >
      <div className="reviews-glow" />

      <div className="reviews-header">
        <span className="reviews-eyebrow">{data.eyebrow}</span>
        <h2 className="reviews-title">{data.title}</h2>
        <p className="reviews-subtitle">{data.subtitle}</p>
      </div>

      <div className="reviews-grid">
        {data.cards?.map((r, i) => (
          <div
            className="review-card"
            key={r.name}
            style={{ "--delay": `${i * 0.12}s` }}
          >
            <span className="review-quote">"</span>

            <div className="review-top">
              <div className="stars">{"★".repeat(r.rating || 0)}</div>
              <span className={`review-tag review-tag--${r.category?.toLowerCase().split(" ")[0]}`}>
                {r.category}
              </span>
            </div>

            <p className="review-text">"{r.title}"</p>

            <div className="review-result">
              <span className="review-result-val">{r.resultValue}</span>
              <span className="review-result-sep">·</span>
              <span className="review-result-period">{r.resultLabel}</span>
            </div>

            <div className="review-footer">
              <div className="review-avatar">{r.initials}</div>
              <div className="review-person">
                <span className="review-name">{r.name}</span>
                <span className="review-plan">{r.plan}</span>
              </div>
            </div>

            <div className="review-line" />
          </div>
        ))}
      </div>

      <div className="reviews-trust">
        {data.metrics?.map((m, i) => (
          <React.Fragment key={m.label}>
            <div className="trust-item">
              <span className="trust-val">{m.value}</span>
              <span className="trust-lbl">{m.label}</span>
            </div>
            {i < data.metrics.length - 1 && <div className="trust-sep" />}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Reviews;