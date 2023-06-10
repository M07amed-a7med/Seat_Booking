const express = require("express");
const { getTrips } = require("../controllers/trips.controller");

const router = express.Router();
router.get("/:routeId", getTrips);

module.exports = router;
