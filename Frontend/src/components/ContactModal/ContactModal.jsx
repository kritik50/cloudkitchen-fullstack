import { useState } from "react";
import { submitContact, submitCustomPlan } from "../../services/api";
import "./ContactModal.css";

const EMPTY_FORM = {
  name: "",
  phone: "",
  email: "",
  goal: "Fat Loss",
  message: "",
  dietType: "",
  weight: "",
  height: "",
  mealsPerDay: "",
  budget: "",
};

export default function ContactModal({ isOpen, onClose }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const isCustom = form.goal === "Custom Plan";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleClose = () => {
    setSuccess(false);
    setError("");
    setForm(EMPTY_FORM);
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name || !form.phone) {
      setError("Name and phone are required.");
      return;
    }

    if (isCustom && (!form.dietType || !form.weight || !form.height)) {
      setError("Please complete diet, weight, and height for custom plans.");
      return;
    }

    try {
      setLoading(true);

      if (isCustom) {
        await submitCustomPlan(form);
      } else {
        await submitContact(form);
      }

      setSuccess(true);
    } catch (apiError) {
      setError(apiError.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cm-overlay" onClick={handleClose}>
      <div className="cm-modal" onClick={(event) => event.stopPropagation()}>
        <button className="cm-close" onClick={handleClose}>
          X
        </button>

        {!success ? (
          <>
            <h2 className="cm-title">
              {isCustom ? "Build Your Custom Plan" : "Start Your Meal Plan"}
            </h2>
            <p className="cm-sub">We will contact you quickly to confirm your request.</p>

            <form className="cm-form" onSubmit={handleSubmit}>
              {error && <div className="cm-error">{error}</div>}

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

              <div className="cm-goals">
                {["Fat Loss", "Muscle Gain", "Maintenance", "Custom Plan"].map((goal) => (
                  <button
                    type="button"
                    key={goal}
                    className={`cm-goal ${form.goal === goal ? "active" : ""}`}
                    onClick={() => setForm((prev) => ({ ...prev, goal }))}
                  >
                    {goal}
                  </button>
                ))}
              </div>

              {isCustom && (
                <div className="cm-custom">
                  <div className="cm-divider">Customize your plan</div>

                  <div className="cm-goals">
                    {["Veg", "Non-Veg"].map((dietType) => (
                      <button
                        type="button"
                        key={dietType}
                        className={`cm-goal ${form.dietType === dietType ? "active" : ""}`}
                        onClick={() => setForm((prev) => ({ ...prev, dietType }))}
                      >
                        {dietType}
                      </button>
                    ))}
                  </div>

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

                  <div className="cm-goals">
                    {[2, 3, 4].map((mealsPerDay) => (
                      <button
                        type="button"
                        key={mealsPerDay}
                        className={`cm-goal ${
                          Number(form.mealsPerDay) === mealsPerDay ? "active" : ""
                        }`}
                        onClick={() => setForm((prev) => ({ ...prev, mealsPerDay }))}
                      >
                        {mealsPerDay} Meals
                      </button>
                    ))}
                  </div>

                  <div className="cm-goals">
                    {["1500", "2000", "3000+"].map((budget) => (
                      <button
                        type="button"
                        key={budget}
                        className={`cm-goal ${form.budget === budget ? "active" : ""}`}
                        onClick={() => setForm((prev) => ({ ...prev, budget }))}
                      >
                        INR {budget}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <textarea
                name="message"
                placeholder="Anything specific?"
                value={form.message}
                onChange={handleChange}
                className="cm-textarea"
              />

              <div className="cm-actions">
                <button type="submit" className="cm-submit" disabled={loading}>
                  {loading ? "Sending..." : isCustom ? "Submit Custom Plan" : "Submit Request"}
                </button>
                <a href="tel:+919999999999" className="cm-call">
                  Call Now
                </a>
              </div>
            </form>
          </>
        ) : (
          <div className="cm-success">
            <h2>Request Sent</h2>
            <p>
              {isCustom
                ? "Your custom plan request has been submitted."
                : "Your request has been submitted successfully."}
            </p>
            <button onClick={handleClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
