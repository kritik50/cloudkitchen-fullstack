import React from "react";

const PlanCard = ({ plan, isActive, onToggle }) => {
  const meals = plan.meals || {};

  const getMeal = (key) =>
    meals[key] || meals[key.toLowerCase()] || "";

  return (
    <div
      className={`plan-card ${isActive ? "plan-card--active" : ""}`}
      onClick={onToggle}
    >
      {/* HEADER */}
      <div className="plan-card-header">
        <h2>{plan.title}</h2>
        <p>{plan.shortDesc}</p>

        <div className="plan-highlights">
          {plan.highlights?.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>

        <div className="plan-price">
          {plan.price?.weekly}/week
        </div>
      </div>

      {/* EXPAND */}
      <div className="plan-expanded">
        <hr />

        <h4>Breakfast</h4>
        <p>{getMeal("Breakfast")}</p>

        <h4>Lunch</h4>
        <p>{getMeal("Lunch")}</p>

        <h4>Dinner</h4>
        <p>{getMeal("Dinner")}</p>

        <p className="plan-note">{plan.customNote}</p>

        <div className="plan-full-price">
          {plan.price?.weekly}/week | {plan.price?.monthly}/month
        </div>
      </div>
    </div>
  );
};

export default PlanCard;