const express = require("express");
const { createUser } = require("../controllers/users.controller");
const { validateSchema } = require("../middlewares/schema-validator");

const router = express.Router();
router.post("/", validateSchema("user-schema"), createUser);

module.exports = router;
