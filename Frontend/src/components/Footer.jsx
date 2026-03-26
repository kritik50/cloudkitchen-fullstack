// components/Footer.jsx
import React from "react";
const iconMap = {
  instagram: "ri-instagram-fill",
  whatsapp:  "ri-whatsapp-line",
  twitter:   "ri-twitter-x-line",
};

const Footer = ({ data }) => {
  const year = new Date().getFullYear();

  // Footer is below the fold — if data isn't ready, render nothing silently
  if (!data) return null;

  return (
    <footer className="footer">
      <div className="footer-accent-line" />

      <div className="footer-container">

        {/* Brand column */}
        <div className="footer-brand">
          <div className="footer-logo-wrap">
            <h3 className="footer-logo">{data.title}</h3>
            <span className="footer-logo-sub">Cloud Kitchen · Hyderabad</span>
          </div>
          <p className="footer-tagline">{data.subtitle}</p>

          <div className="footer-socials">
            {data.socials?.map((social) => {
              const iconClass = iconMap[social.platform?.toLowerCase()];
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  className="footer-social"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {iconClass && <i className={iconClass} />}
                </a>
              );
            })}
          </div>
        </div>

        {/* Link columns */}
        <div className="footer-links">
          {data.columns?.map((col) => (
            <div className="footer-col" key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links?.map((link) => (
                  <li key={link.text}>
                    <a href={link.path}>{link.text}</a>
                  </li>
                ))}
                {col.info?.map((item, i) => (
                  <li key={i} className="contact-info">{item}</li>
                ))}
              </ul>
              {col.title === "Contact" && data.cta && (
                <a href={data.cta.path} className="footer-order-btn">
                  {data.cta.text} →
                </a>
              )}
            </div>
          ))}
        </div>

      </div>

      <div className="footer-bottom">
        <p className="footer-copy">© {year} {data.title}. All rights reserved.</p>
        <p className="footer-made">{data.slogan}</p>
      </div>
    </footer>
  );
};

export default Footer;