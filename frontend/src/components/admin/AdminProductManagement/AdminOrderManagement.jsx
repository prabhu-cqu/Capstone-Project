import AdminReviewManagement from "./AdminReviewManagement";
import { useEffect, useState } from "react";
import {
  getAdminOrders,
  updateOrderStatus
} from "../../../services/orderApi";

export default function AdminOrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadOrders() {
    try {
      setLoading(true);
      setError("");

      const result = await getAdminOrders();
      setOrders(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function handleStatusChange(orderId, status) {
    try {
      setUpdatingId(orderId);
      setMessage("");
      setError("");

      await updateOrderStatus(orderId, status);

      setMessage(`Order #${orderId} updated to ${status}.`);
      await loadOrders();
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="admin-product-list">
      <div className="admin-product-list-heading">
        <div>
          <h3>Order Management</h3>
          <p className="admin-product-list-description">
            View customer orders and update their status.
          </p>
        </div>

        <span>{orders.length} orders</span>
      </div>

      {message && (
        <div className="admin-success-message">{message}</div>
      )}

      {error && (
        <div className="admin-error-message">{error}</div>
      )}

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-products-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id}>
                  <td>#{order.order_id}</td>

                  <td>
                    <strong>{order.customer_name}</strong>
                    <br />
                    <small>{order.customer_email}</small>
                  </td>

                  <td>
                    {new Date(order.order_date).toLocaleDateString()}
                  </td>

                  <td>{order.total_items}</td>

                  <td>
                    ${Number(order.total_amount).toFixed(2)}
                  </td>

                  <td>
                    <select
                      value={order.status}
                      disabled={updatingId === order.order_id}
                      onChange={(event) =>
                        handleStatusChange(
                          order.order_id,
                          event.target.value
                        )
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
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