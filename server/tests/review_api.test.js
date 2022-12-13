const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const api = supertest(app);

const Review = require('../models/review');
const Employee = require('../models/employee');
const employeeHelper = require('./testHelper/employee_test_helper');
const reviewHelper = require('./testHelper/review_test_helper');

describe('for review api', () => {
  beforeEach(async () => {
    await Employee.deleteMany({});
    await employeeHelper.initalEmployee(employeeHelper.sampleEmployee);
    await Review.deleteMany({});
    await reviewHelper.initialReviews(reviewHelper.sampleReviews);
  });
  describe('add a new review ', () => {
    test('succeeds with a valid data and token', async () => {
      const newReview = {
        commenter: 'Joseph Pen',
        comment: `Poor. There's nothing good about the restaurant. You won't be returning.`,
        star: 1,
      };
      const token = await employeeHelper.employeeToken(
        employeeHelper.adminLogin.email,
        employeeHelper.adminLogin.password,
      );
      await api
        .post('/api/reviews')
        .send(newReview)
        .set('Authorization', `bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      const reviews = await reviewHelper.reviewInDb();
      expect(reviews).toHaveLength(4);
    });
    test('creations fails if token is missing', async () => {
      const newReview = {
        commenter: 'Joseph Pen',
        comment: `Poor. There's nothing good about the restaurant. You won't be returning.`,
        star: 1,
      };
      const result = await api
        .post('/api/reviews')
        .send(newReview)
        .expect(401)
        .expect('Content-Type', /application\/json/);
      expect(result.body.error).toContain('token missing or invalid');
    });
    test('creations fails if it is not a admin token ', async () => {
      const newReview = {
        commenter: 'Joseph Pen',
        comment: `Poor. There's nothing good about the restaurant. You won't be returning.`,
        star: 1,
      };
      const token = await employeeHelper.employeeToken(
        employeeHelper.nonAdminLogin.email,
        employeeHelper.nonAdminLogin.password,
      );
      const result = await api
        .post('/api/reviews')
        .send(newReview)
        .set('Authorization', `bearer ${token}`)
        .expect(403)
        .expect('Content-Type', /application\/json/);
      expect(result.body.error).toContain(`Don't have permission to add a new review`);
    });
    test('fails if any property is missing', async () => {
      const newReview = {
        commenter: 'Joseph Pen',
        star: 1,
      };
      const token = await employeeHelper.employeeToken(
        employeeHelper.adminLogin.email,
        employeeHelper.adminLogin.password,
      );
      const result = await api
        .post('/api/reviews')
        .send(newReview)
        .set('Authorization', `bearer ${token}`)
        .expect(400)
        .expect('Content-Type', /application\/json/);
      expect(result.body.error).toContain('one of the field is missing');
    });
  });
  describe('fetch a review ', () => {
    test('returned all reviews as json ', async () => {
      const response = await api
        .get('/api/reviews')
        .expect(200)
        .expect('Content-Type', /application\/json/);
      expect(response.body).toHaveLength(reviewHelper.sampleReviews.length);
    });
  });
  describe('update a review ', () => {
    test('succeeds with a valid data and token', async () => {
      const reviewsAtStart = await reviewHelper.reviewInDb();
      const reviewToUpdate = reviewsAtStart[0];
      const modifiedReview = {
        comment:
          'Everything we ate was fresh and delicious. The award-winning chefs use the best quality ingredients to produce dishes that are simply delightful.',
        star: 3,
      };
      const token = await employeeHelper.employeeToken(
        employeeHelper.adminLogin.email,
        employeeHelper.adminLogin.password,
      );
      await api
        .put(`/api/reviews/${reviewToUpdate.id}`)
        .send(modifiedReview)
        .set('Authorization', `bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      const reviewsAtEnd = await reviewHelper.reviewInDb();
      const aReview = reviewsAtEnd.find((r) => r.id === reviewToUpdate.id);
      expect(aReview.comment).toBe(
        'Everything we ate was fresh and delicious. The award-winning chefs use the best quality ingredients to produce dishes that are simply delightful.',
      );
      expect(aReview.star).toBe(3);
    });
    test('update fails if token is missing ', async () => {
      const reviewsAtStart = await reviewHelper.reviewInDb();
      const reviewToUpdate = reviewsAtStart[0];
      const modifiedReview = {
        comment:
          'Everything we ate was fresh and delicious. The award-winning chefs use the best quality ingredients to produce dishes that are simply delightful.',
        star: 3,
      };
      const result = await api
        .put(`/api/reviews/${reviewToUpdate.id}`)
        .send(modifiedReview)
        .expect(401)
        .expect('Content-Type', /application\/json/);
      expect(result.body.error).toContain('token missing or invalid');
    });
    test('update fails if it is not a admin token ', async () => {
      const reviewsAtStart = await reviewHelper.reviewInDb();
      const reviewToUpdate = reviewsAtStart[0];
      const modifiedReview = {
        comment:
          'Everything we ate was fresh and delicious. The award-winning chefs use the best quality ingredients to produce dishes that are simply delightful.',
        star: 3,
      };
      const token = await employeeHelper.employeeToken(
        employeeHelper.nonAdminLogin.email,
        employeeHelper.nonAdminLogin.password,
      );
      const result = await api
        .put(`/api/reviews/${reviewToUpdate.id}`)
        .send(modifiedReview)
        .set('Authorization', `bearer ${token}`)
        .expect(403)
        .expect('Content-Type', /application\/json/);
      expect(result.body.error).toContain(`Don't have permission to update review`);
    });
  });
  describe('delete a review ', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const reviewsAtStart = await reviewHelper.reviewInDb();
      const reviewToDelete = reviewsAtStart[0];
      const token = await employeeHelper.employeeToken(
        employeeHelper.adminLogin.email,
        employeeHelper.adminLogin.password,
      );
      await api
        .delete(`/api/reviews/${reviewToDelete.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204);
      const reviewsAtEnd = await reviewHelper.reviewInDb();
      expect(reviewsAtEnd).toHaveLength(reviewHelper.sampleReviews.length - 1);
    });
    test('fails with status code 404 if review does not exist', async () => {
      const validNonExistingId = await reviewHelper.nonExistingId();
      const token = await employeeHelper.employeeToken(
        employeeHelper.adminLogin.email,
        employeeHelper.adminLogin.password,
      );
      await api
        .delete(`/api/reviews/${validNonExistingId}`)
        .set('Authorization', `bearer ${token}`)
        .expect(404);
    });
    test('fails with status code 403 if non authorized personal try to delete', async () => {
      const reviewsAtStart = await reviewHelper.reviewInDb();
      const reviewToDelete = reviewsAtStart[0];
      const token = await employeeHelper.employeeToken(
        employeeHelper.nonAdminLogin.email,
        employeeHelper.nonAdminLogin.password,
      );
      const result = await api
        .delete(`/api/reviews/${reviewToDelete.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(403);
      expect(result.body.error).toContain(`Don't have permission to delete reviews`);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
