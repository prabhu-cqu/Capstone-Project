const express = require("express");

const {
  askCatalogueAssistant,
  recommendProducts,
  summariseProductReviews,
} = require("../controllers/aiController");

const router = express.Router();

// FR8 - Catalogue-grounded AI assistant
router.post("/catalogue", askCatalogueAssistant);

// FR9 - Guided product recommendations
router.post("/recommend", recommendProducts);

// FR10 - Customer review summaries
router.get("/reviews/:productId/summary", summariseProductReviews);

module.exports = router;
