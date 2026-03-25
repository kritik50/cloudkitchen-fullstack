import React from "react";
import "./Swiper.css";

import Balanced from "../assets/Balanced.jpg";
import Fatloss from "../assets/Fatloss.jpg";
import Mgain from "../assets/Mgain.jpg";
import VegFLoss from "../assets/VegFLoss.jpg";

const meals = [
  {
    img: Balanced,
    name: "Grilled Chicken Bowl",
    tag: "High Protein",
    protein: "42g",
    cals: "420",
    carbs: "38g",
    desc: "Lean grilled chicken breast with brown rice and steamed broccoli.",
  },
  {
    img: VegFLoss,
    name: "Paneer Power Bowl",
    tag: "Vegetarian",
    protein: "35g",
    cals: "480",
    carbs: "44g",
    desc: "Low-fat paneer cubes tossed in spices with quinoa and spinach.",
  },
  {
    img: Mgain,
    name: "Egg & Rice Combo",
    tag: "Muscle Gain",
    protein: "30g",
    cals: "400",
    carbs: "52g",
    desc: "3 boiled eggs, basmati rice, and a side of roasted chickpeas.",
  },
  {
    img: Fatloss,
    name: "Chicken Salad",
    tag: "Fat Loss",
    protein: "38g",
    cals: "350",
    carbs: "12g",
    desc: "Shredded chicken, mixed greens, cherry tomatoes, and olive dressing.",
  },
];

const MealCarousel = () => {
  const track = [...meals, ...meals, ...meals];

  return (
    <section className="meals-section">

      {/* Side fade masks */}
      <div className="meals-fade meals-fade--left" />
      <div className="meals-fade meals-fade--right" />

      {/* Header */}
      <div className="meals-header">
        <span className="meals-eyebrow">What's on the menu</span>
        <h2 className="meals-title">
          Fuel Your <em>Gains</em>
        </h2>
        <p className="meals-subtitle">
          Macro-perfect meals. No prep. Just heat and eat.
        </p>
      </div>

      {/* Marquee */}
      <div className="marquee">
        <div className="marquee-track">
          {track.map((meal, i) => (
            <div className="meal-card" key={i}>

              {/* Tag */}
              <span className="meal-tag">{meal.tag}</span>

              {/* Image */}
              <img src={meal.img} alt={meal.name} className="meal-img" />

              {/* Gradient overlay */}
              <div className="meal-overlay">
                <div className="meal-body">
                  <h4 className="meal-name">{meal.name}</h4>
                  <p className="meal-desc">{meal.desc}</p>

                  {/* Macro strip */}
                  <div className="meal-macros">
                    <div className="meal-macro">
                      <span className="meal-macro-val">{meal.protein}</span>
                      <span className="meal-macro-lbl">Protein</span>
                    </div>
                    <div className="meal-macro-sep" />
                    <div className="meal-macro">
                      <span className="meal-macro-val">{meal.cals}</span>
                      <span className="meal-macro-lbl">Kcal</span>
                    </div>
                    <div className="meal-macro-sep" />
                    <div className="meal-macro">
                      <span className="meal-macro-val">{meal.carbs}</span>
                      <span className="meal-macro-lbl">Carbs</span>
                    </div>
                  </div>
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