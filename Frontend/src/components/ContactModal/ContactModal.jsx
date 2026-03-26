import React, { useState } from "react";
import "./ContactModal.css";

export default function ContactModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    goal: "Fat Loss",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(""); // ✅ NEW

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // ✅ clear error while typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone) {
      setError("Name and Phone are required"); // ✅ replaced alert
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSuccess(true);

      setForm({
        name: "",
        phone: "",
        email: "",
        goal: "Fat Loss",
        message: ""
      });

    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to submit. Try again."); // ✅ clean error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cm-overlay" onClick={onClose}>
      <div className="cm-modal" onClick={(e) => e.stopPropagation()}>

        <button className="cm-close" onClick={onClose}>✕</button>

        {!success ? (
          <>
            <h2 className="cm-title">Start Your Meal Plan</h2>
            <p className="cm-sub">We’ll contact you within 30 minutes</p>

            <form className="cm-form" onSubmit={handleSubmit}>

              {/* ✅ ERROR UI */}
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

              <textarea
                name="message"
                placeholder="Anything specific?"
                value={form.message}
                onChange={handleChange}
                className="cm-textarea"
              />

              <div className="cm-actions">
                <button type="submit" className="cm-submit" disabled={loading}>
                  {loading ? "Sending..." : "Start My Plan 🚀"}
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
            <p>We’ll contact you shortly</p>
            <button onClick={onClose}>Close</button>
          </div>
        )}

      </div>
    </div>
  );
}