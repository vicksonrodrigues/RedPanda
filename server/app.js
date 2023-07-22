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
app.use('/api/customers', customerRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/auth', authRouter);
app.use('/api/menu', menuRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/events', eventRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/orders', orderRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
