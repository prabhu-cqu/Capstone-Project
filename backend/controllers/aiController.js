const pool = require("../config/db");
const { generateCatalogueAnswer } = require("../services/aiService");

async function askCatalogueAssistant(req, res) {
  try {
    const { question } = req.body;

    if (!question || typeof question !== "string" || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "A question is required.",
      });
    }

    // Retrieve the current active catalogue from MySQL.
    const [products] = await pool.query(`
      SELECT
        product_id,
        name,
        description,
        price,
        stock,
        specifications
      FROM products
      WHERE status = 'active'
      ORDER BY product_id
    `);

    if (products.length === 0) {
      return res.status(503).json({
        success: false,
        message: "Catalogue information is currently unavailable.",
      });
    }

    // Create controlled catalogue context for the AI.
    const catalogueContext = products
      .map((product) => {
        return [
          `Product ID: ${product.product_id}`,
          `Name: ${product.name}`,
          `Description: ${product.description || "Not available"}`,
          `Price: $${Number(product.price).toFixed(2)}`,
          `Stock: ${product.stock}`,
          `Specifications: ${
            product.specifications
              ? JSON.stringify(product.specifications)
              : "Not available"
          }`,
        ].join("\n");
      })
      .join("\n\n");

    const startTime = Date.now();

    const answer = await generateCatalogueAnswer(
      question.trim(),
      catalogueContext
    );

    const responseTimeMs = Date.now() - startTime;

    return res.status(200).json({
      success: true,
      data: {
        answer,
        response_time_ms: responseTimeMs,
      },
    });
  } catch (error) {
    console.error("AI catalogue assistant error:", error.message);

    return res.status(503).json({
      success: false,
      message:
        "AI assistance is currently unavailable. Please use the product catalogue to browse available products.",
    });
  }
}

module.exports = {
  askCatalogueAssistant,
};