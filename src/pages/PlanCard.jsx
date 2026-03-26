import React from "react";

const PlanCard = ({ plan, isActive, onToggle }) => {
  return (
    <div className={`plan-card ${isActive ? "plan-card--active" : ""}`}>

      {/* HEADER */}
      <div className="plan-card-header" onClick={onToggle}>
        <h2>{plan.title}</h2>
        <p>{plan.shortDesc}</p>

        <div className="plan-highlights">
          {Array.isArray(plan.highlights) &&
            plan.highlights.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
        </div>

        {/* ✅ FIXED PRICE */}
        <div className="plan-price">
          {plan.price?.weekly}/week
        </div>
      </div>

      {/* EXPANDED */}
      {isActive && (
        <div className="plan-expanded">
          <hr />

          {/* BREAKFAST */}
          <div>
            <h4>Breakfast</h4>
            <ul>
              {Array.isArray(plan.meals?.breakfast) ? (
                plan.meals.breakfast.map((item, i) => (
                  <li key={i}>{item}</li>
                ))
              ) : (
                <li>{plan.meals?.breakfast}</li>
              )}
            </ul>
          </div>

          {/* LUNCH */}
          <div>
            <h4>Lunch</h4>
            <ul>
              {Array.isArray(plan.meals?.lunch) ? (
                plan.meals.lunch.map((item, i) => (
                  <li key={i}>{item}</li>
                ))
              ) : (
                <li>{plan.meals?.lunch}</li>
              )}
            </ul>
          </div>

          {/* DINNER */}
          <div>
            <h4>Dinner</h4>
            <ul>
              {Array.isArray(plan.meals?.dinner) ? (
                plan.meals.dinner.map((item, i) => (
                  <li key={i}>{item}</li>
                ))
              ) : (
                <li>{plan.meals?.dinner}</li>
              )}
            </ul>
          </div>

          <p className="plan-note">{plan.customNote}</p>

          {/* FULL PRICE */}
          <div className="plan-full-price">
            {plan.price?.weekly}/week | {plan.price?.monthly}/month
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanCard;