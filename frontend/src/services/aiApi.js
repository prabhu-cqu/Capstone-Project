const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000/api";

// Ask the SmartShop catalogue-grounded AI assistant
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