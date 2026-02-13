import React from 'react';
// import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      
      {/* LEFT: Logo */}
      <div className="nav-left">
        <div className="logo-wrap">
          {/* Split for color styling */}
          <h2 className="logo">Gym<span>Bites</span></h2>
          <span className="tagline">Clean Fuel ⚡</span>
        </div>
      </div>

      {/* CENTER: Links */}
      <ul className="nav-center">
        <li className="active">Home</li>
        <li>Menu</li>
        <li>Meal Plans</li>
        <li>About</li>
      </ul>

      {/* RIGHT: CTA */}
      <div className="nav-right">
        <button className="order-btn">Order Now</button>
      </div>
      
    </nav>
  );
};

export default Navbar;