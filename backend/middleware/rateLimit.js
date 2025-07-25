const rateLimit = require('express-rate-limit');

// Create rate limiters
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

const pointsLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 point claims per minute
  message: 'Too many point claims, please try again after a minute'
});

module.exports = {
  apiLimiter,
  pointsLimiter
};