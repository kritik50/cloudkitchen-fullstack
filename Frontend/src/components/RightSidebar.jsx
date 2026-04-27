import { useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function RightSidebar() {
  const {
    sidebarOpen,
    setSidebarOpen,
    auth,
    addresses,
    activeAddress,
    addAddress,
    removeAddress,
    setPrimaryAddress,
    logoutUser,
    theme,
    toggleTheme,
  } = useAppContext();
  const [draft, setDraft] = useState({
    label: "New Address",
    line1: "",
    line2: "",
  });
  const [addressFormOpen, setAddressFormOpen] = useState(false);
  const [busyAddressId, setBusyAddressId] = useState(null);
  const [addressError, setAddressError] = useState("");

  if (!sidebarOpen) return null;

  const close = () => setSidebarOpen(false);

  const submitAddress = async (event) => {
    event.preventDefault();
    setAddressError("");
    if (!draft.line1.trim()) return;
    const next = await addAddress({
      label: draft.label.trim() || "Address",
      line1: draft.line1.trim(),
      line2: draft.line2.trim(),
    });
    await setPrimaryAddress(next.id);
    setDraft({ label: "New Address", line1: "", line2: "" });
    setAddressFormOpen(false);
  };

  const deleteAddress = async (addressId) => {
    try {
      setBusyAddressId(addressId);
      setAddressError("");
      await removeAddress(addressId);
    } catch (error) {
      setAddressError(error?.message || "Unable to delete address right now.");
    } finally {
      setBusyAddressId(null);
    }
  };

  return (
    <div className="drawer-overlay" role="presentation" onClick={close}>
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Profile and saved addresses"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="drawer__head">
          <div className="drawer__identity">
            <span className="eyebrow">Profile</span>
            <h2 className="drawer__title">{auth.name || "GymBites member"}</h2>
            <p className="drawer__copy">{auth.email || auth.phone || "Signed in account"}</p>
          </div>
          <div className="drawer__head-actions">
            <button
              className="icon-btn drawer-theme-btn"
              type="button"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              <i className={theme === "dark" ? "ri-sun-line" : "ri-moon-line"} />
            </button>
            <button className="icon-btn" type="button" onClick={close} aria-label="Close sidebar">
              x
            </button>
          </div>
        </div>

        <div className="drawer__content">
          <div className="drawer__section">
            <h3>Saved addresses</h3>
            <div className="drawer-list">
              {addresses.length ? (
                addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`drawer-card${activeAddress?.id === address.id ? " drawer-card--active" : ""}`}
                  >
                    <button
                      type="button"
                      className="drawer-card__select"
                      onClick={() => setPrimaryAddress(address.id)}
                    >
                      <strong>{address.label}</strong>
                      <span>{address.line1}</span>
                      {address.line2 ? <span>{address.line2}</span> : null}
                    </button>
                    <button
                      type="button"
                      className="drawer-card__delete"
                      onClick={() => deleteAddress(address.id)}
                      aria-label={`Delete ${address.label} address`}
                      disabled={busyAddressId === address.id}
                    >
                      {busyAddressId === address.id ? "..." : "Delete"}
                    </button>
                  </div>
                ))
              ) : (
                <p className="status-copy">No saved addresses yet.</p>
              )}
            </div>
          </div>

          <div className="drawer__section">
            <div className="drawer__section-title">
              <h3>Add new address</h3>
              <button
                type="button"
                className="drawer-add-toggle"
                aria-expanded={addressFormOpen}
                aria-label={addressFormOpen ? "Collapse address form" : "Expand address form"}
                onClick={() => setAddressFormOpen((prev) => !prev)}
              >
                {addressFormOpen ? "-" : "+"}
              </button>
            </div>
            {addressFormOpen ? (
              <form className="auth-form" onSubmit={submitAddress}>
                <input
                  className="form-input"
                  placeholder="Label"
                  value={draft.label}
                  onChange={(event) => setDraft({ ...draft, label: event.target.value })}
                />
                <input
                  className="form-input"
                  placeholder="Address line 1"
                  value={draft.line1}
                  onChange={(event) => setDraft({ ...draft, line1: event.target.value })}
                />
                <input
                  className="form-input"
                  placeholder="Address line 2"
                  value={draft.line2}
                  onChange={(event) => setDraft({ ...draft, line2: event.target.value })}
                />
                <button className="btn btn--secondary" type="submit">
                  Save Address
                </button>
              </form>
            ) : null}
          </div>
          {addressError ? <p className="error-copy">{addressError}</p> : null}
        </div>

        <button className="drawer__logout btn btn--ghost" type="button" onClick={logoutUser}>
          Logout
        </button>
      </aside>
    </div>
  );
}
