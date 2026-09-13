const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5001/api";

function getAuthToken() {
  return localStorage.getItem("smartshop-token");
}

async function sendCartRequest(endpoint = "", options = {}) {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Please log in to use your cart.");
  }

  const response = await fetch(`${API_BASE_URL}/cart${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Cart request failed");
  }

  return result;
}

export function getCart() {
  return sendCartRequest();
}

export function addCartItem(productId, quantity = 1) {
  return sendCartRequest("/items", {
    method: "POST",
    body: JSON.stringify({
      product_id: productId,
      quantity,
    }),
  });
}

export function updateCartItem(productId, quantity) {
  return sendCartRequest(`/items/${productId}`, {
    method: "PUT",
    body: JSON.stringify({ quantity }),
  });
}

export function removeCartItem(productId) {
  return sendCartRequest(`/items/${productId}`, {
    method: "DELETE",
  });
}