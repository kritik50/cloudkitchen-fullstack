import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Orders() {
  const [searchParams] = useSearchParams();
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState("");
  const { auth, getOrders } = useAppContext();
  const latestOrderId = searchParams.get("orderId");

  const formatCreatedAt = (value) => {
    if (!value) return "Just now";
    if (typeof value === "string") return value;
    if (value?.toDate) return value.toDate().toLocaleString();
    return "Just now";
  };

  useEffect(() => {
    if (!auth.isAuthenticated) {
      return;
    }

    getOrders()
      .then((data) => {
        setError("");
        setOrders(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setOrders([]);
        setError("Failed to load orders.");
      });
  }, [auth.isAuthenticated, getOrders]);

  return (
    <section className="orders-page">
      <div className="container">
        <div className="orders-page__header">
          <span className="eyebrow">Orders</span>
          <h1 className="section-title">Track active and recent orders quietly in one place.</h1>
          <p className="section-copy">
            This page supports retention, but it should stay out of the acquisition spotlight.
          </p>
        </div>

        {!auth.isAuthenticated ? <p className="error-copy">Please login to track your orders.</p> : null}
        {orders === null && auth.isAuthenticated ? <p className="status-copy">Loading orders...</p> : null}
        {error ? <p className="error-copy">{error}</p> : null}
        {orders !== null && !orders.length ? <p className="empty-copy">No orders found yet.</p> : null}

        <div className="orders-list">
          {(orders || []).map((order) => (
            <article
              key={order.id}
              className={`orders-card${latestOrderId === order.id ? " orders-card--highlight" : ""}`}
            >
              <div className="orders-card__meta">
                <span className="plan-card__tag">Order #{order.id?.slice(-6)}</span>
                <span className="orders-card__status">{order.status || "PLACED"}</span>
              </div>

              <h2 className="orders-card__title">{order.customer?.name || "Customer order"}</h2>
              <p className="section-copy">{order.customer?.address}</p>

              <div className="checkout-list" style={{ marginTop: 18 }}>
                {order.items?.map((item, index) => (
                  <div key={index} className="orders-card__row">
                    <strong>{item.name} x {item.quantity}</strong>
                    <strong>INR {item.lineTotal}</strong>
                  </div>
                ))}
              </div>

              <div className="checkout-panel__totals">
                <div className="checkout-panel__totals-row">
                  <span>Total</span>
                  <strong>INR {order.totals?.grandTotal}</strong>
                </div>
                <div className="checkout-panel__totals-row">
                  <span>Placed at</span>
                  <strong>{formatCreatedAt(order.createdAt)}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
