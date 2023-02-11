const menuRouter = require('express').Router();
const Menu = require('../models/menu');

// get All menu item
menuRouter.get('/', async (request, response) => {
  const allMenu = await Menu.find({});
  response.json(allMenu);
});

// get single menu item
menuRouter.get('/subMenu/:id', async (request, response) => {
  const menuItem = await Menu.findById(request.params.id);
  if (!menuItem) {
    return response.status(404).json({ error: 'No item found or invalid id' });
  }
  return response.json(menuItem);
});

// add a new menu item
menuRouter.post('/', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.employee.accessLevel === 1) {
    const newMenu = new Menu(request.body);

    const savedMenu = await newMenu.save();
    return response.status(201).json(savedMenu);
  }
  return response.status(403).json({ error: `Don't have permission to add a new menu item` }).end();
});

// delete a menu item
menuRouter.delete('/:id', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.employee.accessLevel === 1) {
    const deletedMenuItem = await Menu.findByIdAndRemove(request.params.id);
    if (!deletedMenuItem) {
      return response.status(404).end();
    }
    return response.status(204).end();
  }
  return response.status(403).json({ error: `Don't have permission to delete menu item` }).end();
});

// update a menu item
menuRouter.put('/:id', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.employee.accessLevel === 1) {
    const updatedMenuItem = await Menu.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
      context: 'query',
    });

    return response.json(updatedMenuItem);
  }
  return response.status(403).json({ error: `Don't have permission to update menu item` }).end();
});
// modify availability
menuRouter.patch('/available/:id', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.employee.accessLevel <= 2 && request.employee.accessLevel >= 1) {
    const { available } = request.body;

    const modifiedAvailability = await Menu.findByIdAndUpdate(
      request.params.id,
      { available },
      {
        new: true,
        runValidators: true,
        context: 'query',
      },
    );
    return response.json(modifiedAvailability);
  }
  return response
    .status(403)
    .json({ error: `Don't have permission to update menu availablity` })
    .end();
});
module.exports = menuRouter;
