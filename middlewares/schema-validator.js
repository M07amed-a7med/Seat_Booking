const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true, removeAdditional: "all" });
const userSchema = require("../schemas/user-schema.json");
const seatSchema = require("../schemas/seat-schema.json");
ajv.addSchema(userSchema, "user-schema");
ajv.addSchema(seatSchema, "seat-schema");

function errorResponse(schemaErrors) {
  let errors = schemaErrors.map((error) => {
    return {
      path: error.dataPath,
      message: error.message,
    };
  });
  return {
    status: "failed",
    errors: errors,
  };
}

const validateSchema = (schemaName) => {
  return (req, res, next) => {
    let valid = ajv.validate(schemaName, req.body);
    if (!valid) {
      return res.status(400).send(errorResponse(ajv.errors));
    }
    next();
  };
};

module.exports = {
  validateSchema,
};
