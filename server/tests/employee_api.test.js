const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./testHelper/employee_test_helper');

const app = require('../app');

const api = supertest(app);

const Employee = require('../models/employee');

describe('for employee api', () => {
  beforeEach(async () => {
    await Employee.deleteMany({});
    await helper.initalEmployee(helper.sampleEmployee);
  });
  describe('adding a new Employee ', () => {
    test('succeeds with valid data', async () => {
      const newEmployee = {
        firstName: 'dummyfirst',
        lastName: 'dummylast',
        email: 'dummyfirst.dummylast@gmail.com',
        phone: '9087654321',
        password: '123456789xyz',
        department: 'admin',
        position: 'team lead',
        accessLevel: 1,
      };

      const email = 'adminfirst@gmail.com';
      const password = '123456789xyz';
      const token = await helper.employeeToken(email, password);
      await api
        .post('/api/employees')
        .send(newEmployee)
        .set('Authorization', `bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const employees = await helper.employeeInDb();
      expect(employees).toHaveLength(3);
      const allEmails = employees.map((n) => n.email);
      expect(allEmails).toContain('adminfirst@gmail.com');
    });

    test('creation fails with proper statuscode and message if email is already taken', async () => {
      const employeesAtStart = await helper.employeeInDb();

      const newEmployee = {
        firstName: 'dummyfirst',
        lastName: 'dummylast',
        email: 'adminfirst@gmail.com',
        phone: '9087654321',
        password: '123456789xyz',
        department: 'admin',
        position: 'team lead',
        accessLevel: 1,
      };
      const email = 'adminfirst@gmail.com';
      const password = '123456789xyz';
      const token = await helper.employeeToken(email, password);
      const result = await api
        .post('/api/employees')
        .send(newEmployee)
        .set('Authorization', `bearer ${token}`)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain('email must be unique');

      const employeesAtEnd = await helper.employeeInDb();
      expect(employeesAtEnd).toHaveLength(employeesAtStart.length);
    });
    test('creation fails with proper statuscode and message if someone other than admins try to add a employee', async () => {
      const employeesAtStart = await helper.employeeInDb();

      const newEmployee = {
        firstName: 'xyzfirst',
        lastName: 'xyzlast',
        email: 'xyz@gmail.com',
        phone: '9087654321',
        password: '123456789xyz',
        department: 'admin',
        position: 'team lead',
        accessLevel: 1,
      };
      const email = 'adminSecond@gmail.com';
      const password = '123456789abc';
      const token = await helper.employeeToken(email, password);
      const result = await api
        .post('/api/employees')
        .send(newEmployee)
        .set('Authorization', `bearer ${token}`)
        .expect(403);

      expect(result.body.error).toContain(`Don't have permission to add a new employee`);

      const employeesAtEnd = await helper.employeeInDb();
      expect(employeesAtEnd).toHaveLength(employeesAtStart.length);
    });
  });

  describe('fetching employee data from database', () => {
    test('employees is returned as json', async () => {
      await api
        .get('/api/employees')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });
    describe('using access level 1 token', () => {
      test('succeeds with a valid id ', async () => {
        const employeeToView = await Employee.findOne({ accessLevel: 2 });
        const token = await helper.employeeToken('adminfirst@gmail.com', '123456789xyz');

        const resultEmployee = await api
          .get(`/api/employees/${employeeToView.id}`)
          .set('Authorization', `bearer ${token}`)
          .expect(200)
          .expect('Content-Type', /application\/json/);
        const processedCustomerToView = JSON.parse(JSON.stringify(employeeToView));

        expect(resultEmployee.body).toEqual(processedCustomerToView);
      });
      test('fails with a invalid id ', async () => {
        const token = await helper.employeeToken('adminfirst@gmail.com', '123456789xyz');
        const invalidId = '5a3d5da59070081a82a3445';
        await api
          .get(`/api/employees/${invalidId}`)
          .set('Authorization', `bearer ${token}`)
          .expect(400)
          .expect('Content-Type', /application\/json/);
      });
      test('fails with statuscode 404 if employee does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId();
        const token = await helper.employeeToken('adminfirst@gmail.com', '123456789xyz');
        await api
          .get(`/api/employees/${validNonexistingId}`)
          .set('Authorization', `bearer ${token}`)
          .expect(404);
      });
    });
    describe('using lower level token', () => {
      test('succeeds when employee fetch its own data  ', async () => {
        const employeeToView = await Employee.findOne({ accessLevel: 2 });
        const token = await helper.employeeToken('adminSecond@gmail.com', '123456789abc');

        const resultEmployee = await api
          .get(`/api/employees/${employeeToView.id}`)
          .set('Authorization', `bearer ${token}`)
          .expect(200)
          .expect('Content-Type', /application\/json/);
        const processedCustomerToView = JSON.parse(JSON.stringify(employeeToView));

        expect(resultEmployee.body).toEqual(processedCustomerToView);
      });
      test('fails when employee fetch other employee data ', async () => {
        const employeeToView = await Employee.findOne({ accessLevel: 1 });
        const token = await helper.employeeToken('adminSecond@gmail.com', '123456789abc');

        const result = await api
          .get(`/api/employees/${employeeToView.id}`)
          .set('Authorization', `bearer ${token}`)
          .expect(403);
        expect(result.body.error).toContain(
          `Don't have permission to access this employee details`,
        );
      });
    });
  });

  describe('updating employee details where', () => {
    describe('editing basic details', () => {
      test('succeeds with valid data with level 1 token ', async () => {
        const employeeToUpdate = await Employee.findOne({ accessLevel: 2 });
        const editedEmployee = {
          phone: 9832154670,
          department: 'admin',
          position: 'manager',
        };

        const email = 'adminfirst@gmail.com';
        const password = '123456789xyz';
        const token = await helper.employeeToken(email, password);

        await api
          .put(`/api/employees/${employeeToUpdate.id}`)
          .send(editedEmployee)
          .set('Authorization', `bearer ${token}`)
          .expect(200);

        const employeeAtEnd = await helper.employeeInDb();
        const aEmployeeAtEnd = employeeAtEnd.find((b) => b.id === employeeToUpdate.id);
        expect(aEmployeeAtEnd.department).toBe('admin');
        expect(aEmployeeAtEnd.position).toBe('manager');
        expect(aEmployeeAtEnd.phone).toBe('9832154670');
      });
      test('fails with valid data without level 1 token', async () => {
        const employeeToUpdate = await Employee.findOne({ accessLevel: 2 });
        const editedEmployee = {
          phone: 9832154670,
          department: 'admin',
          position: 'manager',
        };

        const email = 'adminSecond@gmail.com';
        const password = '123456789abc';
        const token = await helper.employeeToken(email, password);

        await api
          .put(`/api/employees/${employeeToUpdate.id}`)
          .send(editedEmployee)
          .set('Authorization', `bearer ${token}`)
          .expect(403);

        const employeeAtEnd = await helper.employeeInDb();
        const aEmployeeAtEnd = employeeAtEnd.find((b) => b.id === employeeToUpdate.id);
        expect(aEmployeeAtEnd.department).toBe(employeeToUpdate.department);
        expect(aEmployeeAtEnd.position).toBe(employeeToUpdate.position);
        expect(aEmployeeAtEnd.phone).toBe(employeeToUpdate.phone);
      });

      test('fails with proper status code if token is not provided', async () => {
        const employeeToUpdate = await Employee.findOne({ accessLevel: 2 });
        const editedEmployee = {
          phone: 9832154670,
          department: 'admin',
          position: 'manager',
        };

        const result = await api
          .put(`/api/employees/${employeeToUpdate.id}`)
          .send(editedEmployee)
          .expect(401);

        expect(result.body.error).toContain(`token missing or invalid`);
      });
    });
    describe('editing password', () => {
      test('success with proper status code with access level 1 token', async () => {
        const employeeToUpdate = await Employee.findOne({ accessLevel: 2 });
        const editedEmployee = {
          email: 'adminSecond@gmail.com',
          newPassword: '123456789def',
        };

        const email = 'adminfirst@gmail.com';
        const password = '123456789xyz';
        const token = await helper.employeeToken(email, password);

        await api
          .patch(`/api/employees/${employeeToUpdate.id}`)
          .send(editedEmployee)
          .set('Authorization', `bearer ${token}`)
          .expect(200);

        const aEmployeeAtEnd = await Employee.findOne({ email: editedEmployee.email });
        expect(aEmployeeAtEnd.passwordHash).not.toBe(employeeToUpdate.passwordHash);
      });
      test('fails with proper status code without access level 1 token', async () => {
        const employeeToUpdate = await Employee.findOne({ accessLevel: 2 });
        const editedEmployee = {
          email: 'adminSecond@gmail.com',
          newPassword: '123456789def',
        };

        const email = 'adminSecond@gmail.com';
        const password = '123456789abc';
        const token = await helper.employeeToken(email, password);

        await api
          .patch(`/api/employees/${employeeToUpdate.id}`)
          .send(editedEmployee)
          .set('Authorization', `bearer ${token}`)
          .expect(403);
        const aEmployeeAtEnd = await Employee.findOne({ email: editedEmployee.email });
        expect(aEmployeeAtEnd.passwordHash).toBe(employeeToUpdate.passwordHash);
      });
      test('fails with proper status code and message if email is not provided ', async () => {
        const employeeToUpdate = await Employee.findOne({ accessLevel: 2 });
        const editedEmployee = {
          newPassword: '123456789def',
        };

        const email = 'adminfirst@gmail.com';
        const password = '123456789xyz';
        const token = await helper.employeeToken(email, password);

        const result = await api
          .patch(`/api/employees/${employeeToUpdate.id}`)
          .send(editedEmployee)
          .set('Authorization', `bearer ${token}`)
          .expect(400);

        expect(result.body.error).toBe('Email not provided');
      });
      test(`fails with proper status code and message if email and id doesn't belong to same employee`, async () => {
        const employeeToUpdate = await Employee.findOne({ accessLevel: 2 });
        const editedEmployee = {
          email: 'adminfirst@gmail.com',
          newPassword: '123456789def',
        };

        const email = 'adminfirst@gmail.com';
        const password = '123456789xyz';
        const token = await helper.employeeToken(email, password);

        const result = await api
          .patch(`/api/employees/${employeeToUpdate.id}`)
          .send(editedEmployee)
          .set('Authorization', `bearer ${token}`)
          .expect(400);
        expect(result.body.error).toBe('Email doesnot match with user');
      });
    });
  });

  describe('deleting employee from database', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const employeeToDelete = await Employee.findOne({ accessLevel: 2 });
      const email = 'adminfirst@gmail.com';
      const password = '123456789xyz';
      const token = await helper.employeeToken(email, password);
      await api
        .delete(`/api/employees/${employeeToDelete._id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204);
      const employeesAtEnd = await helper.employeeInDb();
      expect(employeesAtEnd).toHaveLength(helper.sampleEmployee.length - 1);
    });
    test('fails with status code 404 if customer does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId();
      const email = 'adminfirst@gmail.com';
      const password = '123456789xyz';
      const token = await helper.employeeToken(email, password);

      await api
        .delete(`/api/employees/${validNonexistingId}`)
        .set('Authorization', `bearer ${token}`)
        .expect(404);
    });
    test('fails with status code 401 if token is missing', async () => {
      const employeeToDelete = await Employee.findOne({ accessLevel: 2 });
      const result = await api.delete(`/api/employees/${employeeToDelete._id}`).expect(401);
      expect(result.body.error).toBe('token missing or invalid');
    });
    test('fails with status code 403 if non authorized personal try to delete', async () => {
      const employeeToDelete = await Employee.findOne({ accessLevel: 2 });
      const email = 'adminSecond@gmail.com';
      const password = '123456789abc';
      const token = await helper.employeeToken(email, password);

      const result = await api
        .delete(`/api/employees/${employeeToDelete._id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(403);
      expect(result.body.error).toBe(`Don't have permission to delete a new employee`);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});

// npm test -- tests/employee_api.test.js
