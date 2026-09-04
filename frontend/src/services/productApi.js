const API_BASE_URL = "http://localhost:5000/api";

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