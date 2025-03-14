const express = require("express");
const router = express.Router();
const reservationsController = require("../controllers/reservationsController");

router.post("/create", reservationsController.createReservation);
router.put("/edit/:reservationId", reservationsController.editReservation);
router.delete("/delete/:reservationId", reservationsController.deleteReservation);

module.exports = router;
