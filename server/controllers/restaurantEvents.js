const eventRouter = require('express').Router();
const ResEvent = require('../models/restaurantEvent');

eventRouter.get('/', async (request, response) => {
  const events = await ResEvent.find({});
  response.json(events);
});

eventRouter.get('/:scheduleType', async (request, response) => {
  const events = await ResEvent.find({ scheduleType: request.params.scheduleType });

  if (events.length === 0) {
    return response.status(404).json({ error: 'No event found or invalid path' });
  }
  return response.json(events);
});

eventRouter.post('/', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.employee.accessLevel === 1) {
    const {
      eventName,
      typicalAgeRange,
      scheduleType,
      startDate,
      endDate,
      scheduleDescription,
      description,
      img,
    } = request.body;

    if (startDate > endDate) {
      return response.status(400).json({ error: 'start date is greater than end Date' });
    }

    const resEvent = new ResEvent({
      eventName,
      description,
      img,
      typicalAgeRange,
      scheduleType,
      startDate,
      endDate,
      scheduleDescription,
    });

    const savedEvent = await resEvent.save();

    return response.status(201).json(savedEvent);
  }
  return response
    .status(403)
    .json({ error: `Don't have permission to add a new restaurant event` })
    .end();
});

eventRouter.put('/:id', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.employee.accessLevel === 1) {
    const { description, scheduleDescription, scheduleType, typicalAgeRange } = request.body;
    const modifiedEvent = {
      description,
      scheduleDescription,
      scheduleType,
      typicalAgeRange,
    };
    const updatedEvent = await ResEvent.findByIdAndUpdate(request.params.id, modifiedEvent, {
      new: true,
      runValidators: true,
      context: 'query',
    });
    return response.json(updatedEvent);
  }
  return response
    .status(403)
    .json({ error: `Don't have permission to update restaurant event` })
    .end();
});

eventRouter.delete('/:id', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.employee.accessLevel === 1) {
    const deletedEvent = await ResEvent.findByIdAndRemove(request.params.id);
    if (!deletedEvent) {
      return response.status(404).end();
    }
    return response.status(204).end();
  }
  return response
    .status(403)
    .json({ error: `Don't have permission to delete restaurant event` })
    .end();
});

module.exports = eventRouter;
