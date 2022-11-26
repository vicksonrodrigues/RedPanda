const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const Customer = require('../models/customer');
const Employee = require('../models/employee');
const config = require('../utils/config');

loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const customer = await Customer.findOne({ email });
  const passwordCorrect =
    customer === null ? false : await bcrypt.compare(password, customer.passwordHash);

  if (!(customer && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid email or password',
    });
  }

  const customerForToken = {
    email: customer.email,
    id: customer._id,
  };
  const token = jwt.sign(customerForToken, config.SECRET);
  return response.status(200).send({ token, email: customer.email, firstName: customer.firstName });
});

loginRouter.post('/employees', async (request, response) => {
  const { email, password } = request.body;

  const employee = await Employee.findOne({ email });
  const passwordCorrect =
    employee === null ? false : await bcrypt.compare(password, employee.passwordHash);

  if (!(employee && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid email or password',
    });
  }

  const customerForToken = {
    email: employee.email,
    id: employee._id,
  };
  const token = jwt.sign(customerForToken, config.SECRET);
  return response.status(200).send({ token, email: employee.email, firstName: employee.firstName });
});

module.exports = loginRouter;
