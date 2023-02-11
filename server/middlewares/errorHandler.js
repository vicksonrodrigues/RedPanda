const logger = require('./logger');

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, request, response, next) => {
  logger.error(
    `${err.name}: ${err.message}\t${request.method}\t${request.url}\t${request.headers.origin}`,
  );

  const status = response.statusCode ? response.statusCode : 500; // server error

  response.status(status);

  response.json({ message: err.message, isError: true });

  next(err);
};

module.exports = { errorHandler, unknownEndpoint };
