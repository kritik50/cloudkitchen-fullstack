import React, { useRef, useEffect, useState } from "react";


const features = [
  {
    icon: "🧮",
    title: "Macro Calculated",
    desc: "Every meal comes with clearly defined protein, carbs, and calories — tracked to the gram.",
    stat: "100%",
    statLbl: "Tracked",
  },
  {
    icon: "🥗",
    title: "Fresh Daily Prep",
    desc: "Meals are freshly prepared every morning using high-quality, locally sourced ingredients.",
    stat: "Daily",
    statLbl: "Fresh cut",
  },
  {
    icon: "🫒",
    title: "Low Oil Cooking",
    desc: "Minimal oil, zero unnecessary additives. Clean cooking that doesn't compromise on taste.",
    stat: "0g",
    statLbl: "Trans fat",
  },
  {
    icon: "🏋️",
    title: "Gym Focused",
    desc: "Designed specifically for fat loss, muscle gain, and maintenance phases.",
    stat: "3x",
    statLbl: "Goal plans",
  },
];

const WhyChoose = () => {
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
    <section className={`why-section${visible ? " why-section--visible" : ""}`} ref={ref}>

      {/* Ambient glow */}
      <div className="why-glow" />

      <div className="why-container">

        {/* ── LEFT: Feature grid ── */}
        <div className="why-left">
          {features.map((f, i) => (
            <div
              className="why-box"
              key={f.title}
              style={{ "--delay": `${i * 0.1}s` }}
            >
              <div className="why-box-inner">
                <div className="why-icon">{f.icon}</div>
                <div className="why-box-text">
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>

              {/* Bottom stat */}
              <div className="why-box-stat">
                <span className="why-box-stat-val">{f.stat}</span>
                <span className="why-box-stat-lbl">{f.statLbl}</span>
              </div>

              {/* Hover accent line */}
              <div className="why-box-line" />
            </div>
          ))}
        </div>

        {/* ── RIGHT: Copy ── */}
        <div className="why-right">
          <span className="why-eyebrow">The GymBites edge</span>

          <h2 className="why-title">
            Why Choose<br />
            Gym<em>Bites</em>?
          </h2>

          <p className="why-subtitle">
            Because your fitness goals deserve better than guesswork. We handle the math and the cooking — so you can focus on the lifting.
          </p>

          {/* Mini stat row */}
          <div className="why-highlights">
            <div className="why-highlight">
              <span className="why-highlight-val">500+</span>
              <span className="why-highlight-lbl">Athletes served</span>
            </div>
            <div className="why-highlight-sep" />
            <div className="why-highlight">
              <span className="why-highlight-val">40+</span>
              <span className="why-highlight-lbl">Dishes weekly</span>
            </div>
            <div className="why-highlight-sep" />
            <div className="why-highlight">
              <span className="why-highlight-val">4.9★</span>
              <span className="why-highlight-lbl">Avg rating</span>
            </div>
          </div>

          <button className="why-cta">
            Explore Menu <span>→</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default WhyChoose;