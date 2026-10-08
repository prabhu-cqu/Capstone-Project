import { useState } from "react";
import { getProductRecommendation } from "../../services/aiApi";
import "./CatalogueAssistant.css";

function GuidedRecommendation() {
  const [customerRequest, setCustomerRequest] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [responseTime, setResponseTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedRequest = customerRequest.trim();

    if (!trimmedRequest) {
      setError("Please enter what kind of product you are looking for.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setRecommendation("");
      setResponseTime(null);

      const response = await getProductRecommendation(trimmedRequest);

      setRecommendation(
        response.data?.answer || "No recommendation was returned."
      );
      setResponseTime(response.data?.response_time_ms ?? null);
    } catch (err) {
      setError(
        err.message ||
          "AI recommendations are currently unavailable. Please browse the catalogue."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="ai-assistant"
      aria-labelledby="guided-recommendation-heading"
    >
      <div className="ai-assistant__header">
        <p className="ai-assistant__eyebrow">SmartShop AI</p>

        <h2 id="guided-recommendation-heading">
          Find the right product
        </h2>

        <p>
          Tell us your budget, the type of product you need and how you plan
          to use it. SmartShop AI will recommend suitable products from our
          catalogue.
        </p>
      </div>

      <form className="ai-assistant__form" onSubmit={handleSubmit}>
        <label htmlFor="recommendation-request">
          What are you looking for?
        </label>

        <div className="ai-assistant__input-row">
          <input
            id="recommendation-request"
            type="text"
            value={customerRequest}
            onChange={(event) => setCustomerRequest(event.target.value)}
            placeholder="e.g. Recommend a laptop under $800 for university study."
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Finding..." : "Recommend"}
          </button>
        </div>
      </form>

      {loading && (
        <p className="ai-assistant__status" role="status">
          Finding suitable products from the SmartShop catalogue...
        </p>
      )}

      {error && (
        <p className="ai-assistant__error" role="alert">
          {error}
        </p>
      )}

      {recommendation && (
        <div className="ai-assistant__answer">
          <h3>SmartShop AI recommendation</h3>

          <p style={{ whiteSpace: "pre-wrap" }}>
            {recommendation}
          </p>

          {responseTime !== null && (
            <small>
              Response time: {(responseTime / 1000).toFixed(2)} seconds
            </small>
          )}
        </div>
      )}
    </section>
  );
}

export default GuidedRecommendation;