import React from "react";
import "./Swiper.css";

import Balanced from "../assets/Balanced.jpg";
import Fatloss from "../assets/Fatloss.jpg";
import Mgain from "../assets/Mgain.jpg";
import VegFLoss from "../assets/VegFLoss.jpg";

const meals = [
  { img: Balanced, name: "Grilled Chicken Bowl", protein: "42g", cals: "420 kcal", desc: "Lean grilled chicken breast with brown rice and steamed broccoli." },
  { img: VegFLoss, name: "Paneer Power Bowl", protein: "35g", cals: "480 kcal", desc: "Low-fat paneer cubes tossed in spices with quinoa and spinach." },
  { img: Mgain, name: "Egg & Rice Combo", protein: "30g", cals: "400 kcal", desc: "3 boiled eggs, basmati rice, and a side of roasted chickpeas." },
  { img: Fatloss, name: "Chicken Salad", protein: "38g", cals: "350 kcal", desc: "Shredded chicken, mixed greens, cherry tomatoes, and olive dressing." },
];

const MealCarousel = () => {
  // Triple the array to ensure smooth infinite scrolling without gaps
  const carouselMeals = [...meals, ...meals, ...meals];

  return (
    <section className="meals-section">
      <h2 className="meals-title">Fuel Your <span>Gains</span></h2>
      <p className="meals-subtitle">
        Macro-perfect meals. No prep. Just heat and eat.
      </p>

      <div className="marquee">
        <div className="marquee-track">
          {carouselMeals.map((meal, index) => (
            <div key={index} className="meal-wrapper">
              {/* Floating Protein Badge */}
              <div className="protein-badge">
                {meal.protein} Protein
              </div>

              <img src={meal.img} alt={meal.name} />
              
              <div className="overlay">
                <div className="meal-info">
                  <h4>{meal.name}</h4>
                  <p className="macros">⚡ {meal.cals} • Low Carb</p>
                  <p className="desc">{meal.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MealCarousel;