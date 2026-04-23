import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WhyChooseSkeleton } from "./Skeletons";

const WhyChoose = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [data]);

  if (!data) return <WhyChooseSkeleton />;

  return (
    <section className={`why-section${visible ? " why-section--visible" : ""}`} ref={ref}>
      <div className="why-glow" />

      <div className="why-container">
        <div className="why-left">
          {data.cards?.map((card, i) => {
            const [statVal, statLbl] = card.bottomText?.split(" ") || [];
            return (
              <div className="why-box" key={card.title} style={{ "--delay": `${i * 0.1}s` }}>
                <div className="why-box-inner">
                  <div className="why-icon">{card.logo}</div>
                  <div className="why-box-text">
                    <h3>{card.title}</h3>
                    <p>{card.subtitle}</p>
                  </div>
                </div>
                <div className="why-box-stat">
                  <span className="why-box-stat-val">{statVal}</span>
                  <span className="why-box-stat-lbl">{statLbl}</span>
                </div>
                <div className="why-box-line" />
              </div>
            );
          })}
        </div>

        <div className="why-right">
          <span className="why-eyebrow">{data.eyebrow}</span>
          <h2 className="why-title">{data.title}</h2>
          <p className="why-subtitle">{data.subtitle}</p>

          <div className="why-highlights">
            {data.metrics?.map((metric, i) => (
              <React.Fragment key={metric.label}>
                <div className="why-highlight">
                  <span className="why-highlight-val">{metric.value}</span>
                  <span className="why-highlight-lbl">{metric.label}</span>
                </div>
                {i < data.metrics.length - 1 && <div className="why-highlight-sep" />}
              </React.Fragment>
            ))}
          </div>

          <button className="why-cta" onClick={() => navigate("/plans")}>
            {data.cta?.text || "Choose Plan"} <span>{"->"}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
