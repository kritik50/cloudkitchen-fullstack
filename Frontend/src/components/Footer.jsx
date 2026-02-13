import React from 'react';
// import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* BRAND COLUMN */}
        <div className="footer-brand">
          <h3 className="footer-logo">Gym<span>Bites</span></h3>
          <p className="footer-tagline">
            We cook, you lift. Premium meal prep service designed for athletes, 
            bodybuilders, and fitness enthusiasts in Hyderabad.
          </p>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="footer-links">
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li>Home</li>
              <li>Our Menu</li>
              <li>Meal Plans</li>
              <li>Transformation Stories</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li>About Us</li>
              <li>Contact Support</li>
              <li>FAQs</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li className="contact-info">📍 Hyderabad, India</li>
              <li className="contact-info">📧 support@gymbites.in</li>
              <li className="contact-info">📞 +91 98765 43210</li>
            </ul>
          </div>
        </div>
      
      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} GymBites. Clean Fuel ⚡</p>
      </div>
    </footer>
  );
};

export default Footer;