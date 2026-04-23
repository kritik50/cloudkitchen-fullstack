import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchOrders } from "../services/api";

export default function Orders() {
  const [searchParams] = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const phone = searchParams.get("phone") || "";
  const latestOrderId = searchParams.get("orderId");

  useEffect(() => {
    fetchOrders(phone)
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setError("Failed to load orders."))
      .finally(() => setLoading(false));
  }, [phone]);

  return (
    <section className="plans-page">
      <div className="plans-header" style={{ marginBottom: "24px" }}>
        <span className="plans-eyebrow">Orders</span>
        <h1 className="plans-title">
          Your <em>Orders</em>
        </h1>
        <p className="plans-subtitle">
          Track active and recent orders in one place.
        </p>
      </div>

      {loading ? <p style={{ textAlign: "center" }}>Loading orders...</p> : null}
      {error ? <p style={{ textAlign: "center", color: "#f87171" }}>{error}</p> : null}

      <div className="plans-grid" style={{ gridTemplateColumns: "1fr", maxWidth: "980px" }}>
        {orders.map((order) => (
          <article
            key={order.id}
            className="plan-card"
            style={{
              cursor: "default",
              borderColor: latestOrderId === order.id ? "var(--accent-blue)" : undefined,
            }}
          >
            <div className="plan-card-top">
              <span className="plan-card-tag">Order #{order.id?.slice(-6)}</span>
              <span className="plan-card-tag">{order.status || "PLACED"}</span>
            </div>
            <h3 className="plan-card-title" style={{ fontSize: "24px" }}>
              {order.customer?.name}
            </h3>
            <p className="plan-card-desc">{order.customer?.address}</p>

            <div className="plan-divider" />
            {order.items?.map((item, index) => (
              <div key={index} className="plan-meal-row">
                <span className="plan-meal-lbl">
                  {item.name} x {item.quantity}
                </span>
                <span className="plan-meal-val">INR {item.lineTotal}</span>
              </div>
            ))}

            <div className="plan-divider" />
            <div className="plan-meal-row">
              <span className="plan-meal-lbl">Total</span>
              <span className="plan-meal-val">INR {order.totals?.grandTotal}</span>
            </div>
            <p className="plan-note">Placed at: {order.createdAt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
