export default function MealCard({ meal, onAdd, compact = false }) {
  const stockClass =
    meal.stock === 0 ? "meal-card__stock meal-card__stock--out" : meal.stock <= 3
      ? "meal-card__stock meal-card__stock--low"
      : "meal-card__stock";

  return (
    <article className="meal-card">
      <img className="meal-card__image" src={meal.image} alt={meal.name} />

      <div className="meal-card__body">
        <div className="meal-card__top">
          <div>
            <h3 className="meal-card__title">{meal.name}</h3>
            <p className="meal-card__subtitle">
              {meal.description || meal.category || "Chef-built nutrition meal"}
            </p>
          </div>
          <span className="meal-card__price">INR {meal.price}</span>
        </div>

        <div className="meal-card__chips">
          <span className="chip">
            <strong>{meal.protein}g</strong> protein
          </span>
          <span className="chip">
            <strong>{meal.carbs ?? "--"}g</strong> carbs
          </span>
          <span className="chip">
            <strong>{meal.calories}</strong> kcal
          </span>
        </div>

        <div className="meal-card__footer">
          <span className={stockClass}>
            {meal.stock === 0
              ? "Currently sold out"
              : meal.stock <= 3
              ? "Selling fast"
              : compact
              ? meal.category
              : "Freshly prepped today"}
          </span>

          <button
            className="btn btn--primary"
            disabled={meal.stock === 0}
            onClick={() => onAdd?.(meal)}
            type="button"
          >
            {meal.stock === 0 ? "Unavailable" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
