const supertest = require('supertest');
const mongoose = require('mongoose');
const dayjs = require('dayjs');

const app = require('../app');

const api = supertest(app);

const Employee = require('../models/employee');
const Reservation = require('../models/reservation');
const Customer = require('../models/customer');
const employeeHelper = require('./testHelper/employee_test_helper');
const customerHelper = require('./testHelper/customer_test_helper');
const reservationHelper = require('./testHelper/reservation_test_helper');

describe('for reservation api', () => {
  beforeEach(async () => {
    await Employee.deleteMany({});
    await Customer.deleteMany({});
    await Reservation.deleteMany({});
    await employeeHelper.initalEmployee(employeeHelper.sampleEmployee);
    await customerHelper.initialCustomer(customerHelper.sampleCustomer);
    await reservationHelper.initialReservation(reservationHelper.sampleReservation);
  });
  describe('fetch reservation', () => {
    describe('using authorized employee token', () => {
      test('returned as json', async () => {
        const token = await employeeHelper.employeeToken(
          employeeHelper.adminLogin.email,
          employeeHelper.adminLogin.password,
        );
        const response = await api
          .get('/api/reservations')
          .set('Authorization', `bearer ${token}`)
          .expect(200)
          .expect('Content-Type', /application\/json/);
        expect(response.body).toHaveLength(reservationHelper.sampleReservation.length);
      });
      test('data is sorted in descending order', async () => {
        const token = await employeeHelper.employeeToken(
          employeeHelper.adminLogin.email,
          employeeHelper.adminLogin.password,
        );
        const response = await api
          .get('/api/reservations')
          .set('Authorization', `bearer ${token}`)
          .expect(200)
          .expect('Content-Type', /application\/json/);

        const reservationInDatabase = await reservationHelper.reservationInDb();
        const sortedData = [...reservationInDatabase].sort(
          (a, b) => b.reserveTimestamp - a.reserveTimestamp,
        );
        const dataToJSON = sortedData.map((s) => JSON.parse(JSON.stringify(s)));
        expect(response.body).toStrictEqual(dataToJSON);
      });
      describe('filter by date', () => {
        test('get all reservation for a particular date', async () => {
          const token = await employeeHelper.employeeToken(
            employeeHelper.adminLogin.email,
            employeeHelper.adminLogin.password,
          );
          const dateNow = dayjs('2023-01-09').format('YYYY-MM-DD');
          const result = await api
            .get(`/api/reservations/date/${dateNow}`)
            .set('Authorization', `bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
          expect(result.body).toHaveLength(2);
        });
        test('fails with status 401 if date is invalid ', async () => {
          const token = await employeeHelper.employeeToken(
            employeeHelper.adminLogin.email,
            employeeHelper.adminLogin.password,
          );
          const dateNow = '23 04 12';
          const result = await api
            .get(`/api/reservations/date/${dateNow}`)
            .set('Authorization', `bearer ${token}`)
            .expect(400)
            .expect('Content-Type', /application\/json/);
          expect(result.body.error).toBe('Date is missing or invalid');
        });
      });
      // test remaining to be completed
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
