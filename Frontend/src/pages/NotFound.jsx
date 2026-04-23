import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="plans-page" style={{ display: "grid", placeItems: "center" }}>
      <div className="plan-card" style={{ maxWidth: "520px", textAlign: "center", cursor: "default" }}>
        <h1 className="plans-title" style={{ fontSize: "40px" }}>
          Page <em>Not Found</em>
        </h1>
        <p className="plans-subtitle">The page you are looking for does not exist.</p>
        <Link to="/" className="plan-custom-btn" style={{ textDecoration: "none" }}>
          Back to Home
        </Link>
      </div>
    </section>
  );
}
