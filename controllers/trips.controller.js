const tripsService = require("../services/trips.service");

const getTrips = async (req, res) => {
  let routeId = req.params.routeId;
  let result = await tripsService.getTrips(routeId);
  result.errorMsg
    ? res.status(result.status).send({ error: result.errorMsg })
    : res.status(200).send(result);
};

module.exports = {
  getTrips,
};
