const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const api = supertest(app);

const Gallery = require('../models/gallery');
const employeeHelper = require('./testHelper/employee_test_helper');
const galleryHelper = require('./testHelper/gallery_test_helper');
const Employee = require('../models/employee');

describe('for gallery api', () => {
  beforeEach(async () => {
    await Gallery.deleteMany({});
    await Employee.deleteMany({});
    await employeeHelper.initalEmployee(employeeHelper.sampleEmployee);
    await galleryHelper.initialGalleryItems(galleryHelper.sampleGalleryItems);
  });
  describe('add a new gallery item', () => {
    test('succeeds with a valid data and token', async () => {
      const newGalleryItem = {
        title: 'Farm fresh Pizza by CharPiz',
        img: 'http://d3j0dhrjonaam.dlofdfovt.net/Gallery/Foods/hfdjemks.jpg',
        groupBy: 'foods',
      };
      const token = await employeeHelper.employeeToken(
        employeeHelper.adminLogin.email,
        employeeHelper.adminLogin.password,
      );
      await api
        .post('/api/gallery')
        .send(newGalleryItem)
        .set('Authorization', `bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      const galleryItems = await galleryHelper.galleryInDb();
      expect(galleryItems).toHaveLength(4);
    });
    test('fails if groupBy and img is missing ', async () => {
      const newGalleryItem = {
        title: 'Farm fresh Pizza by CharPiz',
      };
      const token = await employeeHelper.employeeToken(
        employeeHelper.adminLogin.email,
        employeeHelper.adminLogin.password,
      );
      const result = await api
        .post('/api/gallery')
        .send(newGalleryItem)
        .set('Authorization', `bearer ${token}`)
        .expect(400)
        .expect('Content-Type', /application\/json/);
      expect(result.body.error).toContain('image link required');
      expect(result.body.error).toContain('groupBy value required');
    });
    test('fails if groupBy value is not same a predefined values', async () => {
      const newGalleryItem = {
        title: 'Farm fresh Pizza by CharPiz',
        img: 'http://d3j0dhrjonaam.dlofdfovt.net/Gallery/Foods/hfdjemks.jpg',
        groupBy: 'foo',
      };
      const token = await employeeHelper.employeeToken(
        employeeHelper.adminLogin.email,
        employeeHelper.adminLogin.password,
      );
      const result = await api
        .post('/api/gallery')
        .send(newGalleryItem)
        .set('Authorization', `bearer ${token}`)
        .expect(400)
        .expect('Content-Type', /application\/json/);
      expect(result.body.error).toContain('foo is not supported');
    });
    test('creations fails if token is missing ', async () => {
      const newGalleryItem = {
        title: 'Farm fresh Pizza by CharPiz',
        img: 'http://d3j0dhrjonaam.dlofdfovt.net/Gallery/Foods/hfdjemks.jpg',
        groupBy: 'foods',
      };
      const result = await api
        .post('/api/gallery')
        .send(newGalleryItem)
        .expect(401)
        .expect('Content-Type', /application\/json/);
      expect(result.body.error).toContain('token missing or invalid');
    });
    test('creations fails if it is not a admin token ', async () => {
      const newGalleryItem = {
        title: 'Farm fresh Pizza by CharPiz',
        img: 'http://d3j0dhrjonaam.dlofdfovt.net/Gallery/Foods/hfdjemks.jpg',
        groupBy: 'food',
      };
      const token = await employeeHelper.employeeToken(
        employeeHelper.nonAdminLogin.email,
        employeeHelper.nonAdminLogin.password,
      );
      const result = await api
        .post('/api/gallery')
        .send(newGalleryItem)
        .set('Authorization', `bearer ${token}`)
        .expect(403)
        .expect('Content-Type', /application\/json/);
      expect(result.body.error).toContain(`Don't have permission to add a new gallery item`);
    });
  });
  describe('fetch gallery item', () => {
    test('returned as json', async () => {
      const response = await api
        .get('/api/gallery')
        .expect(200)
        .expect('Content-Type', /application\/json/);
      expect(response.body).toHaveLength(galleryHelper.sampleGalleryItems.length);
    });
    test('returned items belonging to a group', async () => {
      const response = await api
        .get('/api/gallery/foods')
        .expect(200)
        .expect('Content-Type', /application\/json/);
      expect(response.body).toHaveLength(1);
    });
    test('fails if group by name is invalid ', async () => {
      const response = await api
        .get('/api/gallery/food')
        .expect(404)
        .expect('Content-Type', /application\/json/);
      expect(response.body.error).toContain('No items found or invalid path ');
    });
  });
  describe('update gallery item', () => {
    test('succeeds with a valid data and token', async () => {
      const galleryItemAtStart = await galleryHelper.galleryInDb();
      const itemToUpdate = galleryItemAtStart[0];
      const newGalleryItem = {
        title: 'Farm fresh Pizza by Harris Chad',
        groupBy: 'ambience',
      };
      const token = await employeeHelper.employeeToken(
        employeeHelper.adminLogin.email,
        employeeHelper.adminLogin.password,
      );
      await api
        .put(`/api/gallery/${itemToUpdate.id}`)
        .send(newGalleryItem)
        .set('Authorization', `bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      const galleryItemAtEnd = await galleryHelper.galleryInDb();
      const aGalleryItem = galleryItemAtEnd.find((g) => g.id === itemToUpdate.id);
      expect(aGalleryItem.title).toBe('Farm fresh Pizza by Harris Chad');
      expect(aGalleryItem.groupBy).toBe('ambience');
    });

    test('fails if groupBy value is not same a predefined values', async () => {
      const galleryItemAtStart = await galleryHelper.galleryInDb();
      const itemToUpdate = galleryItemAtStart[0];
      const newGalleryItem = {
        title: 'Farm fresh Pizza by CharPiz',
        groupBy: 'foo',
      };
      const token = await employeeHelper.employeeToken(
        employeeHelper.adminLogin.email,
        employeeHelper.adminLogin.password,
      );
      const result = await api
        .put(`/api/gallery/${itemToUpdate.id}`)
        .send(newGalleryItem)
        .set('Authorization', `bearer ${token}`)
        .expect(400)
        .expect('Content-Type', /application\/json/);
      expect(result.body.error).toContain('foo is not supported');
    });
    test('update fails if token is missing ', async () => {
      const galleryItemAtStart = await galleryHelper.galleryInDb();
      const itemToUpdate = galleryItemAtStart[0];
      const newGalleryItem = {
        title: 'Farm fresh Pizza by Harris Chad',
        groupBy: 'ambience',
      };
      const result = await api
        .put(`/api/gallery/${itemToUpdate.id}`)
        .send(newGalleryItem)
        .expect(401)
        .expect('Content-Type', /application\/json/);
      expect(result.body.error).toContain('token missing or invalid');
    });
    test('update fails if it is not a admin token ', async () => {
      const galleryItemAtStart = await galleryHelper.galleryInDb();
      const itemToUpdate = galleryItemAtStart[0];
      const newGalleryItem = {
        title: 'Farm fresh Pizza by Harris Chad',
        groupBy: 'ambience',
      };
      const token = await employeeHelper.employeeToken(
        employeeHelper.nonAdminLogin.email,
        employeeHelper.nonAdminLogin.password,
      );
      const result = await api
        .put(`/api/gallery/${itemToUpdate.id}`)
        .send(newGalleryItem)
        .set('Authorization', `bearer ${token}`)
        .expect(403)
        .expect('Content-Type', /application\/json/);
      expect(result.body.error).toContain(`Don't have permission to update gallery item`);
    });
  });
  describe('delete a  gallery item', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const galleryItemAtStart = await galleryHelper.galleryInDb();
      const itemToDelete = galleryItemAtStart[0];
      const token = await employeeHelper.employeeToken(
        employeeHelper.adminLogin.email,
        employeeHelper.adminLogin.password,
      );
      await api
        .delete(`/api/gallery/${itemToDelete.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204);
      const galleryItemAtEnd = await galleryHelper.galleryInDb();
      expect(galleryItemAtEnd).toHaveLength(galleryHelper.sampleGalleryItems.length - 1);
    });
    test('fails with status code 404 if gallery item does not exist', async () => {
      const validNonExistingId = await galleryHelper.nonExistingId();
      const token = await employeeHelper.employeeToken(
        employeeHelper.adminLogin.email,
        employeeHelper.adminLogin.password,
      );
      await api
        .delete(`/api/gallery/${validNonExistingId}`)
        .set('Authorization', `bearer ${token}`)
        .expect(404);
    });
    test('fails with status code 401 if token is missing', async () => {
      const galleryItemAtStart = await galleryHelper.galleryInDb();
      const itemToDelete = galleryItemAtStart[0];
      const result = await api.delete(`/api/gallery/${itemToDelete.id}`).expect(401);
      expect(result.body.error).toContain('token missing or invalid');
    });
    test('fails with status code 403 if non authorized personal try to delete', async () => {
      const galleryItemAtStart = await galleryHelper.galleryInDb();
      const itemToDelete = galleryItemAtStart[0];
      const token = await employeeHelper.employeeToken(
        employeeHelper.nonAdminLogin.email,
        employeeHelper.nonAdminLogin.password,
      );
      const result = await api
        .delete(`/api/gallery/${itemToDelete.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(403);
      expect(result.body.error).toContain(`Don't have permission to delete gallery item`);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
