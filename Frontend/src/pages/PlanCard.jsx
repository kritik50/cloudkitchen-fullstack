const PlanCard = ({ plan, index, isActive, onToggle, onChoose, billingCycle }) => {
  const meals = plan.meals || {};

  const getMeal = (key) => meals[key] || meals[key.toLowerCase()] || "-";

  const goalColors = {
    0: { accent: "#7eb8f7", dim: "rgba(126,184,247,0.08)", border: "rgba(126,184,247,0.25)" },
    1: { accent: "#5eead4", dim: "rgba(94,234,212,0.08)", border: "rgba(94,234,212,0.25)" },
    2: { accent: "#f87171", dim: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.25)" },
    3: { accent: "#a78bfa", dim: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.25)" },
  };

  const color = goalColors[index % 4];
  const activePrice = plan.price?.[billingCycle] || plan.price?.weekly || plan.price;

  return (
    <div
      className={`plan-card${isActive ? " plan-card--active" : ""}`}
      onClick={onToggle}
      style={{
        "--card-accent": color.accent,
        "--card-dim": color.dim,
        "--card-border": color.border,
      }}
    >
      <span className="plan-card-num">{String(index + 1).padStart(2, "0")}</span>

      <div className="plan-card-top">
        <span className="plan-card-tag">{plan.tag || "Plan"}</span>
        <span className="plan-card-toggle">{isActive ? "-" : "+"}</span>
      </div>

      <h2 className="plan-card-title">{plan.title}</h2>
      <p className="plan-card-desc">{plan.shortDesc}</p>

      <div className="plan-highlights">
        {plan.highlights?.map((item, i) => (
          <span className="plan-highlight-chip" key={i}>
            {item}
          </span>
        ))}
      </div>

      <div className="plan-price">
        <span className="plan-price-val">{activePrice}</span>
        <span className="plan-price-lbl">/ {billingCycle}</span>
      </div>

      <div className={`plan-expanded${isActive ? " plan-expanded--open" : ""}`}>
        <div className="plan-expanded-inner">
          <div className="plan-divider" />

          {["Breakfast", "Lunch", "Dinner"].map((meal) => (
            <div className="plan-meal-row" key={meal}>
              <span className="plan-meal-lbl">{meal}</span>
              <span className="plan-meal-val">{getMeal(meal)}</span>
            </div>
          ))}

          {plan.customNote && <p className="plan-note">{plan.customNote}</p>}

          <div className="plan-full-price">
            <span>{plan.price?.weekly} / week</span>
            <span className="plan-price-sep">|</span>
            <span>{plan.price?.monthly} / month</span>
          </div>

          <button className="plan-custom-btn" onClick={onChoose}>
            Select This Plan
          </button>
        </div>
      </div>

      <div className="plan-card-line" />
    </div>
  );
};

export default PlanCard;
