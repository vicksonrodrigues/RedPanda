const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const api = supertest(app);

const ResEvent = require('../models/restaurantEvent');
const employeeHelper = require('./testHelper/employee_test_helper');
const resEventHelper = require('./testHelper/resEvent_test_helper');
const Employee = require('../models/employee');

describe('for event api', () => {
  beforeEach(async () => {
    await ResEvent.deleteMany({});
    await Employee.deleteMany({});
    await employeeHelper.initalEmployee(employeeHelper.sampleEmployee);
    await resEventHelper.initialEvents(resEventHelper.sampleEvents);
  });
  describe('add a new restaurant event', () => {
    test('succeeds with a valid data and token', async () => {
      const newResEvent = {
        eventName: 'Live Open Mic',
        description:
          'This is your stage. Make laugh and have fun with us in the fun and magcal open mic nights',
        img: 'http://d3j0xdvdfvm.tygont.net/Gallery/Ambience/openMic.jpg',
        typicalAgeRange: 'above 18',
        scheduleType: 'single',
        startDate: '2022-12-14',
        endDate: '2022-12-14',
        scheduleDescription: `Date: 14th January
         Time:10 AM - 2 PM`,
      };
      const token = await employeeHelper.employeeToken(
        employeeHelper.adminLogin.email,
        employeeHelper.adminLogin.password,
      );
      await api
        .post('/api/events')
        .send(newResEvent)
        .set('Authorization', `bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      const restaurantEvents = await resEventHelper.eventsInDb();
      expect(restaurantEvents).toHaveLength(4);
    });

    test('fails if any property is missing ', async () => {
      const newResEvent = {
        eventName: 'Yi-gi-oh! Go Meet-up',
      };
      const token = await employeeHelper.employeeToken(
        employeeHelper.adminLogin.email,
        employeeHelper.adminLogin.password,
      );
      const result = await api
        .post('/api/events')
        .send(newResEvent)
        .set('Authorization', `bearer ${token}`)
        .expect(400)
        .expect('Content-Type', /application\/json/);
      expect(result.body.error).toContain(`A short description is required`);
      expect(result.body.error).toContain(`image link required`);
      expect(result.body.error).toContain(`Age Range required`);
      expect(result.body.error).toContain(`Schedule Type is required`);
      expect(result.body.error).toContain(`start date is required`);
      expect(result.body.error).toContain(`end date is required`);
      expect(result.body.error).toContain(`event schedule is required`);
    });
    test('creations fails if token is missing ', async () => {
      const newResEvent = {
        eventName: 'Yi-gi-oh! Go Meet-up',
        eventTime: 'On 3rd December 10 am to 3pm ',
        description:
          'Get ready to meet all the fellow Yi-gi-oh! fans in your area . Trade , Battle or discuss anything and everything you love about Yi-gi-oh! at this event',
        img: 'http://d3j0xdvdfvm.tygont.net/Gallery/Ambience/Pikachu.jpg',
      };
      const result = await api
        .post('/api/events')
        .send(newResEvent)
        .expect(401)
        .expect('Content-Type', /application\/json/);
      expect(result.body.error).toContain('token missing or invalid');
    });
    test('creations fails if it is not a admin token ', async () => {
      const newResEvent = {
        eventName: 'Yi-gi-oh! Go Meet-up',
        eventTime: 'On 3rd December 10 am to 3pm ',
        description:
          'Get ready to meet all the fellow Yi-gi-oh! fans in your area . Trade , Battle or discuss anything and everything you love about Yi-gi-oh! at this event',
        img: 'http://d3j0xdvdfvm.tygont.net/Gallery/Ambience/Pikachu.jpg',
      };
      const token = await employeeHelper.employeeToken(
        employeeHelper.nonAdminLogin.email,
        employeeHelper.nonAdminLogin.password,
      );
      const result = await api
        .post('/api/events')
        .send(newResEvent)
        .set('Authorization', `bearer ${token}`)
        .expect(403)
        .expect('Content-Type', /application\/json/);
      expect(result.body.error).toContain(`Don't have permission to add a new restaurant event`);
    });
  });
});

describe('fetch restaurant event', () => {
  test('returned as json', async () => {
    const response = await api
      .get('/api/events')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveLength(resEventHelper.sampleEvents.length);
  });
  test('return event based on schedule type', async () => {
    const response = await api
      .get('/api/events/single')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveLength(1);
  });
  test('fails if schedule type is invalid', async () => {
    const response = await api
      .get('/api/events/singl')
      .expect(404)
      .expect('Content-Type', /application\/json/);
    expect(response.body.error).toContain('No event found or invalid path');
  });
});
describe('update restaurant event', () => {
  test('succeeds with a valid data and token', async () => {
    const eventsAtStart = await resEventHelper.eventsInDb();
    const eventToUpdate = eventsAtStart[0];
    const modifiedEvent = {
      description:
        'Get ready for a single day event to learn cooking from our very own head chef! Beginner friendly. Learn quick and basic meal prepartion with some secret insider tricks and technique .',
      scheduleDescription: `Date: 4th December 
      Time: 3 PM to 6 PM `,
      scheduleType: 'single',
      typicalAgeRange: 'all ages',
    };
    const token = await employeeHelper.employeeToken(
      employeeHelper.adminLogin.email,
      employeeHelper.adminLogin.password,
    );
    await api
      .put(`/api/events/${eventToUpdate.id}`)
      .send(modifiedEvent)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const eventsAtEnd = await resEventHelper.eventsInDb();
    const aEvent = eventsAtEnd.find((e) => e.id === eventToUpdate.id);
    expect(aEvent.description).toBe(
      'Get ready for a single day event to learn cooking from our very own head chef! Beginner friendly. Learn quick and basic meal prepartion with some secret insider tricks and technique .',
    );
    expect(aEvent.scheduleDescription).toBe(`Date: 4th December 
      Time: 3 PM to 6 PM `);
    expect(aEvent.scheduleType).toBe('single');
    expect(aEvent.typicalAgeRange).toBe('all ages');
  });
  test('fails if schedule type value is not same a predefined values', async () => {
    const eventsAtStart = await resEventHelper.eventsInDb();
    const eventToUpdate = eventsAtStart[0];
    const modifiedEvent = {
      scheduleType: 'recuring',
    };
    const token = await employeeHelper.employeeToken(
      employeeHelper.adminLogin.email,
      employeeHelper.adminLogin.password,
    );
    const result = await api
      .put(`/api/events/${eventToUpdate.id}`)
      .send(modifiedEvent)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    expect(result.body.error).toContain('recuring is not supported');
  });
  test('update fails if token is missing ', async () => {
    const eventsAtStart = await resEventHelper.eventsInDb();
    const eventToUpdate = eventsAtStart[0];
    const modifiedEvent = {
      scheduleType: 'single',
      typicalAgeRange: 'all ages',
    };
    const result = await api
      .put(`/api/events/${eventToUpdate.id}`)
      .send(modifiedEvent)
      .expect(401)
      .expect('Content-Type', /application\/json/);
    expect(result.body.error).toContain('token missing or invalid');
  });
  test('update fails if it is not a admin token ', async () => {
    const eventsAtStart = await resEventHelper.eventsInDb();
    const eventToUpdate = eventsAtStart[0];
    const modifiedEvent = {
      scheduleType: 'single',
      typicalAgeRange: 'all ages',
    };
    const token = await employeeHelper.employeeToken(
      employeeHelper.nonAdminLogin.email,
      employeeHelper.nonAdminLogin.password,
    );
    const result = await api
      .put(`/api/events/${eventToUpdate.id}`)
      .send(modifiedEvent)
      .set('Authorization', `bearer ${token}`)
      .expect(403)
      .expect('Content-Type', /application\/json/);
    expect(result.body.error).toContain(`Don't have permission to update restaurant event`);
  });
});
describe('delete a restaurant event', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const eventsAtStart = await resEventHelper.eventsInDb();
    const eventToDelete = eventsAtStart[0];
    const token = await employeeHelper.employeeToken(
      employeeHelper.adminLogin.email,
      employeeHelper.adminLogin.password,
    );
    await api
      .delete(`/api/events/${eventToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204);
    const eventsAtEnd = await resEventHelper.eventsInDb();
    expect(eventsAtEnd).toHaveLength(resEventHelper.sampleEvents.length - 1);
  });
  test('fails with status code 404 if event does not exist', async () => {
    const validNonExistingId = await resEventHelper.nonExistingId();
    const token = await employeeHelper.employeeToken(
      employeeHelper.adminLogin.email,
      employeeHelper.adminLogin.password,
    );
    await api
      .delete(`/api/events/${validNonExistingId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(404);
  });
  test('fails with status code 401 if token is missing', async () => {
    const eventsAtStart = await resEventHelper.eventsInDb();
    const eventToDelete = eventsAtStart[0];
    const result = await api.delete(`/api/events/${eventToDelete.id}`).expect(401);
    expect(result.body.error).toContain('token missing or invalid');
  });
  test('fails with status code 403 if non authorized personal try to delete', async () => {
    const eventsAtStart = await resEventHelper.eventsInDb();
    const eventToDelete = eventsAtStart[0];
    const token = await employeeHelper.employeeToken(
      employeeHelper.nonAdminLogin.email,
      employeeHelper.nonAdminLogin.password,
    );
    const result = await api
      .delete(`/api/events/${eventToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(403);
    expect(result.body.error).toContain(`Don't have permission to delete restaurant event`);
  });
});
afterAll(() => {
  mongoose.connection.close();
});
