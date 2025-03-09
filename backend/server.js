require("dotenv").config();
const express = require("express");

const cors = require("cors");
const rateLimiter = require("./src/middleware/rateLimiter");
const corsOptions = require("./src/middleware/corsOptions");
const { connectDB } = require("./src/config/database");

const app = express();
const PORT = process.env.PORT || 3500;

// connectDB();

// ################################################## MIDDLEWARE ##################################################

// Apply the rate limiter to all routes
app.use(rateLimiter);




app.use(cors(corsOptions));

// #################################################### ROUTES #####################################################

// app.use("/login", require("./src/controllers/loginRoute"));
// app.use("/register", require("./src/controllers/registerRoute"));
// app.use("/restaurants", require("./src/controllers/restaurantsRoute"));
// app.use("/reservations", require("./src/controllers/reservationsRoute"));
// app.use("/user/reservations", require("./src/controllers/usersRoute"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
