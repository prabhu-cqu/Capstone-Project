const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateCatalogueAnswer(question, catalogueContext) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const prompt = `
You are SmartShop AI, an e-commerce catalogue assistant.

Answer the customer's question using ONLY the SmartShop catalogue data provided below.

Rules:
- Do not invent products, prices, stock levels, specifications, or compatibility.
- If the catalogue does not contain enough information, clearly say so.
- Use only the supplied catalogue information.
- Keep the answer concise and useful.

SMARTSHOP CATALOGUE:
${catalogueContext}

CUSTOMER QUESTION:
${question}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  return response.text;
}

async function generateProductRecommendations(
  customerRequirements,
  catalogueContext
) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const prompt = `
You are SmartShop AI, a product recommendation assistant.

Recommend products from the SmartShop catalogue based ONLY on the catalogue
information supplied below and the customer's requirements.

Customer requirements may include:
- product category
- budget or maximum price
- intended use
- required specifications
- other stated preferences

Rules:
- Recommend ONLY products that appear in the supplied catalogue.
- Do not invent products, prices, stock levels, specifications, or features.
- Do not recommend products that are out of stock.
- Consider the customer's stated requirements carefully.
- Explain briefly why each recommended product matches the requirements.
- If no product clearly matches, say that no suitable product was found.
- Do not claim compatibility or features that are not present in the catalogue.
- Keep the response concise.
- Return a maximum of 3 recommendations.

SMARTSHOP CATALOGUE:
${catalogueContext}

CUSTOMER REQUIREMENTS:
${customerRequirements}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  return response.text;
}

module.exports = {
  generateCatalogueAnswer,
  generateProductRecommendations,
};