const bcrypt = require('bcryptjs');
const customerRouter = require('express').Router();
const Customer = require('../models/customer');
// get All customer details
customerRouter.get('/', async (request, response) => {
  const customers = await Customer.find({}).populate('orders').populate('reservations');

  response.json(customers);
});
// get single customer
customerRouter.get('/:id', async (request, response) => {
  const customers = await Customer.findById(request.params.id);

  response.json(customers);
});
// for SignIn
customerRouter.post('/', async (request, response) => {
  const { firstName, lastName, phone, email, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const customer = new Customer({
    firstName,
    lastName,
    phone,
    email,
    passwordHash,
  });
  const savedUser = await customer.save();

  response.status(201).json(savedUser);
});

// delete a customer
customerRouter.delete('/:id', async (request, response) => {
  await Customer.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

// update name,phoneNo
customerRouter.put('/:id', async (request, response) => {
  const { firstName, lastName, phone } = request.body;

  const modifiedCustomer = {
    firstName,
    lastName,
    phone,
  };

  const updatedCustomer = await Customer.findByIdAndUpdate(request.params.id, modifiedCustomer, {
    new: true,
    runValidators: true,
    context: 'query',
  });

  response.json(updatedCustomer);
});
// add a address

customerRouter.put('/newAddress/:id', async (request, response) => {
  const { addressLine1, addressLine2, landmark, city, state, country, zip, tag } = request.body;
  const customer = await Customer.findById(request.params.id);

  const newAddress = {
    addressLine1,
    addressLine2,
    landmark,
    city,
    state,
    country,
    zip,
    tag,
  };

  customer.addresses.push(newAddress);
  const savedAddress = await customer.save();

  response.json(savedAddress);
  response.json(customer);
});

// update address
customerRouter.put('/updateAddress/:id/:addressId', async (request, response) => {
  const { addressLine1, addressLine2, landmark, city, state, country, zip, tag } = request.body;

  const newAddress = {
    _id: request.params.addressId,
    addressLine1,
    addressLine2,
    landmark,
    city,
    state,
    country,
    zip,
    tag,
  };

  const updatedAddress = await Customer.findOneAndUpdate(
    {
      _id: request.params.id,
      'addresses._id': request.params.addressId,
    },
    {
      $set: {
        'addresses.$': newAddress,
      },
    },
    {
      new: true,
      runValidators: true,
      context: 'query',
    },
  );

  response.json(updatedAddress);
});

// delete a address
customerRouter.delete('/deleteAddress/:id/:addressId', async (request, response) => {
  const customer = await Customer.findById(request.params.id);
  customer.addresses.id(request.params.addressId).remove();
  const savedAddress = await customer.save();

  response.json(savedAddress);
});

// update password
customerRouter.put('/changePassword/:id', async (request, response) => {
  const customer = await Customer.findById(request.params.id);
  const { currentPassword, newPassword } = request.body;
  const passwordCorrect =
    customer === null ? false : await bcrypt.compare(currentPassword, customer.passwordHash);
  if (passwordCorrect) {
    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);
    customer.passwordHash = newPasswordHash;
    const updatedPassword = await customer.save();
    response.json(updatedPassword);
  } else {
    response.status(400).json('No Match Password').end();
  }
});

module.exports = customerRouter;
