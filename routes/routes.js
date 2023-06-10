const express = require("express");
const { getRoutes } = require("../controllers/routes.controller");

const router = express.Router();
router.get("/", getRoutes);

module.exports = router;
