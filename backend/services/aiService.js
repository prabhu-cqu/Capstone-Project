const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateCatalogueAnswer(question, catalogueContext) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }

  const prompt = `
You are the SmartShop AI catalogue assistant.

You must answer the customer's question using ONLY the SmartShop catalogue
data provided below.

RULES:
- Do not invent products.
- Do not invent prices.
- Do not invent stock levels.
- Do not invent specifications or compatibility information.
- Only discuss products contained in the supplied catalogue.
- If the requested information is not available in the catalogue data,
  clearly say that the information is not available.
- Keep the response clear and concise.
- The supplied SmartShop catalogue is the authoritative source.

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

async function generateProductRecommendation(
  customerRequest,
  catalogueContext
) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }

  const prompt = `
You are the SmartShop AI guided product recommendation assistant.

Your job is to recommend suitable products using ONLY the SmartShop
catalogue data provided below.

CUSTOMER REQUEST:
${customerRequest}

RULES:
- Recommend only products contained in the supplied SmartShop catalogue.
- Never invent products.
- Never invent prices.
- Never invent stock levels.
- Never invent specifications or compatibility information.
- Respect the customer's stated budget.
- Consider the requested product category.
- Consider intended use where relevant.
- Consider stated product or device requirements where relevant.
- Explain briefly why each recommended product matches the customer's needs.
- Do not recommend products outside the customer's stated maximum budget.
- If no catalogue product satisfies the request, clearly state that no suitable
  product is currently available in the SmartShop catalogue.
- Do not recommend unavailable or unrelated products simply to provide an answer.
- Do not claim compatibility unless the supplied catalogue explicitly supports it.
- Keep the response clear and concise.
- The supplied SmartShop catalogue is the authoritative source.

SMARTSHOP CATALOGUE:
${catalogueContext}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  return response.text;
}

async function generateReviewSummary(productName, reviewContext) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }

  const prompt = `
You are the SmartShop AI customer review summary assistant.

Your job is to summarise approved customer reviews for the product named below.

PRODUCT:
${productName}

APPROVED CUSTOMER REVIEWS:
${reviewContext}

RULES:
- Use ONLY the approved customer reviews supplied above.
- Do not invent customer opinions.
- Do not invent product features, specifications, prices, warranty information,
  compatibility information or other product details.
- Identify recurring strengths only when they are supported by the supplied reviews.
- Identify recurring concerns only when they are supported by the supplied reviews.
- If reviews contain both positive and negative opinions, represent both fairly.
- If customers express different opinions, preserve those differences rather than
  presenting one opinion as a universal conclusion.
- Do not exaggerate positive or negative feedback.
- Do not change the meaning of the source reviews.
- If only one approved review is supplied, clearly indicate that the summary is
  based on limited customer feedback.
- Do not claim that all customers agree unless the supplied reviews support that claim.
- Keep the summary clear, concise and neutral.
- The supplied approved reviews are the only authoritative source for this summary.

Provide a concise customer review summary.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  return response.text;
}

module.exports = {
  generateCatalogueAnswer,
  generateProductRecommendation,
  generateReviewSummary,
};
