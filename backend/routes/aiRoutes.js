const express = require("express");
const {
  askCatalogueAssistant,
  getProductRecommendations,
} = require("../controllers/aiController");

const router = express.Router();

// Catalogue-grounded AI assistant
router.post("/catalogue", askCatalogueAssistant);

// Guided product recommendations
router.post("/recommendations", getProductRecommendations);

module.exports = router;