require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimiter = require("./src/middleware/rateLimiter");
const corsOptions = require("./src/middleware/corsOptions");
const { connectDB, closeDB } = require("./src/config/database");

const app = express();
const PORT = process.env.PORT || 3500;

// connectDB();

// ################################################## MIDDLEWARE ##################################################

// Apply the rate limiter to all routes
app.use(rateLimiter);
app.use(cors(corsOptions));

// #################################################### ROUTES #####################################################

// app.use("/login", require("./src/route/loginRoute"));
// app.use("/register", require("./src/route/registerRoute"));
// app.use("/restaurants", require("./src/route/restaurantsRoute"));
// app.use("/reservations", require("./src/route/reservationsRoute"));
// app.use("/user/reservations", require("./src/route/usersRoute"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// #################################################### SERVER START/SHUTDOWN #####################################################

// Graceful Shutdown Function
const shutdown = async (signal) => {
  console.log(`\nReceived ${signal}. Shutting down...`);

  if (server) {
    server.close(() => {
      console.log("Server closed.");
      // closeDB().then(() => {
      //   console.log("Database connection closed.");
      // }).catch((err) => {
      //   console.error("Error closing database:", err.message);
      //   process.exit(1);
      // });
    });
  }
  
  process.exit(0);
};

// Listen for termination signals
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

const server = app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
