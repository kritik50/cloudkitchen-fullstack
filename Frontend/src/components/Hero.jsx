import { useEffect, useState } from "react";
import bowl from "../assets/bowl.jpg";
import BASE_URL from "../services/api";


const Hero = () => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/homepage/hero`)
      .then((res) => res.json())
      .then((data) => setHero(data))
      .catch(console.error);
  }, []);

  if (!hero) return null;

  return (
    <section className="hero">

      {/* Background grain overlay */}
      <div className="hero-grain" />

      {/* Ambient glow blobs */}
      <div className="hero-blob hero-blob--left" />
      <div className="hero-blob hero-blob--right" />

      <div className="hero-container">

        {/* ── LEFT: Content ── */}
        <div className="hero-content">

          <div className="hero-pill">
            <span className="hero-pill-dot" />
            Freshly Prepared · Daily
          </div>

          <h1 className="hero-title">
            {hero.title || (
              <>
                Fuel Built<br />
                For <em>Athletes</em>
              </>
            )}
          </h1>

          <p className="hero-sub">
            {hero.subtitle ||
              "Performance-grade meals crafted for your macros — no compromises, no guesswork."}
          </p>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-val">40+</span>
              <span className="hero-stat-lbl">Dishes</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat">
              <span className="hero-stat-val">3x</span>
              <span className="hero-stat-lbl">Daily cuts</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat">
              <span className="hero-stat-val">0g</span>
              <span className="hero-stat-lbl">Trans fat</span>
            </div>
          </div>

          <div className="hero-buttons">
            <button className="primary-btn">
              {hero.ctaPrimary || "View Menu"}
              <span className="primary-btn-arrow">→</span>
            </button>
            <button className="secondary-btn">
              {hero.ctaSecondary || "Build My Plan"}
            </button>
          </div>

        </div>

        {/* ── RIGHT: Image ── */}
        <div className="hero-image-wrapper">

          {/* Rotating ring */}
          <div className="hero-ring" />

          <img
            src={bowl}
            alt="High protein meal"
            className="hero-image-main"
          />

          {/* Protein badge */}
          <div className="hero-badge hero-badge--protein">
            <span className="hero-badge-icon">⚡</span>
            <div>
              <span className="hero-badge-val">45g</span>
              <span className="hero-badge-lbl">Protein</span>
            </div>
          </div>

          {/* Calorie badge */}
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