const app = require('./app');
const config = require('./config/configVar');
const logger = require('./middlewares/logger');

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
