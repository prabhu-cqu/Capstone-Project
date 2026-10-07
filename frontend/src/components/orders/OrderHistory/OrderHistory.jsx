import { useEffect, useState } from "react";
import { getOrderById, getOrders } from "../../../services/orderApi";
import { submitProductReview } from "../../../services/productApi";
import "./OrderHistory.css";

function OrderHistory({ onClose }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState("");
const [reviewProduct, setReviewProduct] = useState(null);
const [rating, setRating] = useState(5);
const [reviewText, setReviewText] = useState("");
const [reviewMessage, setReviewMessage] = useState("");
const [reviewSubmitting, setReviewSubmitting] = useState(false);

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
async function handleReviewSubmit(event) {
  event.preventDefault();

  if (!reviewProduct) return;

  try {
    setReviewSubmitting(true);
    setReviewMessage("");

    const response = await submitProductReview(
      reviewProduct.product_id,
      rating,
      reviewText
    );

    setReviewMessage(response.message);
    setReviewText("");
    setRating(5);
    setReviewProduct(null);
  } catch (err) {
    setReviewMessage(err.message || "Unable to submit review.");
  } finally {
    setReviewSubmitting(false);
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

              <div className="order-details-header-actions">
  <button
    type="button"
    className="write-review-button"
    onClick={() => {
      const item = selectedOrder.items?.[0];

      if (item) {
        setReviewProduct(item);
        setRating(5);
        setReviewText("");
        setReviewMessage("");
      }
    }}
  >
    Write Review
  </button>

  <button
    type="button"
    onClick={() => {
      setSelectedOrder(null);
      setReviewProduct(null);
    }}
  >
    Close details
  </button>
</div>
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
{reviewProduct && (
  <form className="review-form" onSubmit={handleReviewSubmit}>
    <div className="review-form-header">
      <div>
        <h3>Write Review</h3>
        <p>
          Share your experience with{" "}
          <strong>{reviewProduct.name}</strong>
        </p>
      </div>
    </div>

    <div className="review-form-field">
      <label htmlFor="review-rating">Rating</label>
      <select
        id="review-rating"
        value={rating}
        onChange={(event) =>
          setRating(Number(event.target.value))
        }
        required
      >
        <option value={5}>★★★★★ - 5 Excellent</option>
        <option value={4}>★★★★☆ - 4 Good</option>
        <option value={3}>★★★☆☆ - 3 Average</option>
        <option value={2}>★★☆☆☆ - 2 Poor</option>
        <option value={1}>★☆☆☆☆ - 1 Very Poor</option>
      </select>
    </div>

    <div className="review-form-field">
      <label htmlFor="review-text">Your Review</label>
      <textarea
        id="review-text"
        value={reviewText}
        onChange={(event) => setReviewText(event.target.value)}
        placeholder="Tell us what you liked or disliked about this product..."
        rows="4"
        required
      />
    </div>

    <div className="review-form-actions">
      <button
        type="submit"
        className="review-submit-button"
        disabled={reviewSubmitting}
      >
        {reviewSubmitting ? "Submitting..." : "Submit Review"}
      </button>

      <button
        type="button"
        className="review-cancel-button"
        onClick={() => {
          setReviewProduct(null);
          setReviewText("");
          setReviewMessage("");
        }}
      >
        Cancel
      </button>
    </div>
  </form>
)}

{reviewMessage && (
  <p className="review-message">{reviewMessage}</p>
)}

          </div>
        )}
      </section>
    </div>
  );
}

export default OrderHistory;