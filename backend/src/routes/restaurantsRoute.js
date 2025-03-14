const express = require("express");
const router = express.Router();
const restaurantsController = require("../controllers/restaurantsController");

// Test route (Public, accessible to anyone)
router.get("/", restaurantsController.getRestaurants);

module.exports = router;
