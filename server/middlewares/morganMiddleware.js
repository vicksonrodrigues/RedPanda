const morgan = require('morgan');
const logger = require('./logger');

const stream = {
  // Use the http severity
  write: (message) => logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

const morganMiddleware = morgan('tiny', { stream, skip });

module.exports = morganMiddleware;
