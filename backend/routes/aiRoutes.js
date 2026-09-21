const express = require("express");
const {
  askCatalogueAssistant,
  recommendProducts,
} = require("../controllers/aiController");

const router = express.Router();

// FR8 - Catalogue-grounded AI assistant
router.post("/catalogue", askCatalogueAssistant);

// FR9 - Guided product recommendations
router.post("/recommend", recommendProducts);

module.exports = router;