import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { fetchMenuItems } from "../services/menuApi";
import "./Menu.css";

export default function Menu() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuItems()
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setError("Unable to load menu right now."))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const fromItems = Array.from(new Set(items.map((item) => item.category)));
    return ["All", ...fromItems];
  }, [items]);

  const filtered =
    active === "All" ? items : items.filter((item) => item.category === active);

  return (
    <div className="menu">
      <h1 className="menu-title">CloudKitchen Menu</h1>

      <div className="menu-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`menu-tab ${active === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? <p>Loading menu...</p> : null}
      {error ? <p style={{ color: "var(--color-coral)" }}>{error}</p> : null}

      <div className="menu-grid">
        {filtered.map((item) => (
          <div key={item.id} className="menu-card">
            <img src={item.image} alt={item.name} className="menu-img" />

            <div className="menu-content">
              <h3>{item.name}</h3>

              <p className="menu-meta">
                {item.calories} kcal | {item.protein}g protein
              </p>

              <p
                className={`menu-stock ${
                  item.stock === 0 ? "out" : item.stock <= 3 ? "limited" : "in"
                }`}
              >
                {item.stock === 0
                  ? "Out of Stock"
                  : item.stock <= 3
                  ? "Limited Stock"
                  : "In Stock"}
              </p>

              <div className="menu-bottom">
                <span className="menu-price">INR {item.price}</span>

                <button
                  className="menu-btn"
                  disabled={item.stock === 0}
                  onClick={() =>
                    addToCart({
                      id: item.id,
                      name: item.name,
                      category: item.category,
                      price: item.price,
                      quantity: 1,
                    })
                  }
                >
                  {item.stock === 0 ? "Out" : "Add"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
        <button className="menu-btn" onClick={() => navigate("/plans")}>
          Choose Plan
        </button>
        <button className="menu-btn" onClick={() => navigate("/checkout")}>
          Go to Checkout
        </button>
      </div>
    </div>
  );
}
