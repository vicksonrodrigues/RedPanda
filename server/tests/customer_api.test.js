const supertest = require('supertest');
const mongoose = require('mongoose');
const customerHelper = require('./testHelper/customer_test_helper');
const employeeHelper = require('./testHelper/employee_test_helper');

const app = require('../app');

const api = supertest(app);

const Customer = require('../models/customer');
const Employee = require('../models/employee');

const adminLogin = {
  email: 'adminfirst@gmail.com',
  password: '123456789xyz',
};

const customerLogin1 = {
  email: 'dummyfirst.dummylast@gmail.com',
  password: '123456789xyz',
};

const customerLogin2 = {
  email: 'xyzfirst.xyzlast@gmail.com',
  password: '123456789abc',
};
describe('for customer api', () => {
  beforeEach(async () => {
    await Customer.deleteMany({});
    await Employee.deleteMany({});
    await customerHelper.initialCustomer(customerHelper.sampleCustomer);
    await employeeHelper.initalEmployee(employeeHelper.sampleEmployee);
  });
  describe('adding a new Customer ', () => {
    test('succeeds with valid data', async () => {
      const newCustomer = {
        firstName: 'testfirst',
        lastName: 'testlast',
        email: 'testfirst.testlast32@gmail.com',
        phone: '9865327410',
        password: '987654321xyz',
      };

      await api
        .post('/api/customers')
        .send(newCustomer)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const customer = await customerHelper.customersInDb();
      expect(customer).toHaveLength(3);
      const email = customer.map((n) => n.email);
      expect(email).toContain('testfirst.testlast32@gmail.com');
    });

    test('fails with status code 400 if first name is invalid', async () => {
      const newCustomer = {
        firstName: 'd',
        lastName: 'testlast',
        email: 'testfirst.testlast32@gmail.com',
        phone: '9865327410',
        password: '987654321xyz',
      };

      const result = await api.post('/api/customers').send(newCustomer).expect(400);
      expect(result.body.error).toContain('Name should contain at least two characters!');

      const customersAtEnd = await customerHelper.customersInDb();

      expect(customersAtEnd).toHaveLength(2);
    });

    test('fails with status code 400 if email is invalid', async () => {
      const newCustomer = {
        firstName: 'testfirst',
        lastName: 'testlast',
        email: 'testfirst.testlast32@gmailcom',
        phone: '9865327410',
        password: '987654321xyz',
      };

      const result = await api.post('/api/customers').send(newCustomer).expect(400);
      expect(result.body.error).toContain('should match the correct format for email address');

      const customersAtEnd = await customerHelper.customersInDb();

      expect(customersAtEnd).toHaveLength(2);
    });

    test('fails with status code 400 if phone number is invalid', async () => {
      const newCustomer = {
        firstName: 'testfirst',
        lastName: 'testlast',
        email: 'testfirst.testlast32@gmail.com',
        phone: '98653274gf',
        password: '987654321xyz',
      };

      const result = await api.post('/api/customers').send(newCustomer).expect(400);
      expect(result.body.error).toContain('should follow the correct format for phone number');

      const customersAtEnd = await customerHelper.customersInDb();

      expect(customersAtEnd).toHaveLength(2);
    });
    test('creation fails with proper statuscode and message if email is already taken', async () => {
      const customersAtStart = await customerHelper.customersInDb();

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

      const customersAtEnd = await customerHelper.customersInDb();
      expect(customersAtEnd).toHaveLength(customersAtStart.length);
    });
  });

  describe('fetching data from database', () => {
    describe('using authorized employee token', () => {
      test('all customers is returned as json', async () => {
        const token = await employeeHelper.employeeToken(adminLogin.email, adminLogin.password);
        await api
          .get('/api/customers')
          .set('Authorization', `bearer ${token}`)
          .expect(200)
          .expect('Content-Type', /application\/json/);
      });
      test('succeeds with a valid id', async () => {
        const customerAtStart = await customerHelper.customersInDb();
        const customerToView = customerAtStart[0];
        const token = await employeeHelper.employeeToken(adminLogin.email, adminLogin.password);

        const resultCustomer = await api
          // eslint-disable-next-line no-underscore-dangle
          .get(`/api/customers/${customerToView.id}`)
          .set('Authorization', `bearer ${token}`)
          .expect(200)
          .expect('Content-Type', /application\/json/);

        const processedCustomerToView = JSON.parse(JSON.stringify(customerToView));

        expect(resultCustomer.body).toEqual(processedCustomerToView);
      });
      test('fetch fails with statuscode 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445';
        const token = await employeeHelper.employeeToken(adminLogin.email, adminLogin.password);
        await api
          .get(`/api/customers/${invalidId}`)
          .set('Authorization', `bearer ${token}`)
          .expect(400);
      });

      test('fetch fails with statuscode 404 if customer does not exist', async () => {
        const validNonexistingId = await customerHelper.nonExistingId();
        const token = await employeeHelper.employeeToken(adminLogin.email, adminLogin.password);
        const result = await api
          .get(`/api/customers/${validNonexistingId}`)
          .set('Authorization', `bearer ${token}`)
          .expect(404);
        expect(result.body.error).toBe('Customer is not available in database');
      });
    });
    describe('using customer token', () => {
      test('succeeds with a valid id', async () => {
        const customerToView = await Customer.findOne({ email: customerLogin1.email });
        const token = await customerHelper.customerToken(
          customerLogin1.email,
          customerLogin1.password,
        );

        const resultCustomer = await api
          // eslint-disable-next-line no-underscore-dangle
          .get(`/api/customers/${customerToView.id}`)
          .set('Authorization', `bearer ${token}`)
          .expect(200)
          .expect('Content-Type', /application\/json/);

        const processedCustomerToView = JSON.parse(JSON.stringify(customerToView));

        expect(resultCustomer.body).toEqual(processedCustomerToView);
      });
      test('fetch fails with statuscode 403 if id is not equal to the requested customer', async () => {
        const customerToView = await Customer.findOne({ email: customerLogin2.email });
        const token = await customerHelper.customerToken(
          customerLogin1.email,
          customerLogin1.password,
        );

        const resultCustomer = await api
          .get(`/api/customers/${customerToView.id}`)
          .set('Authorization', `bearer ${token}`)
          .expect(403);

        expect(resultCustomer.body.error).toBe(
          `Don't have permission to access this customer details`,
        );
      });
    });
  });

  describe('Delete a customer', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const customersAtStart = await customerHelper.customersInDb();
      const customerToDelete = customersAtStart[0];

      const token = await employeeHelper.employeeToken(adminLogin.email, adminLogin.password);
      await api
        .delete(`/api/customers/${customerToDelete.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204);

      const customersAtEnd = await customerHelper.customersInDb();

      expect(customersAtEnd).toHaveLength(customerHelper.sampleCustomer.length - 1);

      const emails = customersAtEnd.map((r) => r.email);

      expect(emails).not.toContain(customerToDelete.email);
    });
    test('delete fails with status code 404 if customer does not exist', async () => {
      const validNonexistingId = await customerHelper.nonExistingId();
      const token = await employeeHelper.employeeToken(adminLogin.email, adminLogin.password);

      const result = await api
        .delete(`/api/customers/${validNonexistingId}`)
        .set('Authorization', `bearer ${token}`)
        .expect(404);
      expect(result.body.error).toBe(`Couldn't delete as data is not available `);
    });
    test('delete fails with status code 401 if employee token is not provided', async () => {
      const customersAtStart = await customerHelper.customersInDb();
      const customerToDelete = customersAtStart[0];
      const result = await api.delete(`/api/customers/${customerToDelete.id}`).expect(401);
      expect(result.body.error).toBe('token missing or invalid');
    });
  });

  describe('Updating a customer ', () => {
    describe('name and phone number', () => {
      test('succeeds with valid id and proper token', async () => {
        const customerToUpdate = await Customer.findOne({ email: customerLogin1.email });
        const token = await customerHelper.customerToken(
          customerLogin1.email,
          customerLogin1.password,
        );
        const editedCustomer = {
          phone: 9568742135,
          firstName: 'updateUser',
          lastName: 'updateUserLast',
        };
        await api
          .put(`/api/customers/updateBasic/${customerToUpdate.id}`)
          .send(editedCustomer)
          .set('Authorization', `bearer ${token}`)
          .expect(200);

        const customersAtEnd = await customerHelper.customersInDb();
        const aCustomerAtEnd = customersAtEnd.find((c) => c.id === customerToUpdate.id);
        expect(aCustomerAtEnd.firstName).toBe('updateUser');
        expect(aCustomerAtEnd.lastName).toBe('updateUserLast');
        expect(aCustomerAtEnd.phone).toBe('9568742135');
      });
      test('update fails status code 403 without correct user token', async () => {
        const customerToUpdate = await Customer.findOne({ email: customerLogin1.email });
        const editedCustomer = {
          phone: 9568742135,
          firstName: 'updateUser',
          lastName: 'updateUserLast',
        };
        const token = await customerHelper.customerToken(
          customerLogin2.email,
          customerLogin2.password,
        );
        await api
          .put(`/api/customers/updateBasic/${customerToUpdate.id}`)
          .send(editedCustomer)
          .set('Authorization', `bearer ${token}`)
          .expect(403);
        const customersAtEnd = await customerHelper.customersInDb();
        const aCustomerAtEnd = customersAtEnd.find((c) => c.id === customerToUpdate.id);
        expect(aCustomerAtEnd.firstName).toBe(customerToUpdate.firstName);
        expect(aCustomerAtEnd.lastName).toBe(customerToUpdate.lastName);
        expect(aCustomerAtEnd.phone).toBe(customerToUpdate.phone);
      });
      test('update fails with proper status code if token is not provided', async () => {
        const customerToUpdate = await Customer.findOne({ email: customerLogin1.email });
        const editedCustomer = {
          phone: 9568742135,
          firstName: 'updateUser',
          lastName: 'updateUserLast',
        };
        const result = await api
          .put(`/api/customers/updateBasic/${customerToUpdate.id}`)
          .send(editedCustomer)
          .expect(401);

        expect(result.body.error).toContain(`token missing or invalid`);
      });
    });
    describe('password', () => {
      test('success with proper status code with proper token', async () => {
        const customerToUpdate = await Customer.findOne({ email: customerLogin1.email });
        const token = await customerHelper.customerToken(
          customerLogin1.email,
          customerLogin1.password,
        );
        const editedCustomer = {
          currentPassword: customerLogin1.password,
          newPassword: '123456789def',
        };
        await api
          .patch(`/api/customers/changePassword/${customerToUpdate.id}`)
          .send(editedCustomer)
          .set('Authorization', `bearer ${token}`)
          .expect(200);
        const aCustomerAtEnd = await Customer.findOne({ email: customerLogin1.email });
        expect(aCustomerAtEnd.passwordHash).not.toBe(customerToUpdate.passwordHash);
      });
      test('update fails with proper status code without correct user token', async () => {
        const customerToUpdate = await Customer.findOne({ email: customerLogin1.email });
        const token = await customerHelper.customerToken(
          customerLogin2.email,
          customerLogin2.password,
        );
        const editedCustomer = {
          currentPassword: customerLogin1.password,
          newPassword: '123456789def',
        };
        await api
          .patch(`/api/customers/changePassword/${customerToUpdate.id}`)
          .send(editedCustomer)
          .set('Authorization', `bearer ${token}`)
          .expect(403);
        const aCustomerAtEnd = await Customer.findOne({ email: customerLogin1.email });
        expect(aCustomerAtEnd.passwordHash).toBe(customerToUpdate.passwordHash);
      });
      test(`update fails with proper status code and message if current password don't match`, async () => {
        const customerToUpdate = await Customer.findOne({ email: customerLogin1.email });
        const token = await customerHelper.customerToken(
          customerLogin1.email,
          customerLogin1.password,
        );
        const editedCustomer = {
          currentPassword: customerLogin2.password,
          newPassword: '123456789def',
        };
        const result = await api
          .patch(`/api/customers/changePassword/${customerToUpdate.id}`)
          .send(editedCustomer)
          .set('Authorization', `bearer ${token}`)
          .expect(400);
        expect(result.body.error).toBe('Password does not match');
      });
    });
    describe('address', () => {
      describe('add a new address', () => {
        test('success with proper status code with proper token', async () => {
          const customerToUpdate = await Customer.findOne({ email: customerLogin1.email });
          const token = await customerHelper.customerToken(
            customerLogin1.email,
            customerLogin1.password,
          );
          const editedCustomer = {
            addressLine1: 'A-702,Seaview chs',
            addressLine2: 'Sector-13E,Vashi',
            landmark: 'Opp. Dmart',
            city: 'Navi Mumbai',
            state: 'Maharashtra',
            country: 'India',
            zip: '410681',
            tag: 'Home',
          };
          const result = await api
            .put(`/api/customers/newAddress/${customerToUpdate.id}`)
            .send(editedCustomer)
            .set('Authorization', `bearer ${token}`)
            .expect(200);
          expect(result.body.addresses[0]).toEqual(
            expect.objectContaining({
              _id: expect.anything(),
              addressLine1: expect.any(String),
              addressLine2: expect.any(String),
              landmark: expect.any(String),
              city: expect.any(String),
              state: expect.any(String),
              country: expect.any(String),
              zip: expect.any(String),
              tag: expect.any(String),
            }),
          );
          expect(Object.keys(result.body.addresses[0]).length).toBe(
            Object.keys(editedCustomer).length + 1,
          );
        });
      });
      describe('update a existing address', () => {
        beforeEach(async () => {
          await customerHelper.customerDummyAddress(customerLogin1.email);
          await customerHelper.customerDummyAddress(customerLogin2.email);
        });
        test('success with proper status code with proper token', async () => {
          const customerToUpdate = await Customer.findOne({ email: customerLogin1.email });
          const addressToUpdate = customerToUpdate.addresses[0];
          const token = await customerHelper.customerToken(
            customerLogin1.email,
            customerLogin1.password,
          );
          const editedCustomer = {
            addressLine1: 'A-703,BranchNest',
            addressLine2: 'Sector-17E,Kharghar',
            landmark: 'Opp. kmart',
            city: 'Navi Mumbai',
            state: 'Maharashtra',
            country: 'India',
            zip: '410681',
            tag: 'Office',
          };
          await api
            .put(`/api/customers/updateAddress/${customerToUpdate.id}/${addressToUpdate.id}`)
            .send(editedCustomer)
            .set('Authorization', `bearer ${token}`)
            .expect(200);
        });
        test('update fails with proper status code if address id is invalid', async () => {
          const customerToUpdate = await Customer.findOne({ email: customerLogin1.email });
          const invalidId = '5a3d5da59070081a82a3445';
          const token = await customerHelper.customerToken(
            customerLogin1.email,
            customerLogin1.password,
          );
          const editedCustomer = {
            addressLine1: 'A-703,BranchNest',
            addressLine2: 'Sector-17E,Kharghar',
            landmark: 'Opp. kmart',
            city: 'Navi Mumbai',
            state: 'Maharashtra',
            country: 'India',
            zip: '410681',
            tag: 'Office',
          };
          const result = await api
            .put(`/api/customers/updateAddress/${customerToUpdate.id}/${invalidId}`)
            .send(editedCustomer)
            .set('Authorization', `bearer ${token}`)
            .expect(400);
          expect(result.body.error).toBe('malformatted id');
        });
        test('update fails with proper status code if address is not present', async () => {
          const customerToUpdate = await Customer.findOne({ email: customerLogin1.email });
          const dummyCustomer = await Customer.findOne({ email: customerLogin2.email });
          const addressToUpdate = dummyCustomer.addresses[0];
          const token = await customerHelper.customerToken(
            customerLogin1.email,
            customerLogin1.password,
          );
          const editedCustomer = {
            addressLine1: 'A-703,BranchNest',
            addressLine2: 'Sector-17E,Kharghar',
            landmark: 'Opp. kmart',
            city: 'Navi Mumbai',
            state: 'Maharashtra',
            country: 'India',
            zip: '410681',
            tag: 'Office',
          };
          const result = await api
            .put(`/api/customers/updateAddress/${customerToUpdate.id}/${addressToUpdate.id}`)
            .send(editedCustomer)
            .set('Authorization', `bearer ${token}`)
            .expect(404);
          expect(result.body.error).toBe('No address present at the given address id');
        });
      });
      describe('delete a existing address', () => {
        beforeEach(async () => {
          await customerHelper.customerDummyAddress(customerLogin1.email);
          await customerHelper.customerDummyAddress(customerLogin2.email);
        });
        test('success with proper status code with proper token', async () => {
          const selectedCustomer = await Customer.findOne({ email: customerLogin1.email });
          const addressToDelete = selectedCustomer.addresses[0];
          const token = await customerHelper.customerToken(
            customerLogin1.email,
            customerLogin1.password,
          );
          await api
            .delete(`/api/customers/deleteAddress/${selectedCustomer.id}/${addressToDelete.id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204);
          const customersAtEnd = await Customer.findOne({ email: customerLogin1.email });
          expect(customersAtEnd.addresses).toHaveLength(selectedCustomer.addresses.length - 1);
        });
        test('delete fails with status code 404 if address does not exist', async () => {
          const selectedCustomer = await Customer.findOne({ email: customerLogin1.email });
          const validNonexistingId = await customerHelper.nonExistingAddressId(
            customerLogin1.email,
          );
          const token = await customerHelper.customerToken(
            customerLogin1.email,
            customerLogin1.password,
          );
          const result = await api
            .delete(`/api/customers/deleteAddress/${selectedCustomer.id}/${validNonexistingId}`)
            .set('Authorization', `bearer ${token}`)
            .expect(404);
          expect(result.body.error).toBe(`No address present or address already deleted`);
        });
      });
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
