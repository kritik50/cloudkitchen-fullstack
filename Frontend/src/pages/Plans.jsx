import { useEffect, useState } from "react";
import BASE_URL from "../services/api";
import PlanCard from "../pages/PlanCard";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/mealPlans`);
        const data = await res.json();
        setPlans(data);
      } catch (err) {
        console.error("Error fetching plans:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const toggleCard = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  if (loading) return <p>Loading plans...</p>;

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

        {/* Customize Card */}
        <div
          className="plan-card plan-card--custom"
          onClick={() => window.location.href = "/customize"}
        >
          <h2>Customize ⚡</h2>
          <p>Build your own meal plan based on your goals</p>
        </div>
      </div>
    </section>
  );
};

export default Plans;