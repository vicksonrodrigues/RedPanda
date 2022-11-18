const eventRouter = require('express').Router();
const ResEvent = require('../models/restaurantEvent');

eventRouter.get('/', (request, response) => {
  ResEvent.find({}).then((reviews) => {
    response.json(reviews);
  });
});

eventRouter.post('/', async (request, response) => {
  const { eventName, description, startDate, endDate, img } = request.body;
  const resEvent = new ResEvent({
    eventName,
    description,
    startDate,
    endDate,
    img,
  });

  const savedEvent = await resEvent.save();

  response.json(savedEvent);
});

eventRouter.put('/:id', async (request, response) => {
  const { body } = request;
  const modifiedEvent = {
    description: body.description,
    startDate: body.startDate,
    endDate: body.endDate,
  };

  const savedEvent = await ResEvent.findByIdAndUpdate(request.params.id, modifiedEvent, {
    new: true,
    runValidators: true,
    context: 'query',
  });
  response.json(savedEvent);
});

eventRouter.delete('/:id', async (request, response) => {
  await ResEvent.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = eventRouter;
