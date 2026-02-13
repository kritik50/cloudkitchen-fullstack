import React from "react";
// import "./WhyChoose.css";

const WhyChoose = () => {
  return (
    // 1. The Section is now just the full-width background wrapper
    <section className="why-section">
      
      {/* 2. This container holds the grid and keeps it centered */}
      <div className="why-container">
      
        <div className="why-left">
          <div className="why-box">
            <div className="why-icon">🧮</div>
            <h3>Macro Calculated</h3>
            <p>Every meal comes with clearly defined protein, carbs, and calories.</p>
          </div>

          <div className="why-box">
            <div className="why-icon">🥗</div>
            <h3>Fresh Daily Prep</h3>
            <p>Meals are freshly prepared every day using high-quality ingredients.</p>
          </div>

          <div className="why-box">
            <div className="why-icon">🫒</div>
            <h3>Low Oil Cooking</h3>
            <p>Minimal oil and no unnecessary additives to keep meals clean.</p>
          </div>

          <div className="why-box">
            <div className="why-icon">🏋️</div>
            <h3>Gym Focused</h3>
            <p>Designed specifically for fat loss, muscle gain, and maintenance.</p>
          </div>
        </div>

        <div className="why-right">
          <h2 className="why-title">Why Choose <br/>GymBites?</h2>
          <p className="why-subtitle">
            Because your fitness goals deserve better than guesswork. We handle the math and the cooking, so you can focus on the lifting.
          </p>
        </div>

      </div>
    </section>
  );
};

export default WhyChoose;