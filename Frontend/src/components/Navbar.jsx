import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ data, openModal }) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!data) return null;

  return (
    <nav className={`nb${scrolled ? " nb--scrolled" : ""}`}>

      <Link to="/" className="nb-logo">
        <span className="nb-logo-wordmark">{data.brand.name}</span>
        <span className="nb-logo-sub">{data.brand.tagline}</span>
      </Link>

      <ul className="nb-links">
        {data.links.map((link) => (
          <li key={link.label}>
            {link.label === "Contact Us" ? (
              <button
                className="nb-link"
                onClick={openModal}
              >
                {link.label}
              </button>
            ) : (
              <Link
                to={link.path}
                className={
                  location.pathname === link.path
                    ? "nb-link nb-link--active"
                    : "nb-link"
                }
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>

      <div className="nb-right">
        <div className="macro-badge">
          {data.marcos?.map((marco, i) => (
            <div className="macro-item" key={marco.label}>
              <span className="macro-val">{marco.value}</span>
              <span className="macro-lbl">{marco.label}</span>
              {i < data.marcos.length - 1 && <div className="macro-sep" />}
            </div>
          ))}
        </div>

        {/* 🔥 ORDER BUTTON ALSO OPENS MODAL */}
        <button
          className="order-btn"
          onClick={openModal}
        >
          {data.cta.text}
        </button>
      </div>

    </nav>
  );
}