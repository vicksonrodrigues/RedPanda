require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// configs
const corsOptions = require('./config/corsOptions');
const config = require('./config/configVar');
// middleware
const morganMiddleware = require('./middlewares/morganMiddleware');
const { unknownEndpoint, errorHandler } = require('./middlewares/errorHandler');
const logger = require('./middlewares/logger');

// controllers
const reviewRouter = require('./controllers/reviews');
const eventRouter = require('./controllers/restaurantEvents');
const galleryRouter = require('./controllers/galleries');
const customerRouter = require('./controllers/customers');
const menuRouter = require('./controllers/menus');
const orderRouter = require('./controllers/orders');
const reservationRouter = require('./controllers/reservations');
const authRouter = require('./controllers/auth');
const employeeRouter = require('./controllers/employees');
const verifyJWT = require('./middlewares/verifyJWT');

const app = express();
mongoose.set('strictQuery', false);
if (process.env.NODE_ENV === 'development') {
  logger.info(`connecting to ${config.MONGODB_URI}`);
}
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(morganMiddleware);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('build'));
app.use(verifyJWT);
app.use('/customers', customerRouter);
app.use('/employees', employeeRouter);
app.use('/auth', authRouter);
app.use('/menu', menuRouter);
app.use('/reviews', reviewRouter);
app.use('/events', eventRouter);
app.use('/gallery', galleryRouter);
app.use('/reservations', reservationRouter);
app.use('/orders', orderRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
