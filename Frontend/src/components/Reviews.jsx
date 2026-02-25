import React, { useRef, useEffect, useState } from "react";


const reviews = [
  {
    name: "Rohit M.",
    goal: "Fat Loss",
    tag: "fat",
    stars: 5,
    kg: "-4kg",
    period: "2 months",
    text: "Lost 4 kg in 2 months without feeling weak or hungry. Meals are clean, filling, and perfect for cutting. Never thought diet food could actually taste this good.",
    avatar: "RM",
  },
  {
    name: "Arjun K.",
    goal: "Muscle Gain",
    tag: "muscle",
    stars: 5,
    kg: "+3kg",
    period: "6 weeks",
    text: "I don't worry about protein anymore. Meals are tasty, consistent, and actually help recovery after workouts. The macros are spot on every single time.",
    avatar: "AK",
  },
  {
    name: "Sneha R.",
    goal: "Balanced",
    tag: "balanced",
    stars: 5,
    kg: "On track",
    period: "3 months",
    text: "As someone working long hours, GymBites keeps my diet clean without overthinking food every day. It's become the one thing I don't have to stress about.",
    avatar: "SR",
  },
];

const Reviews = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`reviews-section${visible ? " reviews-section--visible" : ""}`} ref={ref}>

      <div className="reviews-glow" />

      {/* Header */}
      <div className="reviews-header">
        <span className="reviews-eyebrow">Social proof</span>
        <h2 className="reviews-title">
          What Our <em>Athletes</em> Say
        </h2>
        <p className="reviews-subtitle">
          Real results from real gym-goers who chose GymBites.
        </p>
      </div>

      {/* Cards */}
      <div className="reviews-grid">
        {reviews.map((r, i) => (
          <div
            className="review-card"
            key={r.name}
            style={{ "--delay": `${i * 0.12}s` }}
          >
            {/* Giant decorative quote */}
            <span className="review-quote">"</span>

            {/* Top row: stars + tag */}
            <div className="review-top">
              <div className="stars">
                {"★".repeat(r.stars)}
              </div>
              <span className={`review-tag review-tag--${r.tag}`}>{r.goal}</span>
            </div>

            {/* Review text */}
            <p className="review-text">"{r.text}"</p>

            {/* Result chip */}
            <div className="review-result">
              <span className="review-result-val">{r.kg}</span>
              <span className="review-result-sep">·</span>
              <span className="review-result-period">in {r.period}</span>
            </div>

            {/* Footer: avatar + name */}
            <div className="review-footer">
              <div className="review-avatar">{r.avatar}</div>
              <div className="review-person">
                <span className="review-name">{r.name}</span>
                <span className="review-plan">GymBites {r.goal} Plan</span>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="review-line" />
          </div>
        ))}
      </div>

      {/* Bottom trust strip */}
      <div className="reviews-trust">
        <div className="trust-item">
          <span className="trust-val">500+</span>
          <span className="trust-lbl">Happy athletes</span>
        </div>
        <div className="trust-sep" />
        <div className="trust-item">
          <span className="trust-val">4.9★</span>
          <span className="trust-lbl">Average rating</span>
        </div>
        <div className="trust-sep" />
        <div className="trust-item">
          <span className="trust-val">98%</span>
          <span className="trust-lbl">Would recommend</span>
        </div>
      </div>

    </section>
  );
};

export default Reviews;