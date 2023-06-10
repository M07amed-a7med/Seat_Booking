const fs = require("fs");

const getRoutes = () => {
  let routesData = fs.readFileSync("./mock-data/routes.json");
  let routes = JSON.parse(routesData);
  return routes;
};

module.exports = {
  getRoutes,
};
