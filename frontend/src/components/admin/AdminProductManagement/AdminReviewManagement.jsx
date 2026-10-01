import { useEffect, useState } from "react";
import {
  getAdminReviews,
  updateReviewStatus,
  deleteReview,
} from "../../../services/productApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faTrashCan,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import "./AdminProductManagement.css";

export default function AdminReviewManagement({ onBack }) {
  const [reviews, setReviews] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState(null);

  async function loadReviews() {
    try {
      setLoading(true);
      setError("");

      const result = await getAdminReviews();
      setReviews(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  async function handleStatusChange(reviewId, status) {
    try {
      setProcessingId(reviewId);
      setMessage("");
      setError("");

      await updateReviewStatus(reviewId, status);

      setMessage(
        status === "approved"
          ? "Review approved successfully."
          : "Review rejected successfully."
      );

      await loadReviews();
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessingId(null);
    }
  }

  async function handleDelete(review) {
    const confirmed = window.confirm(
      `Permanently remove review #${review.reviewId}?\n\nThis action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setProcessingId(review.reviewId);
      setMessage("");
      setError("");

      await deleteReview(review.reviewId);

      setMessage("Review removed successfully.");
      await loadReviews();
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessingId(null);
    }
  }

  const filteredReviews = reviews.filter((review) => {
    if (statusFilter === "all") {
      return true;
    }

    return review.status === statusFilter;
  });

  function formatDate(date) {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="admin-product-list">
      <div className="admin-product-list-heading">
        <div>
          <p className="admin-products-label">Administration</p>
          <h2>Review Management</h2>
          <p className="admin-product-list-description">
            Moderate customer reviews before they are displayed publicly.
          </p>
        </div>

        {onBack && (
          <button
            type="button"
            className="admin-secondary-button"
            onClick={onBack}
          >
            Back to Products
          </button>
        )}
      </div>

      {message && (
        <div className="admin-success-message">{message}</div>
      )}

      {error && (
        <div className="admin-error-message">{error}</div>
      )}

      <div className="admin-product-list-heading">
        <div>
          <h3>Customer Reviews</h3>
          <p className="admin-product-list-description">
            Approve, reject or permanently remove reviews.
          </p>
        </div>

        <div className="admin-list-controls">
          <span>{filteredReviews.length} reviews</span>

          <div className="admin-status-filters">
            <button
              type="button"
              className={statusFilter === "all" ? "active" : ""}
              onClick={() => setStatusFilter("all")}
            >
              All
            </button>

            <button
              type="button"
              className={statusFilter === "pending" ? "active" : ""}
              onClick={() => setStatusFilter("pending")}
            >
              Pending
            </button>

            <button
              type="button"
              className={statusFilter === "approved" ? "active" : ""}
              onClick={() => setStatusFilter("approved")}
            >
              Approved
            </button>

            <button
              type="button"
              className={statusFilter === "rejected" ? "active" : ""}
              onClick={() => setStatusFilter("rejected")}
            >
              Rejected
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <p>Loading reviews...</p>
      ) : filteredReviews.length === 0 ? (
        <p className="admin-empty-products">
          No reviews found for this status.
        </p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-products-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Date</th>
                <th>Status</th>
                <th className="actions-heading">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredReviews.map((review) => (
                <tr key={review.reviewId}>
                  <td>
                    <strong>{review.customerName}</strong>
                    <br />
                    <small>{review.customerEmail}</small>
                  </td>

                  <td>{review.productName}</td>

                  <td>
                    <FontAwesomeIcon icon={faStar} />{" "}
                    {review.rating}/5
                  </td>

                  <td style={{ maxWidth: "300px" }}>
                    {review.reviewText || "No written review"}
                  </td>

                  <td>{formatDate(review.reviewDate)}</td>

                  <td>
                    {review.status === "approved" && (
                      <span className="status-active">
                        <FontAwesomeIcon icon={faCircleCheck} />{" "}
                        Approved
                      </span>
                    )}

                    {review.status === "rejected" && (
                      <span className="status-inactive">
                        <FontAwesomeIcon icon={faCircleXmark} />{" "}
                        Rejected
                      </span>
                    )}

                    {review.status === "pending" && (
                      <span>Pending</span>
                    )}
                  </td>

                  <td>
                    <div className="admin-product-actions">
                      {review.status !== "approved" && (
                        <button
                          type="button"
                          className="admin-edit-button"
                          disabled={processingId === review.reviewId}
                          onClick={() =>
                            handleStatusChange(
                              review.reviewId,
                              "approved"
                            )
                          }
                        >
                          <FontAwesomeIcon icon={faCircleCheck} />
                          <span>Approve</span>
                        </button>
                      )}

                      {review.status !== "rejected" && (
                        <button
                          type="button"
                          className="admin-status-button"
                          disabled={processingId === review.reviewId}
                          onClick={() =>
                            handleStatusChange(
                              review.reviewId,
                              "rejected"
                            )
                          }
                        >
                          <FontAwesomeIcon icon={faCircleXmark} />
                          <span>Reject</span>
                        </button>
                      )}

                      <button
                        type="button"
                        className="admin-delete-button"
                        disabled={processingId === review.reviewId}
                        onClick={() => handleDelete(review)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}