import { useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function Profile() {
  const { profile, setProfile } = useAppContext();
  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setSaved(false);
    setProfile({ ...profile, [field]: value });
  };

  return (
    <section className="plans-page">
      <div className="plans-header" style={{ marginBottom: "24px" }}>
        <span className="plans-eyebrow">Profile</span>
        <h1 className="plans-title">
          Account <em>Details</em>
        </h1>
        <p className="plans-subtitle">Saved details are used for faster checkout.</p>
      </div>

      <div className="plan-card" style={{ maxWidth: "760px", margin: "0 auto", cursor: "default" }}>
        <input
          className="cm-input"
          value={profile.name}
          onChange={(event) => handleChange("name", event.target.value)}
          placeholder="Full Name"
        />
        <input
          className="cm-input"
          value={profile.phone}
          onChange={(event) => handleChange("phone", event.target.value)}
          placeholder="Phone"
        />
        <input
          className="cm-input"
          value={profile.email}
          onChange={(event) => handleChange("email", event.target.value)}
          placeholder="Email"
        />
        <textarea
          className="cm-textarea"
          value={profile.address}
          onChange={(event) => handleChange("address", event.target.value)}
          placeholder="Default Delivery Address"
        />
        <button
          className="plan-custom-btn"
          onClick={() => {
            setSaved(true);
          }}
        >
          Save Profile
        </button>
        {saved ? <p className="plan-note">Profile saved locally.</p> : null}
      </div>
    </section>
  );
}
