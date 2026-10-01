const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000/api";

// Get all products with optional filters
export async function getProducts(filters = {}) {
  const params = new URLSearchParams();

  if (filters.category) {
    params.append("category", filters.category);
  }

  if (filters.minPrice !== undefined && filters.minPrice !== "") {
    params.append("minPrice", filters.minPrice);
  }

  if (filters.maxPrice !== undefined && filters.maxPrice !== "") {
    params.append("maxPrice", filters.maxPrice);
  }

  if (filters.sort) {
    params.append("sort", filters.sort);
  }

  const queryString = params.toString();
  const url = `${API_BASE_URL}/products${
    queryString ? `?${queryString}` : ""
  }`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to retrieve products");
  }

  return response.json();
}

// Search products
export async function searchProducts(keyword) {
  const response = await fetch(
    `${API_BASE_URL}/products/search?q=${encodeURIComponent(keyword)}`
  );

  if (!response.ok) {
    throw new Error("Failed to search products");
  }

  return response.json();
}

// Get one product by ID
export async function getProductById(productId) {
  const response = await fetch(
    `${API_BASE_URL}/products/${productId}`
  );

  if (!response.ok) {
    throw new Error("Failed to retrieve product");
  }

  return response.json();
}

// Get authentication token
function getAuthToken() {
  return localStorage.getItem("smartshop-token");
}

// Create a new product - Admin only
export async function createProduct(productData) {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create product");
  }

  return result;
}

// Update a product - Admin only
export async function updateProduct(productId, productData) {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update product");
  }

  return result;
}

// Delete a product - Admin only
export async function deleteProduct(productId) {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete product");
  }

  return result;
}

export async function getAdminProducts() {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/products/admin/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to load admin products.");
  }

  return result;
}
// Upload product image - Admin only
export async function uploadProductImage(imageFile) {
  const token = getAuthToken();

  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(
    `${API_BASE_URL}/uploads/product-image`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to upload product image"
    );
  }

  return result;
}

// ============================================================
// FR12 - Review Moderation - Admin only
// ============================================================

// Get all reviews for moderation
export async function getAdminReviews() {
  const token = getAuthToken();

  const response = await fetch(
    `${API_BASE_URL}/products/admin/reviews`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to load reviews.");
  }

  return result;
}

// Approve or reject a review
export async function updateReviewStatus(reviewId, status) {
  const token = getAuthToken();

  const response = await fetch(
    `${API_BASE_URL}/products/admin/reviews/${reviewId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to update review status."
    );
  }

  return result;
}

// Permanently remove a review
export async function deleteReview(reviewId) {
  const token = getAuthToken();

  const response = await fetch(
    `${API_BASE_URL}/products/admin/reviews/${reviewId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to remove review.");
  }

  return result;
}