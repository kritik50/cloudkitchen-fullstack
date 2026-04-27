import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bowl from "../assets/bowl.jpg";
import balanced from "../assets/Balanced.jpg";
import fatloss from "../assets/Fatloss.jpg";
import mgain from "../assets/Mgain.jpg";
import MealCard from "../components/MealCard";
import { useAppContext } from "../context/AppContext";
import { fetchMealPlans, fetchMenuItems } from "../services/api";

const fallbackMeals = [
  {
    id: "preview-1",
    name: "Smoked Chicken Power Bowl",
    description: "Lean chicken, herbed rice, greens, and recovery dressing.",
    category: "High Protein",
    protein: 42,
    carbs: 38,
    calories: 520,
    price: 289,
    stock: 8,
    image: bowl,
  },
  {
    id: "preview-2",
    name: "Paneer Strength Plate",
    description: "Charred paneer, millet, veggies, and mint yogurt.",
    category: "Vegetarian",
    protein: 31,
    carbs: 34,
    calories: 468,
    price: 269,
    stock: 5,
    image: balanced,
  },
  {
    id: "preview-3",
    name: "Salmon Cut Bowl",
    description: "Omega-rich salmon with sweet potato and crunchy greens.",
    category: "Fat Loss",
    protein: 36,
    carbs: 26,
    calories: 430,
    price: 349,
    stock: 4,
    image: fatloss,
  },
];

const fallbackPlans = [
  {
    id: "lean-cut",
    tag: "Most Popular",
    title: "Lean Cut Plan",
    shortDesc: "Low-friction calorie control for people training 3 to 5 days a week.",
    highlights: ["High protein", "Portion measured", "Fast lunch rotation"],
    price: { weekly: 1999, monthly: 7299 },
  },
  {
    id: "muscle-build",
    tag: "Gym Focused",
    title: "Muscle Build Plan",
    shortDesc: "Bigger portions, stronger recovery, and consistent protein intake.",
    highlights: ["45g+ protein meals", "Performance carbs", "Bulk-friendly"],
    price: { weekly: 2399, monthly: 8799 },
  },
  {
    id: "balanced-life",
    tag: "Lifestyle",
    title: "Balanced Everyday Plan",
    shortDesc: "For office-goers who want nutritious meals without tracking every gram.",
    highlights: ["Fresh ingredients", "Flexible menu", "Easy consistency"],
    price: { weekly: 1849, monthly: 6799 },
  },
];

const testimonials = [
  {
    quote:
      "I stopped skipping lunch after workouts because the macros are clear and the meals actually taste like food, not prep-box punishment.",
    name: "Rohan M.",
    meta: "Strength trainee, 5x/week",
    result: "Down 3.8 kg in 7 weeks",
  },
  {
    quote:
      "This feels premium. Clean packaging, fast delivery, and I don't have to guess if I'm overeating on cut days.",
    name: "Aditi S.",
    meta: "CrossFit member",
    result: "Consistency up every week",
  },
  {
    quote:
      "The weekly plan made healthy eating automatic. I open the app, add meals, and move on with my day.",
    name: "Nikhil P.",
    meta: "Corporate + evening gym",
    result: "Saved 6+ hours weekly",
  },
];

const trustSignals = [
  {
    metric: "<30 min",
    title: "Fast local dispatch",
    copy: "Priority zones get quick dispatch windows so lunch stays part of the routine.",
  },
  {
    metric: "100%",
    title: "Macro transparency",
    copy: "Protein, carbs, and calories stay visible on every featured meal and plan.",
  },
  {
    metric: "Fresh daily",
    title: "Hygiene and sourcing",
    copy: "Daily prep cycles, sealed packs, and ingredient-first communication build trust fast.",
  },
];

