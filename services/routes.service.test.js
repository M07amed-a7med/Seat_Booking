const fs = require("fs");
jest.mock("fs");
const routesService = require("./routes.service");

describe("Routes Service", () => {
  test("should return array of routes", async () => {
    fs.readFileSync = jest.fn().mockReturnValue(
      JSON.stringify([
        {
          id: "A2D",
          from: "Abu-Dhabi",
          To: "Dubaii",
        },
      ])
    );
    const result = await routesService.getRoutes();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toContainEqual({
      id: "A2D",
      from: "Abu-Dhabi",
      To: "Dubaii",
    });
  });
});
