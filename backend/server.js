require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const rateLimiter = require("./src/middleware/rateLimiter");
const corsOptions = require("./src/middleware/corsOptions");
const verifyToken = require("./src/middleware/verifyToken");
const { connectDB, closeDB } = require("./src/config/database");

const app = express();
const PORT = process.env.SERVER_PORT || 3500;

connectDB();

// ################################################## MIDDLEWARE ##################################################

app.use(rateLimiter);
app.use(cors(corsOptions));
app.use(compression());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

// #################################################### PUBLIC ROUTES ####################################################

app.use("/auth", require("./src/routes/authRoute"));

// ################################################### PROTECTED ROUTES ##################################################

// Verify the jwt token
app.use(verifyToken);

app.use("/restaurants", require("./src/routes/restaurantsRoute"));
app.use("/reservations", require("./src/routes/reservationsRoute"));
app.use("/user", require("./src/routes/usersRoute"));

// ############################### 404 HANDLER ################################

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// ############################################# SERVER START/SHUTDOWN ############################################

// Graceful Shutdown Function
const shutdown = async (signal) => {
  console.log(`\nReceived ${signal}. Shutting down...`);

  if (server) {
    server.close(() => {
      console.log("Server closed.");

      closeDB()
        .then(() => {
          console.log("Database connection closed.");
          setTimeout(() => process.exit(0), 100); // Small delay to allow logs to flush
        })
        .catch((err) => {
          console.error("Error closing database:", err.message);
          setTimeout(() => process.exit(1), 100);
        });
    });
  } else {
    setTimeout(() => process.exit(0), 100);
  }
};

// Listen for termination signals
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

const server = app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
