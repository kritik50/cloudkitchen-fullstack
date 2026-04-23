import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const GOALS = ["Fat Loss", "Muscle Gain", "Maintenance"];
const DIETS = ["Veg", "Non-Veg"];
const MEAL_COUNTS = [2, 3, 4];

export default function CustomizePlan() {
  const navigate = useNavigate();
  const { selectedPlan, customPlan, setCustomPlan, addToCart } = useAppContext();

  const updateField = (field, value) => {
    setCustomPlan((prev) => ({ ...prev, [field]: value }));
  };

  const addCustomizationToCart = () => {
    addToCart({
      id: `customization-${customPlan.goal}-${customPlan.dietType}-${customPlan.mealsPerDay}`,
      name: "Plan Customization",
      category: "Customization",
      price: 199,
      quantity: 1,
      metadata: {
        ...customPlan,
        selectedPlan: selectedPlan?.title || "",
      },
    });
    navigate("/checkout");
  };

  return (
    <section className="plans-page">
      <div className="plans-header" style={{ marginBottom: "30px" }}>
        <span className="plans-eyebrow">Customize</span>
        <h1 className="plans-title">
          Build Your <em>Plan</em>
        </h1>
        <p className="plans-subtitle">
          {selectedPlan
            ? `Customizing: ${selectedPlan.title}`
            : "Choose your goals and preferences before checkout."}
        </p>
      </div>

      <div
        className="plan-card"
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          cursor: "default",
          gap: "20px",
        }}
      >
        <div>
          <h3 className="plan-card-title" style={{ fontSize: "22px" }}>
            Goal
          </h3>
          <div className="menu-tabs" style={{ marginTop: "12px" }}>
            {GOALS.map((goal) => (
              <button
                key={goal}
                className={`menu-tab ${customPlan.goal === goal ? "active" : ""}`}
                onClick={() => updateField("goal", goal)}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="plan-card-title" style={{ fontSize: "22px" }}>
            Diet Type
          </h3>
          <div className="menu-tabs" style={{ marginTop: "12px" }}>
            {DIETS.map((diet) => (
              <button
                key={diet}
                className={`menu-tab ${customPlan.dietType === diet ? "active" : ""}`}
                onClick={() => updateField("dietType", diet)}
              >
                {diet}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="plan-card-title" style={{ fontSize: "22px" }}>
            Meals Per Day
          </h3>
          <div className="menu-tabs" style={{ marginTop: "12px" }}>
            {MEAL_COUNTS.map((count) => (
              <button
                key={count}
                className={`menu-tab ${customPlan.mealsPerDay === count ? "active" : ""}`}
                onClick={() => updateField("mealsPerDay", count)}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="plan-card-title" style={{ fontSize: "22px" }}>
            Notes
          </h3>
          <textarea
            className="cm-textarea"
            style={{ width: "100%", marginTop: "12px" }}
            value={customPlan.note}
            onChange={(event) => updateField("note", event.target.value)}
            placeholder="Any allergies, dislikes, or calorie target?"
          />
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button className="plan-custom-btn" onClick={() => navigate("/plans")}>
            Back to Plans
          </button>
          <button className="plan-custom-btn" onClick={addCustomizationToCart}>
            Save and Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
