import React from "react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const DEFAULT_NAV = {
  brand: {
    name: "CloudKitchen",
    tagline: "Smart Meal Subscription",
  },
};

const LINKS = [
  { label: "Home", path: "/" },
  { label: "Menu", path: "/menu" },
  { label: "Plans", path: "/plans" },
  { label: "Customize", path: "/customize" },
  { label: "Orders", path: "/orders" },
  { label: "Profile", path: "/profile" },
];

export default function Navbar({ data, openModal }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useAppContext();

  const navData = data || DEFAULT_NAV;
  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + Number(item.quantity), 0),
    [cartItems]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nb${scrolled ? " nb--scrolled" : ""}`}>
      <Link to="/" className="nb-logo">
        <span className="nb-logo-wordmark">{navData.brand?.name || "CloudKitchen"}</span>
        <span className="nb-logo-sub">{navData.brand?.tagline || "Meal Delivery"}</span>
      </Link>

      <ul className="nb-links">
        {LINKS.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={
                location.pathname === link.path ? "nb-link nb-link--active" : "nb-link"
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <button className="nb-link" onClick={() => openModal?.()}>
            Contact Us
          </button>
        </li>
      </ul>

      <div className="nb-right">
        <button className="order-btn" onClick={() => navigate("/checkout")}>
          Checkout {cartCount > 0 ? `(${cartCount})` : ""}
        </button>
      </div>
    </nav>
  );
}
