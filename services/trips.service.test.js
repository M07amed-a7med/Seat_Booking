const fs = require("fs");
jest.mock("fs");
const tripsService = require("./trips.service");

describe("Trips Service", () => {
  test("should return array of trips", async () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValueOnce(
        JSON.stringify([
          {
            id: "J2M",
            from: "Jumairah",
            To: "Marina",
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
    const result = await tripsService.getTrips("J2M");
    expect(Array.isArray(result)).toBe(true);
    expect(result).toContainEqual({
      id: "MON1030AMJ2M",
      hour: "10:30 AM",
      day: "Monday",
      routeId: "J2M",
      noOfSeats: 7,
    });
  });

  test("should return error because route doesn't exist", async () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValueOnce(
        JSON.stringify([
          {
            id: "J2M",
            from: "Jumairah",
            To: "Marina",
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
    const result = await tripsService.getTrips("J2N");
    expect(result).toEqual({
      errorMsg: `route J2N doesn't exist`,
      status: 404,
    });
  });
});
