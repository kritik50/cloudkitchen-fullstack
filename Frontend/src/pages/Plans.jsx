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

        if (Array.isArray(data)) {
          setPlans(data);
        } else {
          setPlans([]);
        }
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
      <h1 className="plans-title">Choose Your Plan</h1>

      <div className="plans-grid">
        {plans.map((plan, index) => (
          <PlanCard
            key={plan.id || index}
            plan={plan}
            isActive={activeIndex === index}
            onToggle={() => toggleCard(index)}
          />
        ))}

        <div className="plan-card plan-card--custom">
          <h2>Customize ⚡</h2>
          <p>Build your own meal plan based on your goals</p>
        </div>
      </div>
    </section>
  );
};

export default Plans;