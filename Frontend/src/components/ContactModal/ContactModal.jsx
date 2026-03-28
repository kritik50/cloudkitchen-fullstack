import React, { useState } from "react";
import "./ContactModal.css";

const BASE_URL = import.meta.env.VITE_API_URL;

const EMPTY_FORM = {
  name: "",
  phone: "",
  email: "",
  goal: "Fat Loss",
  message: ""
};

export default function ContactModal({ isOpen, onClose }) {
  const [form,    setForm]    = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // ✅ Reset ALL state on close — form is fresh every time it opens
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

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/api/contact`, {
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

        {/* ✅ handleClose instead of onClose so state resets */}
        <button className="cm-close" onClick={handleClose}>✕</button>

        {!success ? (
          <>
            <h2 className="cm-title">Start Your Meal Plan</h2>
            <p className="cm-sub">We'll contact you within 30 minutes</p>

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
                <a href="tel:+919999999999" className="cm-call">Call Now</a>
              </div>

            </form>
          </>
        ) : (
          <div className="cm-success">
            <h2>✅ Request Sent</h2>
            <p>We'll contact you shortly</p>
            {/* ✅ handleClose resets so next open shows the form again */}
            <button onClick={handleClose}>Close</button>
          </div>
        )}

      </div>
    </div>
  );
}