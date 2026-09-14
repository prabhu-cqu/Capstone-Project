const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5001/api";

function getAuthToken() {
  return localStorage.getItem("smartshop-token");
}

async function sendOrderRequest(endpoint = "", options = {}) {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Please log in to access your orders.");
  }

  const response = await fetch(`${API_BASE_URL}/orders${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Order request failed");
  }

  return result;
}

export function createOrder() {
  return sendOrderRequest("", {
    method: "POST",
  });
}

export function getOrders() {
  return sendOrderRequest();
}

export function getOrderById(orderId) {
  return sendOrderRequest(`/${orderId}`);
}

export function cancelOrder(orderId) {
  return sendOrderRequest(`/${orderId}/cancel`, {
    method: "PUT",
  });
}