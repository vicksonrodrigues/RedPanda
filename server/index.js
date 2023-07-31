const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/configVar');
const logger = require('./middlewares/logger');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    if (process.env.NODE_ENV === 'development') {
      logger.info(`connecting to ${config.MONGODB_URI}`);
    }
    const conn = await mongoose.connect(config.MONGODB_URI);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    console.log('connected to MongoDB');
  } catch (error) {
    logger.error('error connecting to MongoDB:', error.message);
  }
};
connectDB().then(() => {
  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
    console.log(`Server running on port ${config.PORT}`);
  });
});
