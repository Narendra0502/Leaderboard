const auth = require('./auth');
const errorHandler = require('./errorHandler');
const logger = require('./logger');
const { validateUser, validatePointClaim } = require('./validate');
const { apiLimiter, pointsLimiter } = require('./rateLimit');

module.exports = {
  auth,
  errorHandler,
  logger,
  validateUser,
  validatePointClaim,
  apiLimiter,
  pointsLimiter
};