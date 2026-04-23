import React from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import bowl from "../assets/bowl.jpg";
import { HeroSkeleton } from "./Skeletons";

const Hero = ({ data }) => {
  const navigate = useNavigate();

  if (!data) return <HeroSkeleton />;

  return (
    <section className="hero">
      <div className="hero-grain" />
      <div className="hero-blob hero-blob--left" />
      <div className="hero-blob hero-blob--right" />

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-pill">
            <span className="hero-pill-dot" />
            {data.topBadge}
          </div>

          <h1 className="hero-title">{data.title}</h1>

          <p className="hero-sub">
            {data.subtitle ||
              "Performance-grade meals crafted for your macros with no guesswork."}
          </p>

          <div className="hero-stats">
            {data.stats?.map((stat, index) => (
              <Fragment key={stat.label}>
                <div className="hero-stat">
                  <span className="hero-stat-val">{stat.value}</span>
                  <span className="hero-stat-lbl">{stat.label}</span>
                </div>
                {index < data.stats.length - 1 && <div className="hero-stat-sep" />}
              </Fragment>
            ))}
          </div>

          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => navigate(data.primaryButton?.path || "/plans")}>
              {data.primaryButton?.text || "Choose Plan"}
              <span className="primary-btn-arrow">{"->"}</span>
            </button>
            <button className="secondary-btn" onClick={() => navigate(data.secondaryButton?.path || "/menu")}>
              {data.secondaryButton?.text || "View Menu"}
            </button>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-ring" />
          <img src={bowl} alt="High protein meal" className="hero-image-main" />
          <div className="hero-badge hero-badge--protein">
            <span className="hero-badge-icon">P</span>
            <div>
              <span className="hero-badge-val">45g</span>
              <span className="hero-badge-lbl">Protein</span>
            </div>
          </div>
          <div className="hero-badge hero-badge--cal">
            <span className="hero-badge-icon">K</span>
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
