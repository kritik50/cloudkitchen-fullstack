// components/Navbar.jsx
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavbarSkeleton } from "./Skeletons";

export default function Navbar({ data }) {
  const [active, setActive]   = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!data) return <NavbarSkeleton />;

  return (
    <nav className={`nb${scrolled ? " nb--scrolled" : ""}`}>

      <Link to="/" className="nb-logo">
        <span className="nb-logo-wordmark">{data.brand.name}</span>
        <span className="nb-logo-sub">{data.brand.tagline}</span>
      </Link>

      <ul className="nb-links">
        {data.links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.path}
              className={active === link.label ? "nb-link nb-link--active" : "nb-link"}
              onClick={() => setActive(link.label)}
            >
              {link.label}
            </Link>
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
        <button className="order-btn" onClick={() => navigate(data.cta.path)}>
          {data.cta.text}
        </button>
      </div>

    </nav>
  );
}