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
        const employeesAtStart = await helper.employeeInDb();
        const employeeToView = employeesAtStart[1];
        const token = await helper.employeeToken('adminfirst@gmail.com', '123456789xyz');

        const resultEmployee = await api
          .get(`/api/employees/${employeeToView.id}`)
          .set('Authorization', `bearer ${token}`)
          .expect(200)
          .expect('Content-Type', /application\/json/);
        const processedCustomerToView = JSON.parse(JSON.stringify(employeeToView));

        expect(resultEmployee.body).toEqual(processedCustomerToView);
      });
      test('succeeds with a invalid id ', async () => {
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
        const employeesAtStart = await helper.employeeInDb();
        const employeeToView = employeesAtStart[1];
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
        const employeesAtStart = await helper.employeeInDb();
        const employeeToView = employeesAtStart[0];
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
      describe('using level 1 token', () => {
        test('succeeds with valid data', async () => {
          const employeesAtStart = await helper.employeeInDb();
          const employeeToUpdate = employeesAtStart[1];
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
        });
      });
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
