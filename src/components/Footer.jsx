import React, { useEffect, useState } from "react";
import BASE_URL from "../services/api";

const Footer = () => {
  const [data, setData] = useState(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/homepage/foo`);
        const json = await res.json();

        // If backend returns { success: true, data: {...} }
        // then use: setData(json.data)
        setData(json);
      } catch (err) {
        console.error("Error fetching footer:", err);
      }
    };

    fetchFooter();
  }, []);

  if (!data) return <p>Loading......</p>;

  const iconMap = {
    instagram: "ri-instagram-fill",
    whatsapp: "ri-whatsapp-line",
    twitter: "ri-twitter-x-line",
  };

  return (
    <footer className="footer">
      {/* <link
  href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
  rel="stylesheet"
/> */}
      <div className="footer-accent-line" />

      <div className="footer-container">
        {/* BRAND COLUMN */}
        <div className="footer-brand">
          <div className="footer-logo-wrap">
            <h3 className="footer-logo">{data.title}</h3>
            <span className="footer-logo-sub">Cloud Kitchen · Hyderabad</span>
          </div>

          <p className="footer-tagline">{data.subtitle}</p>

          <div className="footer-socials">
            {data.socials?.map((social) => {
              const key = social.platform?.toLowerCase();
              const iconClass = iconMap[key];

              return (
                <a
                  key={social.platform}
                  href={social.url}
                  className="footer-social"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {iconClass && <i className={iconClass}></i>}
                </a>
              );
            })}
          </div>
        </div>

        {/* LINKS COLUMNS */}
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
                  <li key={i} className="contact-info">
                    {item}
                  </li>
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
        <p className="footer-copy">
          © {year} {data.title}. All rights reserved.
        </p>
        <p className="footer-made">{data.slogan}</p>
      </div>
    </footer>
  );
};

export default Footer;
