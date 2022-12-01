const bcrypt = require('bcryptjs');
const customerRouter = require('express').Router();
const Customer = require('../models/customer');

// get All customer details just for testing
customerRouter.get('/', async (request, response) => {
  if (!request.employee && !request.customerId) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.employee.accessLevel === 1) {
    const customers = await Customer.find({}).populate('orders').populate('reservations');
    return response.json(customers);
  }
  return response
    .status(403)
    .json({ error: `Don't have permission to access this customer details` })
    .end();
});

// get single customer
customerRouter.get('/:id', async (request, response) => {
  let accessGranted = false;

  if (request.employee) {
    if (request.employee.accessLevel === 1) {
      accessGranted = true;
    }
  } else if (request.customerId) {
    if (request.params.id === request.customerId) {
      accessGranted = true;
    }
  } else {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  if (accessGranted) {
    const customer = await Customer.findById(request.params.id);
    if (customer) {
      return response.json(customer);
    }
    return response.status(404).json({ error: 'Customer is not available in database' }).end();
  }
  return response
    .status(403)
    .json({ error: `Don't have permission to access this customer details` })
    .end();
});
// for SignIn
customerRouter.post('/', async (request, response) => {
  const { firstName, lastName, phone, email, password } = request.body;

  const existingCustomer = await Customer.findOne({ email });
  if (existingCustomer) {
    return response.status(400).json({
      error: 'email must be unique',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const customer = new Customer({
    firstName,
    lastName,
    phone,
    email,
    passwordHash,
  });
  const savedCustomer = await customer.save();

  return response.status(201).json(savedCustomer);
});

// delete a customer
customerRouter.delete('/:id', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.employee.accessLevel === 1) {
    const deletedCustomer = await Customer.findByIdAndRemove(request.params.id);
    if (!deletedCustomer) {
      return response
        .status(404)
        .json({ error: `Couldn't delete as data is not available ` })
        .end();
    }

    return response.status(204).end();
  }
  return response
    .status(403)
    .json({ error: `Don't have permission to delete this customer details` })
    .end();
});

// update name,phoneNo
customerRouter.put('/updateBasic/:id', async (request, response) => {
  const { firstName, lastName, phone } = request.body;
  if (!request.customerId) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.params.id === request.customerId) {
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

    return response.json(updatedCustomer);
  }
  return response
    .status(403)
    .json({ error: `Don't have permission to modify this customer's details` })
    .end();
});
// add a address

customerRouter.put('/newAddress/:id', async (request, response) => {
  const { addressLine1, addressLine2, landmark, city, state, country, zip, tag } = request.body;
  if (!request.customerId) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.params.id === request.customerId) {
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

    return response.json(savedAddress);
  }
  return response
    .status(403)
    .json({ error: `Don't have permission to modify this customer's details` })
    .end();
});

// update address
customerRouter.put('/updateAddress/:id/:addressId', async (request, response) => {
  const { addressLine1, addressLine2, landmark, city, state, country, zip, tag } = request.body;
  if (!request.customerId) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.params.id === request.customerId) {
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
    if (updatedAddress === null) {
      return response.status(404).json({ error: `No address present at the given address id` });
    }

    return response.json(updatedAddress);
  }

  return response
    .status(403)
    .json({ error: `Don't have permission to modify this customer's details` })
    .end();
});

// delete a address
customerRouter.delete('/deleteAddress/:id/:addressId', async (request, response) => {
  if (!request.customerId) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.params.id === request.customerId) {
    const customer = await Customer.findById(request.params.id);

    const addressTodelete = customer.addresses.find((a) => a.id === request.params.addressId);

    if (addressTodelete) {
      customer.addresses.pull(request.params.addressId);
      await customer.save();

      return response.status(204).end();
    }
    return response.status(404).json({ error: `No address present or address already deleted` });
  }
  return response
    .status(403)
    .json({ error: `Don't have permission to modify this customer's details` })
    .end();
});

// update password
customerRouter.patch('/changePassword/:id', async (request, response) => {
  if (!request.customerId) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.customerId === request.params.id) {
    const customer = await Customer.findById(request.params.id);
    const { currentPassword, newPassword } = request.body;
    const passwordCorrect =
      customer === null ? false : await bcrypt.compare(currentPassword, customer.passwordHash);
    if (passwordCorrect) {
      const saltRounds = 10;
      const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);
      customer.passwordHash = newPasswordHash;
      const updatedPassword = await customer.save();
      return response.json(updatedPassword);
    }
    return response.status(400).json({ error: 'Password does not match' }).end();
  }
  return response
    .status(403)
    .json({ error: `Don't have permission to modify this customer's details` })
    .end();
});

module.exports = customerRouter;
