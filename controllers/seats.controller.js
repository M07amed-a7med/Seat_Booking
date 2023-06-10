const seatsService = require("../services/seats.service");

const bookSeat = async (req, res) => {
  const seat = req.body;
  let result = await seatsService.bookSeat(seat);
  result.errorMsg
    ? res.status(result.status).send({ error: result.errorMsg })
    : res.status(201).send(result);
};

const getSeats = async (req, res) => {
  let tripId = req.params.tripId;
  let result = await seatsService.getSeats(tripId, false);
  result.errorMsg
  ? res.status(result.status).send({ error: result.errorMsg })
  : res.status(200).send(result);
};

const getSeatsAdmin = async (req, res) => {
  let tripId = req.params.tripId;
  let result = await seatsService.getSeats(tripId, true);
  result.errorMsg
    ? res.status(result.status).send({ error: result.errorMsg })
    : res.status(200).send(result);
};

module.exports = {
  bookSeat,
  getSeats,
};
