import { useEffect, useState } from "react";
import { getOrderById, getOrders } from "../../../services/orderApi";
import "./OrderHistory.css";

function OrderHistory({ onClose }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadOrders() {
      try {
        setLoading(true);
        setError("");

        const response = await getOrders();

        if (!cancelled) {
          setOrders(response.data || []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load your order history.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadOrders();

    return () => {
      cancelled = true;
    };
  }, []);

  async function viewOrder(orderId) {
    try {
      setDetailsLoading(true);
      setError("");

      const response = await getOrderById(orderId);
      setSelectedOrder(response.data);
    } catch (err) {
      setError(err.message || "Unable to load order details.");
    } finally {
      setDetailsLoading(false);
    }
  }

  function formatDate(dateValue) {
    if (!dateValue) {
      return "Not available";
    }

    return new Date(dateValue).toLocaleString("en-AU", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  function formatPrice(value) {
    return Number(value || 0).toLocaleString("en-AU", {
      style: "currency",
      currency: "AUD",
    });
  }

  return (
    <div className="order-history-overlay">
      <section className="order-history-panel">
        <div className="order-history-header">
          <div>
            <h2>My Orders</h2>
            <p>View your SmartShop AI order history.</p>
          </div>

          <button
            type="button"
            className="order-history-close"
            onClick={onClose}
            aria-label="Close order history"
          >
            ×
          </button>
        </div>

        {error && <p className="order-history-error">{error}</p>}

        {loading ? (
          <p className="order-history-message">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <div className="order-history-empty">
            <h3>No orders yet</h3>
            <p>Your completed orders will appear here.</p>
          </div>
        ) : (
          <div className="order-history-list">
            {orders.map((order) => (
              <article className="order-history-card" key={order.order_id}>
                <div>
                  <h3>Order #{order.order_id}</h3>
                  <p>{formatDate(order.order_date)}</p>
                </div>

                <div className="order-history-summary">
                  <span className="order-history-status">
                    {order.status}
                  </span>

                  <strong>{formatPrice(order.total_amount)}</strong>

                  <span>
                    {order.total_items} item
                    {Number(order.total_items) === 1 ? "" : "s"}
                  </span>

                  <button
                    type="button"
                    onClick={() => viewOrder(order.order_id)}
                    disabled={detailsLoading}
                  >
                    View details
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {selectedOrder && (
          <div className="order-details">
            <div className="order-details-header">
              <div>
                <h3>Order #{selectedOrder.order_id}</h3>
                <p>{formatDate(selectedOrder.order_date)}</p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
              >
                Close details
              </button>
            </div>

            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>

            <div className="order-details-items">
              {selectedOrder.items?.map((item) => (
                <div
                  className="order-details-item"
                  key={item.order_item_id}
                >
                  <div>
                    <strong>{item.name}</strong>
                    <p>
                      {formatPrice(item.unit_price)} × {item.quantity}
                    </p>
                  </div>

                  <strong>{formatPrice(item.subtotal)}</strong>
                </div>
              ))}
            </div>

            <div className="order-details-total">
              <span>Order total</span>
              <strong>{formatPrice(selectedOrder.total_amount)}</strong>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default OrderHistory;