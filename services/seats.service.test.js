const fs = require("fs");
jest.mock("fs");
const seatsService = require("./seats.service");

describe("Seats Service", () => {
  test("getSeats => should return array of seats", async () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValueOnce(
        JSON.stringify([
          {
            id: "MON1030AMJ2M",
            hour: "10:30 AM",
            day: "Monday",
            routeId: "J2M",
            noOfSeats: 7,
          },
        ])
      )
      .mockReturnValueOnce(
        JSON.stringify([
          {
            seatNo: 1,
            tripId: "MON1030AMJ2M",
            userName: "MohamedAhmed",
            status: "booked",
          },
        ])
      );
    const result = await seatsService.getSeats("MON1030AMJ2M", false);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toContainEqual({
      seatNo: 1,
      tripId: "MON1030AMJ2M",
      status: "booked"
    });
  });

  test("getSeats => should return error because trip doesn't exist", async () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValueOnce(
        JSON.stringify([
          {
            id: "MON1030AMJ2M",
            hour: "10:30 AM",
            day: "Monday",
            routeId: "J2M",
            noOfSeats: 7,
          },
        ])
      )
      .mockReturnValueOnce(
        JSON.stringify([
          {
            seatNo: 1,
            tripId: "MON1030AMJ2M",
            userName: "MohamedAhmed",
            status: "booked",
          },
        ])
      );
    const result = await seatsService.getSeats("MON1035AMJ2M", false);
    expect(result).toEqual({
      errorMsg: `trip MON1035AMJ2M doesn't exist`,
      status: 404,
    });
  });

  test("bookSeat => should return seatBooking", async () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValueOnce(
        JSON.stringify([
          {
            userName: "Mohamed",
          },
        ])
      )
      .mockReturnValueOnce(
        JSON.stringify([
          {
            id: "MON1030AMJ2M",
            hour: "10:30 AM",
            day: "Monday",
            routeId: "J2M",
            noOfSeats: 7,
          },
        ])
      )
      .mockReturnValueOnce(
        JSON.stringify([
          {
            seatNo: 1,
            tripId: "MON1030AMJ2M",
            userName: "MohamedAhmed",
            status: "booked",
          },
        ])
      );
    const result = await seatsService.bookSeat({
      userName: "Mohamed",
      tripId: "MON1030AMJ2M",
      seatNo: 4,
    });
    expect(result).toEqual({
      userName: "Mohamed",
      tripId: "MON1030AMJ2M",
      seatNo: 4,
      status: "booked",
    });
  });

  test("bookSeat => should return error because of invalid user", async () => {
    fs.readFileSync = jest.fn().mockReturnValueOnce(
      JSON.stringify([
        {
          userName: "Mohamed",
        },
      ])
    );
    const result = await seatsService.bookSeat({
      userName: "Mohamed1",
      tripId: "MON1030AMJ2M",
      seatNo: 4,
    });
    expect(result).toEqual({
      errorMsg: `user Mohamed1 doesn't exist`,
      status: 404,
    });
  });

  test("bookSeat => should return an error because of invalid trip", async () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValueOnce(
        JSON.stringify([
          {
            userName: "Mohamed",
          },
        ])
      )
      .mockReturnValueOnce(
        JSON.stringify([
          {
            id: "MON1030AMJ2M",
            hour: "10:30 AM",
            day: "Monday",
            routeId: "J2M",
            noOfSeats: 7,
          },
        ])
      );
    const result = await seatsService.bookSeat({
      userName: "Mohamed",
      tripId: "MON1030AMJ2N",
      seatNo: 4,
    });
    expect(result).toEqual({
      errorMsg: `trip MON1030AMJ2N doesn't exist`,
      status: 404,
    });
  });

  test("bookSeat => should return an error because of already booked seat", async () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValueOnce(
        JSON.stringify([
          {
            userName: "Mohamed",
          },
        ])
      )
      .mockReturnValueOnce(
        JSON.stringify([
          {
            id: "MON1030AMJ2M",
            hour: "10:30 AM",
            day: "Monday",
            routeId: "J2M",
            noOfSeats: 7,
          },
        ])
      )
      .mockReturnValueOnce(
        JSON.stringify([
          {
            seatNo: 1,
            tripId: "MON1030AMJ2M",
            userName: "MohamedAhmed",
            status: "booked",
          },
        ])
      );
    const result = await seatsService.bookSeat({
      userName: "Mohamed",
      tripId: "MON1030AMJ2M",
      seatNo: 1,
    });
    expect(result).toEqual({
      errorMsg: `seat Number: 1 already booked`,
      status: 409,
    });
  });
  test("bookSeat => should return an error because of wrong seat number", async () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValueOnce(
        JSON.stringify([
          {
            userName: "Mohamed",
          },
        ])
      )
      .mockReturnValueOnce(
        JSON.stringify([
          {
            id: "MON1030AMJ2M",
            hour: "10:30 AM",
            day: "Monday",
            routeId: "J2M",
            noOfSeats: 7,
          },
        ])
      )
      .mockReturnValueOnce(
        JSON.stringify([
          {
            seatNo: 1,
            tripId: "MON1030AMJ2M",
            userName: "MohamedAhmed",
            status: "booked",
          },
        ])
      );
    const result = await seatsService.bookSeat({
      userName: "Mohamed",
      tripId: "MON1030AMJ2M",
      seatNo: 10,
    });
    expect(result).toEqual({ errorMsg: `wrong seat number`, status: 400 });
  });
});
