const fs = require("fs");
//---
const bookSeat = async (seat) => {
  //check if user is valid
  let usersData = fs.readFileSync("./mock-data/users.json");
  let users = JSON.parse(usersData);
  let userExists = users.some((user) => user.userName === seat.userName);

  if (!userExists) {
    return { errorMsg: `user ${seat.userName} doesn't exist`, status: 404 };
  }
  //check if tripId is valid
  let tripsData = fs.readFileSync("./mock-data/trips.json");
  let trips = JSON.parse(tripsData);
  let trip = trips.find((trip) => trip.id === seat.tripId);
  if (!trip) {
    return { errorMsg: `trip ${seat.tripId} doesn't exist`, status: 404 };
  }
  //check if seatNo is valid
  if (seat.seatNo < 1 || seat.seatNo > trip.noOfSeats) {
    return { errorMsg: `wrong seat number`, status: 404 };
  }
  let seatsData = fs.readFileSync("./mock-data/seats.json");
  let bookedSeats = JSON.parse(seatsData);
  //check if seatNo is already booked
  let alreadyBooked = bookedSeats.find((s) => s.seatNo === seat.seatNo);
  if (alreadyBooked) {
    return {
      errorMsg: `seat Number: ${seat.seatNo} already booked`,
      status: 409,
    };
  }
  let newBooking = { ...seat, status: "booked" };
  bookedSeats.push(newBooking);
  seatsData = JSON.stringify(bookedSeats);
  fs.writeFileSync("./mock-data/seats.json", seatsData);
  console.log(`Seat #${seat.seatNo} was booked by ${seat.userName}...`);
  return newBooking;
};

const getSeats = async (tripId, isAdmin) => {
  let tripsData = fs.readFileSync("./mock-data/trips.json");
  let trips = JSON.parse(tripsData);
  let trip = trips.find((trip) => trip.id === tripId);
  if (!trip) {
    return { errorMsg: `trip ${tripId} doesn't exist`, status: 404 };
  }
  let tripSeats = [];
  let seatsData = fs.readFileSync("./mock-data/seats.json");
  let bookedSeats = JSON.parse(seatsData);
  bookedSeats = bookedSeats.filter((seat) => {
    return seat.tripId === tripId;
  });

  tripSeats = [...Array(trip.noOfSeats).keys()].map((seat) => {
    return { seatNo: seat + 1, tripId: tripId, status: "available" };
  });
  // tripSeats[0] = { ...tripSeats[0], status: "driver" };
  bookedSeats.forEach((seat) => {
    tripSeats[seat.seatNo - 1] = {
      ...seat,
      userName: isAdmin ? seat.userName : undefined,
      status: "booked",
    };
  });

  return tripSeats;
};

module.exports = {
  bookSeat,
  getSeats,
};
