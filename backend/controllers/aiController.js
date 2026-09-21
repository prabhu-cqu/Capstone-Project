const pool = require("../config/db");
const {
  generateCatalogueAnswer,
  generateProductRecommendation,
  generateReviewSummary,
} = require("../services/aiService");

// ============================================================
// FR8 - Catalogue-Grounded AI Q&A
// ============================================================

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

// ============================================================
// FR9 - AI Guided Product Recommendations
// ============================================================

async function recommendProducts(req, res) {
  try {
    const { request } = req.body;

    if (!request || typeof request !== "string" || !request.trim()) {
      return res.status(400).json({
        success: false,
        message: "A recommendation request is required.",
      });
    }

    const customerRequest = request.trim();

    // --------------------------------------------------------
    // Extract a maximum budget from common customer phrases.
    //
    // Examples:
    // "under $800"
    // "under 800"
    // "budget of $1,000"
    // "budget is $1000"
    // "up to $400"
    // --------------------------------------------------------

    let maxBudget = null;

    const budgetPatterns = [
      /under\s*\$?\s*([\d,]+(?:\.\d{1,2})?)/i,
      /budget\s*(?:of|is|:)?\s*\$?\s*([\d,]+(?:\.\d{1,2})?)/i,
      /up\s*to\s*\$?\s*([\d,]+(?:\.\d{1,2})?)/i,
    ];

    for (const pattern of budgetPatterns) {
      const match = customerRequest.match(pattern);

      if (match) {
        maxBudget = Number(match[1].replace(/,/g, ""));
        break;
      }
    }
console.log("FR9 customer request:", customerRequest);
console.log("FR9 detected max budget:", maxBudget);
    // --------------------------------------------------------
    // Retrieve active catalogue products and their categories.
    // --------------------------------------------------------

    const [products] = await pool.query(`
      SELECT
        p.product_id,
        p.name,
        c.name AS category,
        p.description,
        p.price,
        p.stock,
        p.specifications
      FROM products p
      JOIN categories c
        ON p.category_id = c.category_id
      WHERE p.status = 'active'
        AND c.status = 'active'
      ORDER BY p.product_id
    `);

    if (products.length === 0) {
      return res.status(503).json({
        success: false,
        message: "Catalogue information is currently unavailable.",
      });
    }

    // --------------------------------------------------------
    // Enforce the customer's maximum budget on the server.
    //
    // Products above the stated maximum budget are not supplied
    // to the AI as recommendation candidates.
    // --------------------------------------------------------

    const eligibleProducts =
      maxBudget !== null
        ? products.filter(
            (product) => Number(product.price) <= maxBudget
          )
        : products;

    // If the budget excludes every catalogue product, return a
    // controlled response without asking the AI to invent one.
    if (eligibleProducts.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          answer:
            maxBudget !== null
              ? `No suitable product is currently available in the SmartShop catalogue within your budget of $${maxBudget.toFixed(
                  2
                )}.`
              : "No suitable product is currently available in the SmartShop catalogue.",
          response_time_ms: 0,
        },
      });
    }

    // --------------------------------------------------------
    // Create controlled catalogue context for Gemini.
    // --------------------------------------------------------

    const catalogueContext = eligibleProducts
      .map((product) => {
        return [
          `Product ID: ${product.product_id}`,
          `Name: ${product.name}`,
          `Category: ${product.category || "Not available"}`,
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

    const answer = await generateProductRecommendation(
      customerRequest,
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
    console.error("AI product recommendation error:", error.message);

    return res.status(503).json({
      success: false,
      message:
        "AI recommendations are currently unavailable. Please browse the product catalogue.",
    });
  }
}

// ============================================================
// FR10 - AI Customer Review Summaries
// ============================================================

async function summariseProductReviews(req, res) {
  try {
    const productId = Number(req.params.productId);

    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({
        success: false,
        message: "A valid product ID is required.",
      });
    }

    // Retrieve the requested active product.
    const [products] = await pool.query(
      `
        SELECT
          product_id,
          name
        FROM products
        WHERE product_id = ?
          AND status = 'active'
        LIMIT 1
      `,
      [productId]
    );

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const product = products[0];

    // Retrieve only approved reviews with usable review text.
    const [reviews] = await pool.query(
      `
        SELECT
          review_id,
          rating,
          review_text,
          review_date
        FROM reviews
        WHERE product_id = ?
          AND status = 'approved'
          AND review_text IS NOT NULL
          AND TRIM(review_text) <> ''
        ORDER BY review_date ASC, review_id ASC
      `,
      [productId]
    );

    // Do not call the AI when there is insufficient source information.
    if (reviews.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          product_id: product.product_id,
          product_name: product.name,
          review_count: 0,
          summary:
            "There is insufficient approved review information to generate a meaningful summary for this product.",
          source_reviews: [],
          response_time_ms: 0,
        },
      });
    }

    // Create controlled review context using approved reviews only.
    const reviewContext = reviews
      .map((review) => {
        return [
          `Review ID: ${review.review_id}`,
          `Rating: ${review.rating}/5`,
          `Review: ${review.review_text}`,
        ].join("\n");
      })
      .join("\n\n");

    const startTime = Date.now();

    const summary = await generateReviewSummary(
      product.name,
      reviewContext
    );

    const responseTimeMs = Date.now() - startTime;

    return res.status(200).json({
      success: true,
      data: {
        product_id: product.product_id,
        product_name: product.name,
        review_count: reviews.length,
        summary,
        source_reviews: reviews.map((review) => ({
          review_id: review.review_id,
          rating: review.rating,
          review_text: review.review_text,
          review_date: review.review_date,
        })),
        response_time_ms: responseTimeMs,
      },
    });
  } catch (error) {
    console.error("AI review summary error:", error.message);

    return res.status(503).json({
      success: false,
      message:
        "AI review summaries are currently unavailable. Please read the customer reviews directly.",
    });
  }
}

module.exports = {
  askCatalogueAssistant,
  recommendProducts,
  summariseProductReviews,
};
