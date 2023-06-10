const fs = require("fs");

const createUser = async (user) => {
  let usersData = fs.readFileSync("./mock-data/users.json");
  let users = JSON.parse(usersData);
  let newUser = { ...user };
  let userExists = users.some((user) => user.userName === newUser.userName);
  if (userExists) {
    return { errorMsg: `user ${user.userName} already exists`, status: 409 };
  }
  users.push(newUser);
  usersData = JSON.stringify(users);
  fs.writeFileSync("./mock-data/users.json", usersData);
  console.log(`User ${user.userName} added to the users data...`);
  return newUser;
};

module.exports = {
  createUser,
};
