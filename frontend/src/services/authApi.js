const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5001/api";

async function sendAuthRequest(endpoint, credentials) {
  const response = await fetch(`${API_BASE_URL}/auth/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Authentication request failed");
  }

  return result;
}

export function registerUser({ fullName, email, password }) {
  return sendAuthRequest("register", {
    full_name: fullName.trim(),
    email: email.trim().toLowerCase(),
    password,
  });
}

export function loginUser({ email, password }) {
  return sendAuthRequest("login", {
    email: email.trim().toLowerCase(),
    password,
  });
}