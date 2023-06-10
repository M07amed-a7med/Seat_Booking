const request = require("supertest");
const baseURL = "http://localhost:3000";
const fs = require("fs");
jest.mock("fs");
const userService = require("./users.service");

describe("Test Users Service", () => {
  test("should return newUser", async () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify([{ userName: "MohamedAhmed13" }]));
    let user = { userName: "MohamedAhmed12" };
    const result = await userService.createUser(user);
    expect(result).toEqual({ userName: "MohamedAhmed12" });
  });

  test("should return an error because the user already exists", async () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify([{ userName: "MohamedAhmed13" }]));
    let user = { userName: "MohamedAhmed13" };
    const result = await userService.createUser(user);
    expect(result).toEqual({
      errorMsg: `user MohamedAhmed13 already exists`,
      status: 409,
    });
  });
});
