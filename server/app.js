const express = require('express');
require('express-async-errors');

const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./utils/config');
const {
  errorHandler,
  customerExtractor,
  requestLogger,
  unknownEndpoint,
  employeeExtractor,
} = require('./utils/middleware');
const logger = require('./utils/logger');
const reviewRouter = require('./controllers/reviews');
const eventRouter = require('./controllers/restaurantEvents');
const galleryRouter = require('./controllers/galleries');
const customerRouter = require('./controllers/customers');
const menuRouter = require('./controllers/menus');
const orderRouter = require('./controllers/orders');
const reservationRouter = require('./controllers/reservations');
const loginRouter = require('./controllers/login');
const employeeRouter = require('./controllers/employees');

const app = express();

logger.info('connecting to', config.MONGODB_URI);

const connectDB = async () => {
  await mongoose
    .connect(config.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .catch((error) => {
      logger.error('error connection to MongoDB:', error.message);
    });
};

connectDB();

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use('/api/customers', customerExtractor, customerRouter);
app.use('/api/employees', employeeExtractor, employeeRouter);
app.use('/api/login', loginRouter);
app.use('/api/menu', menuRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/events', eventRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/orders', orderRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
