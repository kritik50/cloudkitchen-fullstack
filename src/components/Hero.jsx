import { useEffect, useState } from "react";
import bowl from "../assets/bowl.jpg";
import BASE_URL from "../services/api";
import { Fragment } from "react";

const Hero = () => {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/homepage/hero`);
        const data = await response.json();
        setHero(data);
      } catch (error) {
        console.error("Error fetching hero:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  if (loading) return <p>Working on it.....</p>;

  return (
    <section className="hero">
      <div className="hero-grain" />
      <div className="hero-blob hero-blob--left" />
      <div className="hero-blob hero-blob--right" />

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-pill">
            <span className="hero-pill-dot" />
            {hero.topBadge}
          </div>

          <h1 className="hero-title">
            {hero.title || (
              <>
                Fuel Built
                <br />
                For <em>Athletes</em>
              </>
            )}
          </h1>

          <p className="hero-sub">
            {hero.subtitle ||
              "Performance-grade meals crafted for your macros — no compromises, no guesswork."}
          </p>

          <div className="hero-stats">
            {hero.stats?.map((stat, index) => (
              <Fragment key={stat.label}>
                <div className="hero-stat">
                  <span className="hero-stat-val">{stat.value}</span>
                  <span className="hero-stat-lbl">{stat.label}</span>
                </div>

                {index < hero.stats.length - 1 && (
                  <div className="hero-stat-sep" />
                )}
              </Fragment>
            ))}
          </div>

          <div className="hero-buttons">
            <button className="primary-btn">
              {hero.primaryButton?.text}
              <span className="primary-btn-arrow">→</span>
            </button>
            <button className="secondary-btn">
              {hero.secondaryButton?.text}
            </button>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-ring" />

          <img src={bowl} alt="High protein meal" className="hero-image-main" />

          <div className="hero-badge hero-badge--protein">
            <span className="hero-badge-icon">⚡</span>
            <div>
              <span className="hero-badge-val">45g</span>
              <span className="hero-badge-lbl">Protein</span>
            </div>
          </div>

          <div className="hero-badge hero-badge--cal">
            <span className="hero-badge-icon">🔥</span>
            <div>
              <span className="hero-badge-val">520</span>
              <span className="hero-badge-lbl">Kcal</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
