/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const Customer = require('../models/customer');
const Employee = require('../models/employee');
const configVar = require('../config/configVar');
const loginLimiter = require('../middlewares/loginLimiter');

// customer auth routes
loginRouter.post('/login', loginLimiter, async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return response.status(400).json({ error: 'All fields are required' });
  }

  const customer = await Customer.findOne({ email });
  const passwordCorrect =
    customer === null ? false : await bcrypt.compare(password, customer.passwordHash);

  if (!(customer && passwordCorrect)) {
    return response.status(404).json({
      error: 'No User Found: Check your Email or Password',
    });
  }

  const accessToken = jwt.sign(
    {
      email: customer.email,
      id: customer._id,
      belong: 'customer',
    },
    configVar.ACCESS_TOKEN_SECRET,
    { expiresIn: '30m' },
  );
  const refreshToken = jwt.sign(
    { email: customer.email, id: customer._id },
    configVar.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '10m',
    },
  );

  // Create secure cookie with refresh token
  response.cookie('jwt', refreshToken, {
    httpOnly: true, // accessible only by web server
    // secure: true, // https
    sameSite: 'Lax', // cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry: set to match rT
  });
  response.json({ accessToken });
});

loginRouter.get('/refresh', async (request, response) => {
  const { cookies } = request;

  if (!cookies?.jwt) return response.status(401).json({ error: 'Session Expired' });

  const refreshToken = cookies.jwt;
  // verify the cookie
  jwt.verify(refreshToken, configVar.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return response.status(401).json({ error: 'Unauthorized' });
    }
    const foundCustomer = await Customer.findOne({ email: decoded.email }).exec();

    if (!foundCustomer) {
      return response.status(401).json({ error: 'Invalid Token' });
    }

    const accessToken = jwt.sign(
      {
        email: foundCustomer.email,
        id: foundCustomer._id,
        belong: 'customer',
      },
      configVar.ACCESS_TOKEN_SECRET,
      { expiresIn: '5m' },
    );

    return response.json({ accessToken });
  });
});

loginRouter.post('/logout', async (request, response) => {
  const { cookies } = request;
  if (!cookies?.jwt) return response.sendStatus(204); // No content
  response.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  response.json({ message: 'Cookie cleared' });
});

// do same changes as customer logins
// employee auth routes
loginRouter.post('/employeeLogin', async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return response.status(400).json({ message: 'All fields are required' });
  }

  const employee = await Employee.findOne({ email });
  const passwordCorrect =
    employee === null ? false : await bcrypt.compare(password, employee.passwordHash);

  if (!(employee && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid email or password',
    });
  }

  const accessToken = jwt.sign(
    {
      email: employee.email,
      id: employee._id,
      accessLevel: employee.accessLevel,
      belong: 'employee',
    },
    configVar.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' },
  );
  const refreshToken = jwt.sign(
    { email: employee.email, id: employee._id },
    configVar.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d',
    },
  );

  // Create secure cookie with refresh token
  response.cookie('jwtEmployee', refreshToken, {
    httpOnly: true, // accessible only by web server
    // secure: true, // https
    sameSite: 'None', // cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry: set to match rT
  });

  response.json({ accessToken });
});

loginRouter.get('/employeeRefresh', async (request, response) => {
  const { cookies } = request;

  if (!cookies?.jwtEmployee) return response.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.jwt;

  jwt.verify(refreshToken, configVar.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return response.status(403).json({ message: 'Forbidden' });
    }

    const foundEmployee = await Employee.findOne({ username: decoded.email }).exec();

    if (!foundEmployee) {
      return response.status(401).json({ message: 'Unauthorized' });
    }

    const accessToken = jwt.sign(
      {
        email: foundEmployee.email,
        id: foundEmployee._id,
        accessLevel: foundEmployee.accessLevel,
        belong: 'employee',
      },
      configVar.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' },
    );

    response.json({ accessToken });
  });
});

// employee Logout
loginRouter.post('/employeeLogout', async (request, response) => {
  const { cookies } = request;
  if (!cookies?.jwtEmployee) return response.sendStatus(204); // No content
  response.clearCookie('jwtEmployee', { httpOnly: true, sameSite: 'None', secure: true });
  response.json({ message: 'Cookie cleared' });
});

module.exports = loginRouter;
