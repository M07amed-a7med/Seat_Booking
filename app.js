const express = require("express");

const usersRoutes = require("./routes/users");
const routesRoutes = require("./routes/routes");
const tripsRoutes = require("./routes/trips");
const seatsRoutes = require("./routes/seats");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/users", usersRoutes);
app.use("/routes", routesRoutes);
app.use("/trips", tripsRoutes);
app.use("/seats", seatsRoutes);
app.get("/", (req, res) => res.send("Welcome to the Seat Booking API!"));
app.all("*", (req, res) =>
  res.status(404).send("You've tried reaching a route that doesn't exist.")
);

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
