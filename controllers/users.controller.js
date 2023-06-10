const usersService = require("../services/users.service");

const createUser = async (req, res) => {
  const user = req.body;
  let result = await usersService.createUser(user);
  result.errorMsg
    ? res.status(result.status).send({ error: result.errorMsg })
    : res.status(201).send(result);
};

module.exports = {
  createUser,
};
