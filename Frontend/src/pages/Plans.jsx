import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanCard from "./PlanCard";
import { useAppContext } from "../context/AppContext";
import { fetchMealPlans } from "../services/api";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [billingCycle, setBillingCycle] = useState("weekly");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { addToCart, setSelectedPlan } = useAppContext();

  useEffect(() => {
    fetchMealPlans()
      .then((data) => {
        setPlans(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setError("Unable to load meal plans right now.");
      });
  }, []);

  const toggleCard = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const handleAddPlan = (plan) => {
    const selectedPrice = Number(
      plan?.price?.[billingCycle] || plan?.price?.weekly || plan?.price || 0
    );
    const selected = { ...plan, billingCycle, selectedPrice };
    setSelectedPlan(selected);

    addToCart({
      id: `plan-${plan.id || plan.title}-${billingCycle}`,
      name: `${plan.title} (${billingCycle})`,
      category: "Plan",
      price: selectedPrice,
      quantity: 1,
      metadata: {
        billingCycle,
        planId: plan.id || plan.title,
      },
    });

    navigate("/customize");
  };

  return (
    <section className="plans-page">
      <div className="plans-glow plans-glow--1" />
      <div className="plans-glow plans-glow--2" />

      <div className="plans-header">
        <span className="plans-eyebrow">Meal Plans</span>
        <h1 className="plans-title">
          Choose Your <em>Plan</em>
        </h1>
        <p className="plans-subtitle">
          Select a base plan, customize meals, then checkout in a single flow.
        </p>

        <div className="menu-tabs" style={{ justifyContent: "center", marginTop: "18px" }}>
          {[
            { id: "weekly", label: "Weekly" },
            { id: "monthly", label: "Monthly" },
          ].map((option) => (
            <button
              key={option.id}
              className={`menu-tab ${billingCycle === option.id ? "active" : ""}`}
              onClick={() => setBillingCycle(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {error ? <p style={{ textAlign: "center", color: "var(--color-coral)" }}>{error}</p> : null}

      <div className="plans-grid">
        {plans.map((plan, index) => (
          <PlanCard
            key={plan.id || index}
            plan={plan}
            index={index}
            isActive={activeIndex === index}
            billingCycle={billingCycle}
            onToggle={() => toggleCard(index)}
            onChoose={() => handleAddPlan(plan)}
          />
        ))}

        <div className="plan-card plan-card--custom">
          <div className="plan-custom-inner">
            <div className="plan-custom-icon">C</div>
            <div>
              <h2 className="plan-custom-title">Build Your Own</h2>
              <p className="plan-custom-desc">
                Fine-tune macros, diet preferences, and meal frequency.
              </p>
            </div>
          </div>
          <button className="plan-custom-btn" onClick={() => navigate("/customize")}>
            Customize Plan
          </button>
        </div>
      </div>
    </section>
  );
};

export default Plans;
