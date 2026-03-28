import React, { useState } from "react";
import "./ContactModal.css";

const BASE_URL = import.meta.env.VITE_API_URL;

const EMPTY_FORM = {
  name: "",
  phone: "",
  email: "",
  goal: "Fat Loss",
  message: "",

  // 🔥 custom fields
  dietType: "",
  weight: "",
  height: "",
  mealsPerDay: "",
  budget: ""
};

export default function ContactModal({ isOpen, onClose }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const isCustom = form.goal === "Custom Plan";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleClose = () => {
    setSuccess(false);
    setError("");
    setForm(EMPTY_FORM);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone) {
      setError("Name and Phone are required");
      return;
    }

    // 🔥 extra validation for custom
    if (isCustom) {
      if (!form.dietType || !form.weight || !form.height) {
        setError("Please fill all custom plan details");
        return;
      }
    }

    try {
      setLoading(true);

      const endpoint = isCustom
        ? `${BASE_URL}/api/custom-plan`
        : `${BASE_URL}/api/contact`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setSuccess(true);

    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to submit. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cm-overlay" onClick={handleClose}>
      <div className="cm-modal" onClick={(e) => e.stopPropagation()}>

        <button className="cm-close" onClick={handleClose}>✕</button>

        {!success ? (
          <>
            <h2 className="cm-title">
              {isCustom ? "Build Your Custom Plan" : "Start Your Meal Plan"}
            </h2>

            <p className="cm-sub">
              We'll contact you within 30 minutes
            </p>

            <form className="cm-form" onSubmit={handleSubmit}>

              {error && <div className="cm-error">{error}</div>}

              {/* BASIC */}
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                value={form.name}
                onChange={handleChange}
                className="cm-input"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={form.phone}
                onChange={handleChange}
                className="cm-input"
              />

              <input
                type="email"
                name="email"
                placeholder="Email (optional)"
                value={form.email}
                onChange={handleChange}
                className="cm-input"
              />

              {/* GOALS */}
              <div className="cm-goals">
                {["Fat Loss", "Muscle Gain", "Maintenance", "Custom Plan"].map((g) => (
                  <button
                    type="button"
                    key={g}
                    className={`cm-goal ${form.goal === g ? "active" : ""}`}
                    onClick={() => setForm({ ...form, goal: g })}
                  >
                    {g}
                  </button>
                ))}
              </div>

              {/* 🔥 CUSTOM PLAN SECTION */}
              {isCustom && (
                <div className="cm-custom">

                  <div className="cm-divider">
                    ✨ Customize Your Plan
                  </div>

                  {/* DIET */}
                  <div className="cm-goals">
                    {["Veg", "Non-Veg"].map((d) => (
                      <button
                        type="button"
                        key={d}
                        className={`cm-goal ${form.dietType === d ? "active" : ""}`}
                        onClick={() => setForm({ ...form, dietType: d })}
                      >
                        {d}
                      </button>
                    ))}
                  </div>

                  {/* WEIGHT + HEIGHT */}
                  <div className="cm-row">
                    <input
                      type="number"
                      name="weight"
                      placeholder="Weight (kg)"
                      value={form.weight}
                      onChange={handleChange}
                      className="cm-input"
                    />

                    <input
                      type="number"
                      name="height"
                      placeholder="Height (cm)"
                      value={form.height}
                      onChange={handleChange}
                      className="cm-input"
                    />
                  </div>

                  {/* MEALS */}
                  <div className="cm-goals">
                    {[2, 3, 4].map((m) => (
                      <button
                        type="button"
                        key={m}
                        className={`cm-goal ${form.mealsPerDay === m ? "active" : ""}`}
                        onClick={() => setForm({ ...form, mealsPerDay: m })}
                      >
                        {m} Meals
                      </button>
                    ))}
                  </div>

                  {/* BUDGET */}
                  <div className="cm-goals">
                    {["1500", "2000", "3000+"].map((b) => (
                      <button
                        type="button"
                        key={b}
                        className={`cm-goal ${form.budget === b ? "active" : ""}`}
                        onClick={() => setForm({ ...form, budget: b })}
                      >
                        ₹{b}
                      </button>
                    ))}
                  </div>

                </div>
              )}

              {/* MESSAGE */}
              <textarea
                name="message"
                placeholder="Anything specific?"
                value={form.message}
                onChange={handleChange}
                className="cm-textarea"
              />

              <div className="cm-actions">
                <button type="submit" className="cm-submit" disabled={loading}>
                  {loading ? "Sending..." : isCustom ? "Get My Custom Plan 🚀" : "Start My Plan 🚀"}
                </button>

                <a href="tel:+919999999999" className="cm-call">
                  Call Now
                </a>
              </div>

            </form>
          </>
        ) : (
          <div className="cm-success">
            <h2>✅ Request Sent</h2>
            <p>
              {isCustom
                ? "Your custom plan is being prepared"
                : "We'll contact you shortly"}
            </p>
            <button onClick={handleClose}>Close</button>
          </div>
        )}

      </div>
    </div>
  );
}