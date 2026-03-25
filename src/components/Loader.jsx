import "./loader.css";

const Loader = () => {
  return (
    <div className="loader-screen">

      {/* Grid lines background */}
      <div className="loader-grid" />

      {/* Corner brackets */}
      <div className="loader-corner loader-corner--tl" />
      <div className="loader-corner loader-corner--tr" />
      <div className="loader-corner loader-corner--bl" />
      <div className="loader-corner loader-corner--br" />

      {/* Ambient glow orbs */}
      <div className="loader-orb loader-orb--1" />
      <div className="loader-orb loader-orb--2" />
      <div className="loader-orb loader-orb--3" />

      {/* Floating macro pills */}
      <div className="loader-floating-assets">
        <div className="float-pill float-pill--1">
          <span className="float-pill-val">42g</span>
          <span className="float-pill-lbl">Protein</span>
        </div>
        <div className="float-pill float-pill--2">
          <span className="float-pill-icon">⚡</span>
          <span className="float-pill-val">520</span>
          <span className="float-pill-lbl">Kcal</span>
        </div>
        <div className="float-pill float-pill--3">
          <span className="float-pill-val">0g</span>
          <span className="float-pill-lbl">Trans fat</span>
        </div>

        {/* Floating icons */}
        <div className="float-icon float-icon--1">
          {/* Dumbbell */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6.5 6.5h11"/><path d="M6.5 17.5h11"/><path d="M9.5 6.5v11"/><path d="M14.5 6.5v11"/><path d="M4 4v16"/><path d="M20 4v16"/>
          </svg>
        </div>
        <div className="float-icon float-icon--2">
          {/* Leaf */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
          </svg>
        </div>
        <div className="float-icon float-icon--3">
          {/* Fire */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
          </svg>
        </div>
      </div>

      {/* Central content */}
      <div className="loader-content">

        {/* Scanning line */}
        <div className="loader-scan-line" />

        {/* Logo */}
        <div className="loader-logo-wrap">
          <div className="loader-logo-ring" />
          <h1 className="loader-title">
            Gym<em>Bites</em>
          </h1>
        </div>

        <p className="loader-sub">
          <span className="loader-sub-line" />
          Fueling Your Goals
          <span className="loader-sub-line" />
        </p>

        {/* Progress system */}
        <div className="loader-bar-container">
          <div className="loader-bar-track">
            <div className="loader-bar-fill" />
            <div className="loader-bar-shimmer" />
          </div>
          <div className="loader-bar-labels">
            <span className="loader-bar-lbl">Initialising</span>
            <span className="loader-bar-pct">—</span>
          </div>
        </div>

        {/* Status dots */}
        <div className="loader-dots">
          <span className="loader-dot loader-dot--1" />
          <span className="loader-dot loader-dot--2" />
          <span className="loader-dot loader-dot--3" />
        </div>

      </div>

    </div>
  );
};

export default Loader;