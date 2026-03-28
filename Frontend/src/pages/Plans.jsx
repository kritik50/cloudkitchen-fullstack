import { useEffect, useState } from "react";
import React from "react";
import BASE_URL from "../services/api";
import PlanCard from "../pages/PlanCard";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/mealPlans/plans`);
        const data = await res.json();
        if (Array.isArray(data)) setPlans(data);
        else setPlans([]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlans();
  }, []);

  const toggleCard = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="plans-page">

      {/* Ambient glow */}
      <div className="plans-glow plans-glow--1" />
      <div className="plans-glow plans-glow--2" />

      {/* Header */}
      <div className="plans-header">
        <span className="plans-eyebrow">Meal Plans</span>
        <h1 className="plans-title">Choose Your <em>Plan</em></h1>
        <p className="plans-subtitle">
          Every plan is macro-calculated, freshly prepared daily, and built around your goal.
        </p>
      </div>

      {/* Grid — 2 columns */}
      <div className="plans-grid">
        {plans.map((plan, index) => (
          <PlanCard
            key={plan.id || index}
            plan={plan}
            index={index}
            isActive={activeIndex === index}
            onToggle={() => toggleCard(index)}
          />
        ))}

        {/* Custom plan card — spans full width */}
        <div className="plan-card plan-card--custom">
          <div className="plan-custom-inner">
            <div className="plan-custom-icon">⚡</div>
            <div>
              <h2 className="plan-custom-title">Build Your Own</h2>
              <p className="plan-custom-desc">
                Have specific macros or dietary needs? We'll build a plan around you.
              </p>
            </div>
          </div>
          <button className="plan-custom-btn">Customise Plan →</button>
        </div>
      </div>

    </section>
  );
};

export default Plans;