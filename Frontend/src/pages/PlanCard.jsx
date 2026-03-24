import React from "react";

const PlanCard = ({ plan, isActive, onToggle }) => {
  return (
    <div className={`plan-card ${isActive ? "plan-card--active" : ""}`}>
      
      {/* CLICKABLE HEADER */}
      <div className="plan-card-header" onClick={onToggle}>
        <h2>{plan.title}</h2>
        <p>{plan.shortDesc}</p>

        <div className="plan-highlights">
          {plan.highlights?.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>

        <div className="plan-price">
          ₹{plan.price?.weekly}/week
        </div>
      </div>

      {/* EXPANDED */}
      {isActive && (
        <div className="plan-expanded">
          <hr />

          <div>
            <h4>Breakfast</h4>
            <ul>
              {plan.meals?.breakfast?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Lunch</h4>
            <ul>
              {plan.meals?.lunch?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Dinner</h4>
            <ul>
              {plan.meals?.dinner?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <p className="plan-note">{plan.customNote}</p>

          <div className="plan-full-price">
            ₹{plan.price?.weekly}/week | ₹{plan.price?.monthly}/month
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanCard;