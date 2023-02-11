const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const api = supertest(app);

const Menu = require('../models/menu');
const Employee = require('../models/employee');
const employeeHelper = require('./testHelper/employee_test_helper');
const menuHelper = require('./testHelper/menu_test_helper');

const newMenuItem = {
  dishName: 'Ultimate Burgers',
  subMenu: 'burger',
  price: 20,
  img: 'https://images.unsplash.com/photo-1565299fd5072g7-b0ac66763828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  newLaunch: true,
  chefRecommended: true,
  customization: [
    {
      cTypeName: 'Add-ons',
      cItems: [
        {
          itemName: 'Patty',
          price: [0, 8],
          isSinglePriceActive: true,
        },
        {
          itemName: 'Wheat-Bun',
          price: [3],
          isSinglePriceActive: false,
        },
        {
          itemName: 'Cheese',
          price: [2, 8],
          isSinglePriceActive: false,
        },
      ],
    },
    {
      cTypeName: 'Sauces',
      cItems: [
        {
          itemName: 'Habanero',
          price: [1, 2],
          isSinglePriceActive: false,
        },
        {
          itemName: 'Mayonnaise',
          price: [0, 4],
          isSinglePriceActive: true,
        },
      ],
    },
  ],
};
describe('for menu api', () => {
  beforeEach(async () => {
    await Employee.deleteMany({});
    await Menu.deleteMany({});
    await employeeHelper.initalEmployee(employeeHelper.sampleEmployee);
    await menuHelper.initialMenuItems(menuHelper.sampleMenuItems);
  });

  describe('fetch menu item', () => {
    test('returned as json', async () => {
      const response = await api
        .get('/api/menu')
        .expect(200)
        .expect('Content-Type', /application\/json/);
      expect(response.body).toHaveLength(menuHelper.sampleMenuItems.length);
    });
  });
  describe('add a new menu item', () => {
    test('succeeds with a valid data and token', async () => {
      const token = await employeeHelper.employeeToken(
        employeeHelper.adminLogin.email,
        employeeHelper.adminLogin.password,
      );
      await api
        .post('/api/menu')
        .send(newMenuItem)
        .set('Authorization', `bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      const menuItems = await menuHelper.menuInDb();
      expect(menuItems).toHaveLength(5);
    });
    test('creations fails if token is missing ', async () => {
      const result = await api
        .post('/api/menu')
        .send(newMenuItem)
        .expect(401)
        .expect('Content-Type', /application\/json/);
      expect(result.body.error).toContain('token missing or invalid');
    });
    test('creations fails if it is not a admin token ', async () => {
      const token = await employeeHelper.employeeToken(
        employeeHelper.nonAdminLogin.email,
        employeeHelper.nonAdminLogin.password,
      );
      const result = await api
        .post('/api/menu')
        .send(newMenuItem)
        .set('Authorization', `bearer ${token}`)
        .expect(403)
        .expect('Content-Type', /application\/json/);
      expect(result.body.error).toContain(`Don't have permission to add a new menu item`);
    });
  });
  describe('update menu item', () => {
    test('succeeds with a valid data and token', async () => {
      const menuItemAtStart = await menuHelper.menuInDb();
      const itemToUpdate = menuItemAtStart[0];
      const updateItemDetails = {
        price: 20,
        chefRecommended: true,
      };
      const token = await employeeHelper.employeeToken(
        employeeHelper.adminLogin.email,
        employeeHelper.adminLogin.password,
      );
      await api
        .put(`/api/menu/${itemToUpdate.id}`)
        .send(updateItemDetails)
        .set('Authorization', `bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      const menuItemAtEnd = await menuHelper.menuInDb();
      const aMenuItem = menuItemAtEnd.find((m) => m.id === itemToUpdate.id);
      expect(aMenuItem.price).toBe(20);
      expect(aMenuItem.chefRecommended).toBe(true);
    });
    test('update fails if token is missing ', async () => {
      const menuItemAtStart = await menuHelper.menuInDb();
      const itemToUpdate = menuItemAtStart[0];
      const updateItemDetails = {
        price: 20,
        chefRecommended: true,
      };
      const result = await api
        .put(`/api/menu/${itemToUpdate.id}`)
        .send(updateItemDetails)
        .expect(401)
        .expect('Content-Type', /application\/json/);
      expect(result.body.error).toContain('token missing or invalid');
    });
    test('update fails if it is not a admin token ', async () => {
      const menuItemAtStart = await menuHelper.menuInDb();
      const itemToUpdate = menuItemAtStart[0];
      const updateItemDetails = {
        price: 20,
        chefRecommended: true,
      };
      const token = await employeeHelper.employeeToken(
        employeeHelper.nonAdminLogin.email,
        employeeHelper.nonAdminLogin.password,
      );
      const result = await api
        .put(`/api/menu/${itemToUpdate.id}`)
        .send(updateItemDetails)
        .set('Authorization', `bearer ${token}`)
        .expect(403)
        .expect('Content-Type', /application\/json/);
      expect(result.body.error).toContain(`Don't have permission to update menu item`);
    });

    describe('change the availability', () => {
      test('succeeds with a valid data and token', async () => {
        const menuItemAtStart = await menuHelper.menuInDb();
        const itemToUpdate = menuItemAtStart[0];
        const updateItemDetails = {
          available: true,
        };
        const token = await employeeHelper.employeeToken(
          employeeHelper.adminLogin.email,
          employeeHelper.adminLogin.password,
        );
        await api
          .patch(`/api/menu/available/${itemToUpdate.id}`)
          .send(updateItemDetails)
          .set('Authorization', `bearer ${token}`)
          .expect(200)
          .expect('Content-Type', /application\/json/);
        const menuItemAtEnd = await menuHelper.menuInDb();
        const aMenuItem = menuItemAtEnd.find((m) => m.id === itemToUpdate.id);
        expect(aMenuItem.available).toBe(true);
      });
      test('update fails if token is missing ', async () => {
        const menuItemAtStart = await menuHelper.menuInDb();
        const itemToUpdate = menuItemAtStart[0];
        const updateItemDetails = {
          available: true,
        };
        const result = await api
          .patch(`/api/menu/available/${itemToUpdate.id}`)
          .send(updateItemDetails)
          .expect(401)
          .expect('Content-Type', /application\/json/);
        expect(result.body.error).toContain('token missing or invalid');
      });
      test('update fails if it is a forbidden token ', async () => {
        const menuItemAtStart = await menuHelper.menuInDb();
        const itemToUpdate = menuItemAtStart[0];
        const updateItemDetails = {
          available: true,
        };
        const token = await employeeHelper.employeeToken(
          employeeHelper.lowLevelLogin.email,
          employeeHelper.lowLevelLogin.password,
        );
        const result = await api
          .patch(`/api/menu/available/${itemToUpdate.id}`)
          .send(updateItemDetails)
          .set('Authorization', `bearer ${token}`)
          .expect(403)
          .expect('Content-Type', /application\/json/);
        expect(result.body.error).toContain(`Don't have permission to update menu availablity`);
      });
    });
  });
  describe('delete a  menu item', () => {
    test('succeeds with status code 204 ', async () => {
      const menuItemAtStart = await menuHelper.menuInDb();
      const itemToDelete = menuItemAtStart[0];
      const token = await employeeHelper.employeeToken(
        employeeHelper.adminLogin.email,
        employeeHelper.adminLogin.password,
      );
      await api
        .delete(`/api/menu/${itemToDelete.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204);
      const menuItemAtEnd = await menuHelper.menuInDb();
      expect(menuItemAtEnd).toHaveLength(menuHelper.sampleMenuItems.length - 1);
    });
    test('fails with status code 404 if gallery item does not exist', async () => {
      const validNonExistingId = await menuHelper.nonExistingId();
      const token = await employeeHelper.employeeToken(
        employeeHelper.adminLogin.email,
        employeeHelper.adminLogin.password,
      );
      await api
        .delete(`/api/menu/${validNonExistingId}`)
        .set('Authorization', `bearer ${token}`)
        .expect(404);
    });
    test('fails with status code 401 if token is missing', async () => {
      const menuItemAtStart = await menuHelper.menuInDb();
      const itemToDelete = menuItemAtStart[0];
      const result = await api.delete(`/api/menu/${itemToDelete.id}`).expect(401);
      expect(result.body.error).toContain('token missing or invalid');
    });
    test('fails with status code 403 if non authorized personal try to delete', async () => {
      const menuItemAtStart = await menuHelper.menuInDb();
      const itemToDelete = menuItemAtStart[0];
      const token = await employeeHelper.employeeToken(
        employeeHelper.nonAdminLogin.email,
        employeeHelper.nonAdminLogin.password,
      );
      const result = await api
        .delete(`/api/menu/${itemToDelete.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(403);
      expect(result.body.error).toContain(`Don't have permission to delete menu item`);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
