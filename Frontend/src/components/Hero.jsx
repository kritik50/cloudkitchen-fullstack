import { useEffect, useState } from "react";
import bowl from "../assets/bowl.jpg";
import BASE_URL from "../services/api";

// import './Hero.css'; 
const Hero = () => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/homepage/hero`)
      .then((res) => res.json())
      .then((data) => setHero(data))
      .catch(console.error);
  }, []);

  // While loading, you might want a simple loader or return null
  if (!hero) return null;

  return (
    <section className="hero">
      <div className="hero-container">
        
        {/* Left Side: Content */}
        <div className="hero-content">
          {/* I added a span around "Goals" or key words if your API supports it, 
              otherwise standard text is fine */}
          <h1>
            {hero.title || "Clean Meals That Hit Your Goals"}
          </h1>
          <p>{hero.subtitle}</p>

          <div className="hero-buttons">
            <button className="primary-btn">{hero.ctaPrimary || "View Menu"}</button>
            <button className="secondary-btn">{hero.ctaSecondary || "Custom Plan"}</button>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="hero-image-wrapper">
          <img src={bowl} alt="High protein meal" className="hero-image-main" />
          
          {/* This is the badge that sells the "Gym" aspect */}
          <div className="floating-badge">
            <span className="dot"></span>
            <span>High Protein: 45g</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;