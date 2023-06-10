const express = require("express");
const { getSeats, bookSeat } = require("../controllers/seats.controller");
const { validateSchema } = require("../middlewares/schema-validator");

const router = express.Router();
router.get("/:tripId", getSeats);
router.post("/", validateSchema("seat-schema"), bookSeat);

module.exports = router;
