import { useState } from "react";
import { askCatalogueAssistant } from "../../services/aiApi";
import "./CatalogueAssistant.css";

function CatalogueAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [responseTime, setResponseTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      setError("Please enter a question.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setAnswer("");
      setResponseTime(null);

      const response = await askCatalogueAssistant(trimmedQuestion);

      setAnswer(response.data?.answer || "No answer was returned.");
      setResponseTime(response.data?.response_time_ms ?? null);
    } catch (err) {
      setError(
        err.message ||
          "AI assistance is currently unavailable. Please browse the catalogue."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="ai-assistant" aria-labelledby="ai-assistant-heading">
      <div className="ai-assistant__header">
        <p className="ai-assistant__eyebrow">SmartShop AI</p>
        <h2 id="ai-assistant-heading">Ask our catalogue assistant</h2>
        <p>
          Ask about products, prices, stock and information available in our
          catalogue.
        </p>
      </div>

      <form className="ai-assistant__form" onSubmit={handleSubmit}>
        <label htmlFor="catalogue-question">
          What would you like to know?
        </label>

        <div className="ai-assistant__input-row">
          <input
            id="catalogue-question"
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="e.g. How much is the Anker 65W USB-C Charger?"
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Thinking..." : "Ask AI"}
          </button>
        </div>
      </form>

      {loading && (
        <p className="ai-assistant__status" role="status">
          Checking the SmartShop catalogue...
        </p>
      )}

      {error && (
        <p className="ai-assistant__error" role="alert">
          {error}
        </p>
      )}

      {answer && (
        <div className="ai-assistant__answer">
          <h3>SmartShop AI answer</h3>
          <p>{answer}</p>

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

export default CatalogueAssistant;