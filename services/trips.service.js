const fs = require("fs");

const getTrips = (routeId) => {
  let routesData = fs.readFileSync("./mock-data/routes.json");
  let routes = JSON.parse(routesData);
  let route = routes.some((route) => route.id === routeId);
  if (!route) {
    return { errorMsg: `route ${routeId} doesn't exist`, status: 404 };
  }
  let tripsData = fs.readFileSync("./mock-data/trips.json");
  let trips = JSON.parse(tripsData);
  trips = trips.filter((trip) => {
    return trip.routeId === routeId;
  });
  return trips;
};

module.exports = {
  getTrips,
};