const faqs = [
  {
    title: "Do I need a subscription to order?",
    copy: "No. Single-meal ordering stays available, while plans are there for repeat buyers who want less decision fatigue.",
  },
  {
    title: "Can I choose veg and non-veg meals?",
    copy: "Yes. The menu can support both, but the homepage should surface the most relevant options instead of sending everyone through separate pages first.",
  },
  {
    title: "Why put plans on the homepage?",
    copy: "Because committed fitness buyers often decide between one meal now and a repeat plan. Showing both in one flow reduces drop-off.",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const { addToCart, setSelectedPlan, auth, setAuthModalOpen, setPrompt } = useAppContext();
  const [meals, setMeals] = useState(fallbackMeals);
  const [plans, setPlans] = useState(fallbackPlans);
  const [billingCycle, setBillingCycle] = useState("weekly");
  const [showQuickPrompt, setShowQuickPrompt] = useState(false);

  useEffect(() => {
    let live = true;

    fetchMenuItems()
      .then((data) => {
        if (!live || !Array.isArray(data) || data.length === 0) return;
        setMeals(data.slice(0, 3));
      })
      .catch(() => {});

    fetchMealPlans()
      .then((data) => {
        if (!live || !Array.isArray(data) || data.length === 0) return;
        setPlans(data.slice(0, 3));
      })
      .catch(() => {});

    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    const dismissedAt = Number(sessionStorage.getItem("gymbites_quick_prompt_dismissed_at") || 0);
    const now = Date.now();
    const cooldownMs = 15 * 60 * 1000;
    if (now - dismissedAt < cooldownMs) return;

    const timer = window.setTimeout(() => setShowQuickPrompt(true), 1600);
    return () => window.clearTimeout(timer);
  }, []);

  const handleAddMeal = (meal) => {
    if (!auth.isAuthenticated) {
      setPrompt({
        open: true,
        title: "Login / Register to continue",
        message: "Create an account to add meals to your cart.",
      });
      setAuthModalOpen(true);
      return;
    }

    addToCart({
      id: meal.id,
      name: meal.name,
      category: meal.category,
      price: meal.price,
      quantity: 1,
    });
  };

  const handleChoosePlan = (plan) => {
    if (!auth.isAuthenticated) {
      setPrompt({
        open: true,
        title: "Login / Register to continue",
        message: "Sign in to save your plan and continue checkout.",
      });
      setAuthModalOpen(true);
      return;
    }

    const selectedPrice = Number(plan?.price?.[billingCycle] || plan?.price?.weekly || 0);
    setSelectedPlan({ ...plan, billingCycle, selectedPrice });
    addToCart({
      id: `plan-${plan.id}-${billingCycle}`,
      name: `${plan.title} (${billingCycle})`,
      category: "Plan",
      price: selectedPrice,
      quantity: 1,
      metadata: { billingCycle, planId: plan.id },
    });
    navigate("/checkout");
  };

  const closeQuickPrompt = () => {
    sessionStorage.setItem("gymbites_quick_prompt_dismissed_at", String(Date.now()));
    setShowQuickPrompt(false);
  };

  return (
    <div className="app-shell">
      <section className="hero">
        <div className="container hero__panel">
          <div className="hero__content">
            <div className="hero__copy">
              <span className="pill hero__badge">Built for gym schedules and healthy routines</span>
              <h1 className="hero-title">
                Clean meals for <span>peak performance</span>.
              </h1>
              <p className="hero__text">
                GymBites helps people order protein-first meals fast, trust the macros,
                and stay consistent without turning lunch into a second job.
              </p>

              <div className="hero__actions">
                <a className="btn btn--primary" href="#meals">
                  Order Now
                </a>
                <button className="btn btn--ghost" type="button" onClick={() => navigate("/menu")}>
                  View Full Menu
                </button>
              </div>

              <div className="hero__metrics">
                <div className="metric">
                  <span className="metric__value">35g+</span>
                  <span className="metric__label">Protein-led core meals</span>
                </div>
                <div className="metric">
                  <span className="metric__value">520 avg</span>
                  <span className="metric__label">Calorie-controlled portions</span>
                </div>
                <div className="metric">
                  <span className="metric__value">7-day</span>
                  <span className="metric__label">Plans for routine builders</span>
                </div>
              </div>
            </div>

            <div className="hero__visual">
              <img className="hero__plate" src={mgain} alt="High protein plated meal" />
              <div className="hero__float hero__float--left">
                <strong>45g protein</strong>
                <span>Recovery-friendly lunch option</span>
              </div>
              <div className="hero__float hero__float--right">
                <strong>Delivered fresh</strong>
                <span>Built for lunch breaks and post-gym dinners</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container proof-strip">
          <div className="proof-card">
            <strong>Fast first decision</strong>
            <span>Meals, plans, and trust signals stay on one page instead of competing routes.</span>
          </div>
          <div className="proof-card">
            <strong>Macros shown early</strong>
            <span>Serious buyers care about protein and calories before they care about brand story.</span>
          </div>
          <div className="proof-card">
            <strong>Fresh by default</strong>
            <span>Prep quality, packaging, and delivery speed are surfaced like product features.</span>
          </div>
          <div className="proof-card">
            <strong>Checkout stays nearby</strong>
            <span>Sticky conversion prompts keep momentum once interest is high.</span>
          </div>
        </div>
      </section>

      <section className="section" id="why">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why this structure converts</span>
            <h2 className="section-title">Trust first, choices second, checkout always close.</h2>
            <p className="section-copy">
              Fitness users do not want a brochure. They want fast evidence that the food
              matches their goals, then they want a low-friction path to order.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-card__icon">P</div>
              <h3>High protein meals</h3>
              <p>
                Lead with the metric your core audience already uses to judge meal quality.
              </p>
            </article>
            <article className="feature-card">
              <div className="feature-card__icon">C</div>
              <h3>Calorie-controlled plans</h3>
              <p>
                Keep meal plans on the landing page so repeat buyers can commit without extra clicks.
              </p>
            </article>
            <article className="feature-card">
              <div className="feature-card__icon">F</div>
              <h3>Fresh ingredients and hygiene</h3>
              <p>
                Show prep trust signals next to the offer, not hidden in a separate informational page.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="meals">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Meal previews</span>
            <h2 className="section-title">Show the food like product, not decoration.</h2>
            <p className="section-copy">
              The homepage should preview high-intent meals with macros and pricing so users
              can begin ordering before they ever visit the full menu.
            </p>
          </div>

          <div className="meal-grid">
            {meals.map((meal) => (
              <MealCard key={meal.id} meal={meal} onAdd={handleAddMeal} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="plans">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Subscriptions and plans</span>
            <h2 className="section-title">Keep the repeat-purchase offer on the homepage.</h2>
            <p className="section-copy">
              Plans matter most to the most valuable customers. Hiding them on a separate page
              adds friction right when commitment is rising.
            </p>
          </div>

          <div className="menu-page__controls">
            {["weekly", "monthly"].map((cycle) => (
              <button
                key={cycle}
                type="button"
                className={`filter-btn${billingCycle === cycle ? " filter-btn--active" : ""}`}
                onClick={() => setBillingCycle(cycle)}
              >
                {cycle === "weekly" ? "Weekly pricing" : "Monthly pricing"}
              </button>
            ))}
          </div>

          <div className="plans-grid">
            {plans.map((plan, index) => (
              <article
                key={plan.id || plan.title}
                className={`plan-card${index === 1 ? " plan-card--featured" : ""}`}
              >
                <div className="plan-card__top">
                  <span className="plan-card__tag">{plan.tag || "Plan"}</span>
                  <span className="plan-card__price">
                    INR {plan?.price?.[billingCycle] || plan?.price?.weekly || plan?.price}
                  </span>
                </div>

                <div>
                  <h3 className="plan-card__title">{plan.title}</h3>
                  <p className="plan-card__copy">{plan.shortDesc}</p>
                </div>

                <div className="plan-card__chips">
                  {(plan.highlights || []).map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="plan-card__footer">
                  <span className="plan-card__note">
                    Best for {index === 0 ? "fat loss" : index === 1 ? "muscle gain" : "clean eating"}
                  </span>
                  <button className="btn btn--secondary" type="button" onClick={() => handleChoosePlan(plan)}>
                    Choose Plan
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Social proof</span>
            <h2 className="section-title">Reviews that speak to routines, not generic praise.</h2>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="testimonial-card">
                <span className="testimonial-card__result">{item.result}</span>
                <p>{item.quote}</p>
                <strong className="testimonial-card__name">{item.name}</strong>
                <span className="testimonial-card__meta">{item.meta}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Trust signals</span>
            <h2 className="section-title">Operational proof lowers hesitation.</h2>
          </div>

          <div className="trust-grid">
            {trustSignals.map((item) => (
              <article key={item.title} className="trust-card">
                <span className="trust-card__metric">{item.metric}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2 className="section-title">Answer objections without sending people away.</h2>
          </div>

          <div className="faq-grid">
            {faqs.map((item) => (
              <article key={item.title} className="faq-card">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {showQuickPrompt ? (
        <div className="quick-prompt-overlay" role="presentation" onClick={closeQuickPrompt}>
          <div className="quick-prompt" role="dialog" aria-modal="false" onClick={(event) => event.stopPropagation()}>
            <button className="icon-btn quick-prompt__close" type="button" onClick={closeQuickPrompt} aria-label="Close">
              x
            </button>
            <strong>Ready to order?</strong>
            <p>Open the menu or jump to cart in one tap.</p>
            <div className="quick-prompt__actions">
              <button className="btn btn--primary" type="button" onClick={() => navigate("/menu")}>
                View Menu
              </button>
              <button
                className="btn btn--secondary"
                type="button"
                onClick={() => {
                  if (!auth.isAuthenticated) {
                    setPrompt({
                      open: true,
                      title: "Login / Register to continue",
                      message: "Please sign in before checkout.",
                    });
                    setAuthModalOpen(true);
                    return;
                  }
                  navigate("/checkout");
                }}
              >
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
