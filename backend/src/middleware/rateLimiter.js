const rateLimit = require('express-rate-limit');

// Rate Limiter Middleware
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `windowMs`
  message: "Too many requests, please try again in 15 minutes",
  headers: true, // Send rate limit info in the `RateLimit-*` headers
});

module.exports = rateLimiter;
