const menuRouter = require('express').Router();
const Menu = require('../models/menu');

// get All menu item
menuRouter.get('/', async (request, response) => {
  const allMenu = await Menu.find({});
  response.json(allMenu);
});
// get chef Recommended item
menuRouter.get('/chefRecommended', async (request, response) => {
  const chefRec = await Menu.find({ chefRecommended: true });
  response.json(chefRec);
});
// get subMenu item
menuRouter.get('/:menuItem', async (request, response) => {
  const subMenu = await Menu.find({ subMenu: request.params.menuItem });
  response.json(subMenu);
});

// get single menu item
menuRouter.get('/subMenu/:id', async (request, response) => {
  const menuItem = await Menu.findById(request.params.id);
  response.json(menuItem);
});

// add a new menu item
menuRouter.post('/', async (request, response) => {
  const { body } = request;
  const newMenu = new Menu(body);

  const savedMenu = await newMenu.save();

  response.json(savedMenu);
});

// delete a menu item
menuRouter.delete('/:id', async (request, response) => {
  await Menu.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

// update a menu item
menuRouter.put('/:id', async (request, response) => {
  /* const { chefRecommended, newLaunch, dishName, description, price } = request.body;
  const modifiedMenu = {
    dishName,
    chefRecommended,
    newLaunch,
    description,
  }; */
  const updatedMenuItem = await Menu.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
    context: 'query',
  });

  response.json(updatedMenuItem);
});

menuRouter.patch('/available/:id', async (request, response) => {
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
  response.json(modifiedAvailability);
});
module.exports = menuRouter;
