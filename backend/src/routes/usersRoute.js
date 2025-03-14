const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/account", usersController.getAccount);
router.get("/history", usersController.getReservationHistory);

module.exports = router;
