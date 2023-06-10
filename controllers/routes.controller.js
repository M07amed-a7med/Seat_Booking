const routesService = require("../services/routes.service");

const getRoutes = async (req, res) => {
  let routes = await routesService.getRoutes();
  res.send(routes);
};

module.exports = {
  getRoutes,
};
