const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// Define the log directory path
const logDirectory = path.join(__dirname, "..", "logs");

// Function to log events
const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd  HH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    // Check if the log directory exists, and create it if it doesn't
    if (!fs.existsSync(logDirectory)) {
      await fsPromises.mkdir(logDirectory);
    }

    // Append the log item to the specified log file
    await fsPromises.appendFile(path.join(logDirectory, logName), logItem);
  } catch (err) {
    // Log the error to the console or an error log file
    console.log(err);
  }
};

// Middleware function for logging requests
const logger = async (req, res, next) => {
  // Skip logging for OPTIONS requests.
  // Because of CORS a preflight request is sent checking
  // if the actual request is permitted. This part skips the
  // OPTIONS events and logs the actual events.
  if (req.method === "OPTIONS") {
    return next();
  }

  res.on("finish", async () => {
    // Log the request details when the response is finished
    await logEvents(
      `${req.method}\t${req.headers.origin}\t${req.url}\t${res.statusCode}`,
      "reqLog.log"
    );
  });

  console.log(`${req.method} ${req.path}`);
  next();
};


module.exports = { logger, logEvents };
