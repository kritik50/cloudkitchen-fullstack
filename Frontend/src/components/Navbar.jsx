import { useState, useEffect } from "react";

const links = ["Home", "Menu", "Meal Plans", "About"];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nb${scrolled ? " nb--scrolled" : ""}`}>

      {/* Logo */}
      <a className="nb-logo" href="#">
        <span className="nb-logo-wordmark">
          Gym<em>Bites</em>
        </span>
        <span className="nb-logo-sub">Cloud Kitchen</span>
      </a>

      {/* Nav Links */}
      <ul className="nb-links">
        {links.map((link) => (
          <li key={link}>
            <button
              className={active === link ? "nb-link nb-link--active" : "nb-link"}
              onClick={() => setActive(link)}
            >
              {link}
            </button>
          </li>
        ))}
      </ul>

      {/* Right Cluster */}
      <div className="nb-right">

        {/* Macro Badge */}
        <div className="macro-badge">
          <div className="macro-item">
            <span className="macro-val">42g</span>
            <span className="macro-lbl">Protein</span>
          </div>
          <div className="macro-sep" />
          <div className="macro-item">
            <span className="macro-val">520</span>
            <span className="macro-lbl">Kcal</span>
          </div>
          <div className="macro-sep" />
          <div className="macro-item">
            <span className="macro-val">8g</span>
            <span className="macro-lbl">Fat</span>
          </div>
        </div>

        <button className="order-btn">Order Now</button>
      </div>

    </nav>
  );
}
