const express = require("express");

const {
  askCatalogueAssistant,
  getProductRecommendations,
  recommendProducts,
  summariseProductReviews,
} = require("../controllers/aiController");

const router = express.Router();

// FR8 - Catalogue-grounded AI assistant
router.post("/catalogue", askCatalogueAssistant);

// FR9 - Guided product recommendations
router.post("/recommend", recommendProducts);

// Backward-compatible FR9 endpoint
router.post("/recommendations", getProductRecommendations);

// FR10 - Customer review summaries
router.get("/reviews/:productId/summary", summariseProductReviews);

module.exports = router;