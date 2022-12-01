const jwt = require('jsonwebtoken');
const logger = require('./logger');
const Employee = require('../models/employee');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id',
    });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    });
  }
  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    });
  }

  next(error);
};

// eslint-disable-next-line consistent-return
const tokenExtractor = async (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    if (decodedToken.belong === 'customer') {
      console.log('Customer token recieved and verified');
      request.customerId = decodedToken.id;
    }

    if (decodedToken.belong === 'employee') {
      const employee = await Employee.findById(decodedToken.id);
      request.employee = employee.toJSON();
    }
  }
  next();
};

module.exports = {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler,
};
