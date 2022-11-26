const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./testHelper/customer_test_helper');

const app = require('../app');

const api = supertest(app);

const Customer = require('../models/customer');

describe('for customer api', () => {
  describe('adding a new Customer ', () => {
    beforeEach(async () => {
      await Customer.deleteMany({});
    });
    test('succeeds with valid data', async () => {
      const newCustomer = {
        firstName: 'dummyfirst',
        lastName: 'dummylast',
        email: 'dummyfirst.dummylast@gmail.com',
        phone: '9087654321',
        password: '123456789xyz',
      };

      await api
        .post('/api/customers')
        .send(newCustomer)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const customer = await helper.customersInDb();
      expect(customer).toHaveLength(1);
      const email = customer.map((n) => n.email);
      expect(email).toContain('dummyfirst.dummylast@gmail.com');
    });

    test('fails with status code 400 if first name is invalid', async () => {
      const newCustomer = {
        firstName: 'd',
        lastName: 'dummylast',
        email: 'dummyfirst.dummylast@gmail.com',
        phone: '9087654321',
        password: '123456789xyz',
      };

      const result = await api.post('/api/customers').send(newCustomer).expect(400);
      expect(result.body.error).toContain('Name should contain at least two characters!');

      const customersAtEnd = await helper.customersInDb();

      expect(customersAtEnd).toHaveLength(0);
    });

    test('fails with status code 400 if email is invalid', async () => {
      const newCustomer = {
        firstName: 'dummyfirst',
        lastName: 'dummylast',
        email: 'dummyfirst.dummylast@gmailcom',
        phone: '9087654321',
        password: '123456789xyz',
      };

      const result = await api.post('/api/customers').send(newCustomer).expect(400);
      expect(result.body.error).toContain('should match the correct format for email address');

      const customersAtEnd = await helper.customersInDb();

      expect(customersAtEnd).toHaveLength(0);
    });

    test('fails with status code 400 if phone number is invalid', async () => {
      const newCustomer = {
        firstName: 'dummyfirst',
        lastName: 'dummylast',
        email: 'dummyfirst.dummylast@gmail.com',
        phone: '90876543sc',
        password: '123456789xyz',
      };

      const result = await api.post('/api/customers').send(newCustomer).expect(400);
      expect(result.body.error).toContain('should follow the correct format for phone number');

      const customersAtEnd = await helper.customersInDb();

      expect(customersAtEnd).toHaveLength(0);
    });
    test('creation fails with proper statuscode and message if email is already taken', async () => {
      await helper.multipleCustomer(helper.customerList);
      const customersAtStart = await helper.customersInDb();

      const newCustomer = {
        firstName: 'dummyfirst',
        lastName: 'dummylast',
        email: 'dummyfirst.dummylast@gmail.com',
        phone: '9087654321',
        password: '123456789xyz',
      };

      const result = await api
        .post('/api/customers')
        .send(newCustomer)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain('email must be unique');

      const customersAtEnd = await helper.customersInDb();
      expect(customersAtEnd).toHaveLength(customersAtStart.length);
    });
  });
  describe('fetching data from database', () => {
    beforeEach(async () => {
      await Customer.deleteMany({});
      await helper.multipleCustomer(helper.customerList);
    });

    test('customer is returned as json', async () => {
      await api
        .get('/api/customers')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('succeeds with a valid id', async () => {
      const customerAtStart = await helper.customersInDb();
      const customerToView = customerAtStart[0];

      const resultCustomer = await api
        // eslint-disable-next-line no-underscore-dangle
        .get(`/api/customers/${customerToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const processedCustomerToView = JSON.parse(JSON.stringify(customerToView));

      expect(resultCustomer.body).toEqual(processedCustomerToView);
    });
    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';

      await api.get(`/api/customers/${invalidId}`).expect(400);
    });

    test('fails with statuscode 404 if customer does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId();

      await api.get(`/api/customers/${validNonexistingId}`).expect(404);
    });
  });

  describe('deletion of a customer', () => {
    beforeEach(async () => {
      await Customer.deleteMany({});
      await helper.multipleCustomer(helper.customerList);
    });
    test('succeeds with status code 204 if id is valid', async () => {
      const customersAtStart = await helper.customersInDb();
      const customerToDelete = customersAtStart[0];

      await api.delete(`/api/customers/${customerToDelete.id}`).expect(204);

      const customersAtEnd = await helper.customersInDb();

      expect(customersAtEnd).toHaveLength(helper.customerList.length - 1);

      const emails = customersAtEnd.map((r) => r.email);

      expect(emails).not.toContain(customerToDelete.email);
    });
    test('fails with status code 404 if customer does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId();

      await api.delete(`/api/customers/${validNonexistingId}`).expect(404);
    });
  });

  describe('Updating a customer details', () => {
    beforeEach(async () => {
      await Customer.deleteMany({});
      await helper.multipleCustomer(helper.customerList);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
