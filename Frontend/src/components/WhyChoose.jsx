import React, { useRef, useEffect, useState } from "react";
import BASE_URL from "../services/api";

const WhyChoose = () => {
  const [visible, setVisible] = useState(true);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);

  // Intersection animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Fetch from backend
  useEffect(() => {
    const fetchWhyChoose = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/homepage/wcg`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching whyChoose:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWhyChoose();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!data) return <div>No Data</div>;

  return (
    <section
      className={`why-section${visible ? " why-section--visible" : ""}`}
      ref={ref}
    >
      <div className="why-glow" />

      <div className="why-container">

        {/* LEFT SIDE - Cards */}
        <div className="why-left">
          {data.cards?.map((card, i) => {
            const [statVal, statLbl] = card.bottomText?.split(" ") || [];

            return (
              <div
                className="why-box"
                key={card.title}
                style={{ "--delay": `${i * 0.1}s` }}
              >
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

        {/* RIGHT SIDE */}
        <div className="why-right">
          <span className="why-eyebrow">{data.eyebrow}</span>

          <h2 className="why-title">
           {data.title}
          </h2>

          <p className="why-subtitle">{data.subtitle}</p>

          {/* Metrics Row */}
          <div className="why-highlights">
            {data.metrics?.map((m, i) => (
              <React.Fragment key={m.label}>
                <div className="why-highlight">
                  <span className="why-highlight-val">{m.value}</span>
                  <span className="why-highlight-lbl">{m.label}</span>
                </div>
                {i < data.metrics.length - 1 && (
                  <div className="why-highlight-sep" />
                )}
              </React.Fragment>
            ))}
          </div>

          <button
            className="why-cta"
            onClick={() => (window.location.href = data.cta?.path)}
          >
            {data.cta?.text} <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;