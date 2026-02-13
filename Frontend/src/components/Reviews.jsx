const Reviews = () => {
  return (
    <section className="reviews-section">
      <h2 className="reviews-title">What Our Customers Say</h2>
      <p className="reviews-subtitle">
        Real results from real gym-goers who chose GymBites.
      </p>

      <div className="reviews-grid">
        <div className="review-card">
          <div className="stars">★★★★★</div>
          <p className="review-text">
            “Lost 4 kg in 2 months without feeling weak or hungry. Meals are
            clean, filling, and perfect for cutting.”
          </p>
          <div className="review-footer">
            <span className="review-name">Rohit</span>
            <span className="review-tag fat">Fat Loss</span>
          </div>
        </div>

        <div className="review-card">
          <div className="stars">★★★★★</div>
          <p className="review-text">
            “I don’t worry about protein anymore. Meals are tasty, consistent,
            and actually help recovery after workouts.”
          </p>
          <div className="review-footer">
            <span className="review-name">Arjun</span>
            <span className="review-tag muscle">Muscle Gain</span>
          </div>
        </div>

        <div className="review-card">
          <div className="stars">★★★★★</div>
          <p className="review-text">
            “As someone working long hours, GymBites keeps my diet clean without
            overthinking food every day.”
          </p>
          <div className="review-footer">
            <span className="review-name">Sneha</span>
            <span className="review-tag balanced">Balanced</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
