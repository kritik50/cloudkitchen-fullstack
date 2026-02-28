import { useState, useEffect } from "react";
import BASE_URL from "../services/api";

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [navbar, setNavbar] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fetchNavbar = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/homepage/nav`);
        const data = await response.json();
        setNavbar(data);
      } catch (error) {
        console.error("Error fetching navbar:", error);
      }
    };

    fetchNavbar();
  }, []);

  if (!navbar) return null;

  return (
    <nav className={`nb${scrolled ? " nb--scrolled" : ""}`}>
      <a className="nb-logo">
        <span className="nb-logo-wordmark">{navbar.brand.name}</span>
        <span className="nb-logo-sub">{navbar.brand.tagline}</span>
      </a>

      <ul className="nb-links">
        {navbar.links.map((link) => (
          <li key={link.label}>
            <button
              className={
                active === link.label ? "nb-link nb-link--active" : "nb-link"
              }
              onClick={() => setActive(link.label)}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="nb-right">
        <div className="macro-badge">
          {navbar.marcos.map((marcos) => (
            <div className="macro-item" key={marcos.label}>
              <span className="macro-val">{marcos.value}</span>
              <span className="macro-lbl">{marcos.label}</span>
            </div>
          ))}
        </div>

        <div className="nb-right">
          <button className="order-btn">{navbar.cta.text}</button>
        </div>
      </div>
    </nav>
  );
}
