import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Checkout() {
  const {
    cartItems,
    totals,
    removeFromCart,
    updateCartQty,
    profile,
    auth,
    hasDeliveryAddress,
    activeAddress,
    setAuthModalOpen,
    setPrompt,
    placeOrder: submitOrder,
  } = useAppContext();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const placeOrder = async () => {
    if (!auth.isAuthenticated) {
      setPrompt({
        open: true,
        title: "Login / Register to continue",
        message: "Please sign in before checkout.",
      });
      setAuthModalOpen(true);
      return;
    }

    if (!hasDeliveryAddress) {
      setPrompt({
        open: true,
        title: "Add delivery address to continue",
        message: "Your account is active, but we need one saved address before ordering.",
      });
      setAuthModalOpen(true);
      return;
    }

    if (!profile.name || !profile.phone) {
      setError("Please update your profile details before placing the order.");
      return;
    }

    if (!cartItems.length) {
      setError("Your cart is empty.");
      return;
    }

    setError("");
    setPlacing(true);

    try {
      const orderId = await submitOrder({ notes: "Order placed from checkout" });
      navigate(`/orders?orderId=${orderId}`);
    } catch (apiError) {
      setError(apiError.message || "Failed to place order.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <section className="checkout-page">
      <div className="container">
        <div className="checkout-page__header">
          <span className="eyebrow">Checkout</span>
          <h1 className="section-title checkout-page__title">Review and place your order</h1>
          <p className="section-copy">
            Quick summary first. Delivery details stay compact so checkout remains fast.
          </p>
        </div>

        <div className="checkout-page__layout">
          <div className="checkout-panel checkout-panel--compact">
            <h2 className="checkout-panel__title">Delivery details</h2>
            <p className="checkout-panel__copy">
              Pulled from your profile sidebar selection.
            </p>

            <div className="checkout-panel__group checkout-panel__group--readonly">
              <div className="readonly-row">
                <span>Name</span>
                <strong>{profile.name || auth.name || "Not set"}</strong>
              </div>
              <div className="readonly-row">
                <span>Phone</span>
                <strong>{profile.phone || auth.phone || "Not set"}</strong>
              </div>
              <div className="readonly-row">
                <span>Email</span>
                <strong>{profile.email || auth.email || "Not set"}</strong>
              </div>
              <div className="readonly-row">
                <span>Delivery address</span>
                <strong>{activeAddress?.line1 || "Add an address in profile drawer"}</strong>
              </div>
            </div>
          </div>

          <aside className="checkout-panel checkout-panel--summary">
            <h2 className="checkout-panel__title">Cart summary</h2>
            <p className="checkout-panel__copy">A clear summary keeps the last step calm and trustworthy.</p>

            <div className="checkout-list checkout-list--scroll">
              {cartItems.length === 0 ? <p className="empty-copy">No items added yet.</p> : null}

              {cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="cart-row">
                  <div>
                    <h3 className="cart-row__title">{item.name}</h3>
                    <div className="cart-row__meta">
                      <span className="chip">{item.category}</span>
                      <span className="chip">INR {item.unitPrice}</span>
                    </div>
                  </div>

                  <div>
                    <div className="cart-row__price">INR {Number(item.unitPrice) * Number(item.quantity)}</div>
                    <div className="checkout-panel__actions" style={{ marginTop: 10 }}>
                      <input
                        type="number"
                        min={1}
                        className="qty-input"
                        value={item.quantity}
                        onChange={(event) => updateCartQty(index, event.target.value)}
                      />
                      <button className="btn btn--secondary" type="button" onClick={() => removeFromCart(index)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-panel__totals">
              <div className="checkout-panel__totals-row">
                <span>Subtotal</span>
                <strong>INR {totals.subtotal}</strong>
              </div>
              <div className="checkout-panel__totals-row">
                <span>Delivery</span>
                <strong>INR {totals.deliveryFee}</strong>
              </div>
              <div className="checkout-panel__totals-row">
                <span>Grand total</span>
                <strong>INR {totals.grandTotal}</strong>
              </div>
            </div>

            {error ? <p className="error-copy">{error}</p> : null}

            <div className="checkout-panel__actions" style={{ marginTop: 20 }}>
              <button className="btn btn--ghost" type="button" onClick={() => navigate("/menu")}>
                Add More Meals
              </button>
              <button className="btn btn--primary" type="button" onClick={placeOrder} disabled={placing}>
                {placing ? "Placing..." : "Place Order"}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
