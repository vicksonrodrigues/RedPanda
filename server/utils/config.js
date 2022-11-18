require('dotenv').config();

const { PORT } = process.env;
const { MONGODB_URI } = process.env;
const { SECRET } = process.env;

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
};
