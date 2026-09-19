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

module.exports = {
  generateCatalogueAnswer,
};