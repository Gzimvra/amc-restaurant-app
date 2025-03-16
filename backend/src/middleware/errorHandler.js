const { logEvents } = require('./eventHandler');

const errorHandler = (err, req, res, next) => {
  // Log the error with additional context (request method and URL)
  logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}`, 'errLog.log');

  // Log the error stack trace to the console
  console.error(err.stack);

  // Send an error response with the appropriate status code
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send(err.message);
};

// Export the error handler function
module.exports = errorHandler;
