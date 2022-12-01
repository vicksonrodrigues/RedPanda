const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../utils/config');
const Customer = require('../../models/customer');

const sampleCustomer = [
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
const initialCustomer = async (customers) => {
  await Promise.all(
    customers.map(async (customer) => {
      const { firstName, lastName, email, phone, password, addresses } = customer;
      const passwordHash = await bcrypt.hash(password, 10);
      const newCustomer = new Customer({
        firstName,
        lastName,
        email,
        phone,
        passwordHash,
        addresses,
      });
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

const customerToken = async (email, password) => {
  const customer = await Customer.findOne({ email });

  const passwordCorrect =
    customer === null ? false : await bcrypt.compare(password, customer.passwordHash);

  if (!(customer && passwordCorrect)) {
    return null;
  }
  const customerForToken = {
    email: customer.email,
    id: customer._id,
    belong: 'customer',
  };
  const token = jwt.sign(customerForToken, config.SECRET);

  return token;
};

const customerDummyAddress = async (email) => {
  const customer = await Customer.findOne({ email });
  const newAddress1 = {
    addressLine1: 'C-402,Seaview chs',
    addressLine2: 'Sector-13E,Vashi',
    landmark: 'Opp. Dmart',
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    country: 'India',
    zip: '410681',
    tag: 'Home',
  };
  const newAddress2 = {
    addressLine1: 'A-703,BirdNest chs',
    addressLine2: 'Sector-17E,Kharghar',
    landmark: 'Opp. kmart',
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    country: 'India',
    zip: '410681',
    tag: 'Office',
  };
  customer.addresses.push(newAddress1, newAddress2);
  await customer.save();
};
const nonExistingAddressId = async (email) => {
  const customer = await Customer.findOne({ email });
  const newAddress = {
    addressLine1: 'C-203,heramba chs',
    addressLine2: 'Sector-13E,Vashi',
    landmark: 'Opp. Dmart',
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    country: 'India',
    zip: '410681',
    tag: 'office 2',
  };
  customer.addresses.push(newAddress);
  const savedCustomer = await customer.save();
  const savedCopy = JSON.parse(JSON.stringify(savedCustomer));
  customer.addresses.pull(savedCopy.addresses[2]._id.toString());
  await customer.save();
  return savedCopy.addresses[2]._id.toString();
};

module.exports = {
  customersInDb,
  initialCustomer,
  sampleCustomer,
  nonExistingId,
  customerToken,
  customerDummyAddress,
  nonExistingAddressId,
};
