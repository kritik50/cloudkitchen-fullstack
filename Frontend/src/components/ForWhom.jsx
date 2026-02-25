import React, { useRef, useEffect, useState } from 'react';


const cards = [
  {
    id: "01",
    icon: "💪",
    label: "Bulk",
    title: "Muscle Gain",
    desc: "High-protein meals with surplus calories engineered for hypertrophy. Every gram counted, every macro tracked.",
    stats: [{ val: "40g+", lbl: "Protein" }, { val: "700+", lbl: "Kcal" }],
  },
  {
    id: "02",
    icon: "🔥",
    label: "Cut",
    title: "Fat Loss",
    desc: "High-volume, low-calorie meals that keep you full and fuelled while maintaining a clean deficit.",
    stats: [{ val: "<500", lbl: "Kcal" }, { val: "35g+", lbl: "Protein" }],
  },
  {
    id: "03",
    icon: "⚖️",
    label: "Maintain",
    title: "Maintenance",
    desc: "Perfectly balanced macros for athletes sustaining peak performance without the guesswork.",
    stats: [{ val: "Balanced", lbl: "Macros" }, { val: "Daily", lbl: "Fresh cut" }],
  },
];

const ForWhom = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`who-section${visible ? ' who-section--visible' : ''}`} ref={sectionRef}>

      {/* Ambient top glow */}
      <div className="who-glow" />

      {/* Header */}
      <div className="who-header">
        <span className="who-eyebrow">Built for every goal</span>
        <h2 className="who-title">
          Who Is Gym<em>Bites</em> For?
        </h2>
        <p className="who-subtitle">
          Whether you're cutting, bulking, or maintaining — we've got the fuel for your fire.
        </p>
      </div>

      {/* Cards */}
      <div className="who-cards">
        {cards.map((card, i) => (
          <div
            className="who-card"
            key={card.id}
            style={{ '--delay': `${i * 0.12}s` }}
          >
            {/* Ghost number */}
            <span className="card-number">{card.id}</span>

            {/* Top row */}
            <div className="who-card-top">
              <div className="who-icon-wrapper">{card.icon}</div>
              <span className="who-card-label">{card.label}</span>
            </div>

            <h3 className="who-card-title">{card.title}</h3>
            <p className="who-card-desc">{card.desc}</p>

            {/* Inline stats */}
            <div className="who-card-stats">
              {card.stats.map((s) => (
                <div className="who-card-stat" key={s.lbl}>
                  <span className="who-card-stat-val">{s.val}</span>
                  <span className="who-card-stat-lbl">{s.lbl}</span>
                </div>
              ))}
            </div>

            {/* Hover accent line */}
            <div className="who-card-line" />
          </div>
        ))}
      </div>

    </section>
  );
};

export default ForWhom;