const bcrypt = require('bcryptjs');
const Customer = require('../../models/customer');

const customerList = [
  {
    firstName: 'dummyfirst',
    lastName: 'dummylast',
    email: 'dummyfirst.dummylast@gmail.com',
    phone: '9087654321',
    password: '123456789xyz',
  },
  {
    firstName: 'xyzfirst',
    lastName: 'xyzlast',
    email: 'xyzfirst.xyzlast@gmail.com',
    phone: '9012345678',
    password: '123456789abc',
  },
];

const multipleCustomer = async (customers) => {
  await Promise.all(
    customers.map(async (customer) => {
      const { firstName, lastName, email, phone, password } = customer;
      const passwordHash = await bcrypt.hash(password, 10);
      const newCustomer = new Customer({ firstName, lastName, email, phone, passwordHash });
      await newCustomer.save();
    }),
  );
};
const nonExistingId = async () => {
  const passwordHash = await bcrypt.hash('123456789dfg', 10);
  const customer = new Customer({
    firstName: 'removefirst',
    lastName: 'removelast',
    email: 'removefirst.removelast@gmail.com',
    phone: '9876543210',
    passwordHash,
  });
  await customer.save();
  await customer.remove();
  return customer._id.toString();
};
const customersInDb = async () => {
  const customers = await Customer.find({});
  return customers.map((customer) => customer.toJSON());
};

module.exports = {
  customersInDb,
  multipleCustomer,
  customerList,
  nonExistingId,
};
