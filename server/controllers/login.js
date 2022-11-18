const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const Customer = require('../models/customer');
const config = require('../utils/config');

loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const customer = await Customer.findOne({ email });
  const passwordCorrect =
    customer === null ? false : await bcrypt.compare(password, customer.passwordHash);

  if (!(customer && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const customerForToken = {
    email: customer.email,
    // eslint-disable-next-line no-underscore-dangle
    id: customer._id,
  };

  const token = jwt.sign(customerForToken, config.SECRET);
  return response.status(200).send({ token, email: customer.email, firstName: customer.firstName });
});

module.exports = loginRouter;
