import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MealCard from "../components/MealCard";
import { useAppContext } from "../context/AppContext";
import { fetchMenuItems } from "../services/menuApi";

export default function Menu() {
  const navigate = useNavigate();
  const { addToCart, cartItems, totals, auth, setAuthModalOpen, setPrompt } = useAppContext();
  const [items, setItems] = useState([]);
  const [active, setActive] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMenuItems()
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setError("Unable to load the menu right now."))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(items.map((item) => item.category).filter(Boolean))];
  const filtered = active === "All" ? items : items.filter((item) => item.category === active);

  return (
    <section className="menu-page">
      <div className="container">
        <div className="menu-page__header">
          <span className="eyebrow">Full menu</span>
          <h1 className="section-title">Choose meals by goal, not by guesswork.</h1>
          <p className="section-copy">
            Keep the browsing experience short: clear categories, visible macros, and checkout
            close enough that momentum does not drop.
          </p>
        </div>

        <div className="menu-page__layout">
          <div>
            <div className="menu-page__controls">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`filter-btn${active === category ? " filter-btn--active" : ""}`}
                  onClick={() => setActive(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {loading ? <p className="status-copy">Loading fresh meals...</p> : null}
            {error ? <p className="error-copy">{error}</p> : null}
            {!loading && !filtered.length ? (
              <p className="empty-copy">No meals match this filter right now.</p>
            ) : null}

            <div className="meal-grid">
              {filtered.map((meal) => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  onAdd={(item) => {
                    if (!auth.isAuthenticated) {
                      setPrompt({
                        open: true,
                        title: "Login / Register to continue",
                        message: "Sign in to add meals to your cart.",
                      });
                      setAuthModalOpen(true);
                      return;
                    }

                    addToCart({
                      id: item.id,
                      name: item.name,
                      category: item.category,
                      price: item.price,
                      quantity: 1,
                    });
                  }}
                />
              ))}
            </div>
          </div>

          <aside className="menu-page__summary">
            <h3>Your order flow</h3>
            <p>
              This page should help people decide quickly, then move them into checkout without
              requiring extra route-hopping.
            </p>

            <div className="summary-list">
              <div className="summary-list__item">
                <span>Items in cart</span>
                <span>{cartItems.reduce((sum, item) => sum + Number(item.quantity), 0)}</span>
              </div>
              <div className="summary-list__item">
                <span>Subtotal</span>
                <span>INR {totals.subtotal}</span>
              </div>
              <div className="summary-list__item">
                <span>Delivery</span>
                <span>INR {totals.deliveryFee}</span>
              </div>
            </div>

            <div className="menu-page__summary-footer" style={{ marginTop: 20 }}>
              <span className="plan-card__price">INR {totals.grandTotal}</span>
              <button
                className="btn btn--primary"
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
                Go to Checkout
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
