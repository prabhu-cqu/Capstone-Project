const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000/api";

// ============================================================
// FR8 - Catalogue-Grounded AI Q&A
// ============================================================

export async function askCatalogueAssistant(question) {
  const response = await fetch(`${API_BASE_URL}/ai/catalogue`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "AI assistant is currently unavailable."
    );
  }

  return result;
}

// ============================================================
// FR9 - AI Guided Product Recommendations
// ============================================================

export async function getProductRecommendation(customerRequest) {
  const response = await fetch(`${API_BASE_URL}/ai/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      request: customerRequest,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "AI recommendations are currently unavailable."
    );
  }

  return result;
}