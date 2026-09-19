const express = require("express");
const { askCatalogueAssistant } = require("../controllers/aiController");

const router = express.Router();

// FR8 - Catalogue-grounded AI assistant
router.post("/catalogue", askCatalogueAssistant);

module.exports = router;