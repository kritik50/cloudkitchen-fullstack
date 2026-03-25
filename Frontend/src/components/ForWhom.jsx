// components/ForWhom.jsx
import { useRef, useEffect, useState } from "react";
import { ForWhomSkeleton } from "./Skeletons";

const ForWhom = ({ data }) => {
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

  if (!data) return <ForWhomSkeleton />;

  return (
    <section
      className={`who-section${visible ? " who-section--visible" : ""}`}
      ref={sectionRef}
    >
      <div className="who-glow" />

      <div className="who-header">
        <span className="who-eyebrow">Built for every goal</span>
        <h2 className="who-title">{data.title}</h2>
        <p className="who-subtitle">{data.subtitle}</p>
      </div>

      <div className="who-cards">
        {data.cards?.map((card, i) => (
          <div
            className="who-card"
            key={card.title}
            style={{ "--delay": `${i * 0.12}s` }}
          >
            <span className="card-number">{String(i + 1).padStart(2, "0")}</span>

            <div className="who-card-top">
              <div className="who-icon-wrapper">{card.icon}</div>
              <span className="who-card-label">{card.tag}</span>
            </div>

            <h3 className="who-card-title">{card.title}</h3>
            <p className="who-card-desc">{card.description}</p>

            <div className="who-card-stats">
              {card.stats?.map((s) => (
                <div className="who-card-stat" key={s.label}>
                  <span className="who-card-stat-val">{s.value}</span>
                  <span className="who-card-stat-lbl">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="who-card-line" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ForWhom;