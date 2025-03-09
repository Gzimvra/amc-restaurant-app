require("dotenv").config();

// Get the allowed origins from the environment variable and split them into an array
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) { 
      // If the origin is in the allowed list or the request has no origin, allow the request
      callback(null, true);
    } else {
      // Return an error with a clear message
      callback(new Error(`CORS Error: Origin ${origin} is not allowed by CORS`));
    }
  },
  credentials: true, // Allow cookies and credentials
  optionsSuccessStatus: 200, // Some legacy browsers (e.g., IE11) choke on 204
};

module.exports = corsOptions;
