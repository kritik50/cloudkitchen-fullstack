import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";


export default function Navbar({ data, openModal }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!data) return null;

  return (
    <nav className={`nb${scrolled ? " nb--scrolled" : ""}`}>

      {/* Logo */}
      <Link to="/" className="nb-logo">
        <span className="nb-logo-wordmark">{data.brand.name}</span>
        <span className="nb-logo-sub">{data.brand.tagline}</span>
      </Link>

      {/* Center links — absolutely centered via CSS */}
      <ul className="nb-links">
        {data.links.map((link) => (
          <li key={link.label}>
            {link.label === "Contact Us" ? (
              <button className="nb-link" onClick={openModal}>
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

      {/* Right: macro badge + CTA */}
      <div className="nb-right">
        <div className="macro-badge">
          {data.marcos?.map((marco, i) => (
            <React.Fragment key={marco.label}>
              <div className="macro-item">
                <span className="macro-val">{marco.value}</span>
                <span className="macro-lbl">{marco.label}</span>
              </div>
              {i < data.marcos.length - 1 && <div className="macro-sep" />}
            </React.Fragment>
          ))}
        </div>

        <button className="order-btn" onClick={openModal}>
          {data.cta.text}
        </button>
      </div>

    </nav>
  );
}