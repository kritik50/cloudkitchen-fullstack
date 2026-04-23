import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { createOrder } from "../services/api";

export default function Checkout() {
  const {
    cartItems,
    totals,
    removeFromCart,
    updateCartQty,
    clearCart,
    profile,
    setProfile,
  } = useAppContext();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleProfileChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const placeOrder = async () => {
    if (!profile.name || !profile.phone || !profile.address) {
      setError("Please enter name, phone, and address before checkout.");
      return;
    }

    if (!cartItems.length) {
      setError("Your cart is empty.");
      return;
    }

    setError("");
    setPlacing(true);

    try {
      const order = await createOrder({
        customer: profile,
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          unitPrice: item.unitPrice,
          quantity: item.quantity,
          metadata: item.metadata,
        })),
        totals,
        notes: "Order placed from web checkout",
      });

      clearCart();
      navigate(`/orders?phone=${encodeURIComponent(profile.phone)}&orderId=${order.id}`);
    } catch (apiError) {
      setError(apiError.message || "Failed to place order.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <section className="plans-page">
      <div className="plans-header" style={{ marginBottom: "24px" }}>
        <span className="plans-eyebrow">Checkout</span>
        <h1 className="plans-title">
          Confirm <em>Order</em>
        </h1>
      </div>

      <div className="plans-grid" style={{ gridTemplateColumns: "1.2fr 0.8fr", maxWidth: "1200px" }}>
        <div className="plan-card" style={{ cursor: "default" }}>
          <h2 className="plan-card-title">Delivery Details</h2>

          <input
            className="cm-input"
            placeholder="Name"
            value={profile.name}
            onChange={(event) => handleProfileChange("name", event.target.value)}
          />
          <input
            className="cm-input"
            placeholder="Phone"
            value={profile.phone}
            onChange={(event) => handleProfileChange("phone", event.target.value)}
          />
          <input
            className="cm-input"
            placeholder="Email"
            value={profile.email}
            onChange={(event) => handleProfileChange("email", event.target.value)}
          />
          <textarea
            className="cm-textarea"
            placeholder="Delivery Address"
            value={profile.address}
            onChange={(event) => handleProfileChange("address", event.target.value)}
          />
        </div>

        <div className="plan-card" style={{ cursor: "default" }}>
          <h2 className="plan-card-title">Cart Summary</h2>

          {cartItems.length === 0 ? <p className="plan-card-desc">No items added yet.</p> : null}

          {cartItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="plan-meal-row">
              <div>
                <div className="plan-meal-lbl">{item.name}</div>
                <div className="plan-meal-val">INR {item.unitPrice}</div>
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  className="cm-input"
                  style={{ width: "72px" }}
                  onChange={(event) => updateCartQty(index, event.target.value)}
                />
                <button className="menu-btn" onClick={() => removeFromCart(index)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="plan-divider" />
          <div className="plan-meal-row">
            <span className="plan-meal-lbl">Subtotal</span>
            <span className="plan-meal-val">INR {totals.subtotal}</span>
          </div>
          <div className="plan-meal-row">
            <span className="plan-meal-lbl">Delivery</span>
            <span className="plan-meal-val">INR {totals.deliveryFee}</span>
          </div>
          <div className="plan-meal-row">
            <span className="plan-meal-lbl">Grand Total</span>
            <span className="plan-meal-val">INR {totals.grandTotal}</span>
          </div>

          {error ? <p style={{ color: "#f87171" }}>{error}</p> : null}
          <button className="plan-custom-btn" onClick={placeOrder} disabled={placing}>
            {placing ? "Placing..." : "Place Order"}
          </button>
        </div>
      </div>
    </section>
  );
}
