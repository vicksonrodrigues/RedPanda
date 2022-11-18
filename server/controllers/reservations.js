const reservationRouter = require('express').Router();
const Reservation = require('../models/reservation');
const Customer = require('../models/customer');

reservationRouter.get('/', async (request, response) => {
  const reservations = await Reservation.find({});

  response.json(reservations);
});

reservationRouter.get('/:id', async (request, response) => {
  const reservation = await Reservation.findById(request.params.id);

  response.json(reservation);
});

reservationRouter.post('/', async (request, response) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    reserveTimestamp,
    guests,
    tag,
    specialRequest,
    customerId,
  } = request.body;

  const reservation = new Reservation({
    firstName,
    lastName,
    phone,
    email,
    reserveTimestamp,
    guests,
    tag,
    specialRequest,
    customerId,
  });
  const savedReservation = await reservation.save();

  if (customerId != null) {
    const customer = await Customer.findById(customerId);
    // eslint-disable-next-line no-underscore-dangle
    customer.reservations = customer.reservations.concat(savedReservation._id);
    await customer.save();
  }

  response.status(201).json(savedReservation);
});

// delete a reservation
reservationRouter.delete('/:id', async (request, response) => {
  const reservation = await Reservation.findById(request.params.id);
  if (!reservation.customerId) {
    const customer = await Customer.findById(reservation.customerId);
    const customerRes = customer.reservations;

    customer.reservations = customerRes.filter((id) => id.toString() !== reservation.id.toString());
    await customer.save();
    await Reservation.findByIdAndRemove(request.params.id);
    response.status(204).json({ info: 'Blog has been successfully deleted' }).end();
  } else {
    await Reservation.findByIdAndRemove(request.params.id);
    response.status(204).json({ info: 'Blog has been successfully deleted' }).end();
  }
});
// update the tag in reservation
reservationRouter.patch('/:id', async (request, response) => {
  const { tag } = request.body;
  const modifiedStatus = await Reservation.findByIdAndUpdate(
    request.params.id,
    { tag },
    {
      new: true,
      runValidators: true,
      context: 'query',
    },
  );
  response.json(modifiedStatus);
});

reservationRouter.put('/updateRes/:id', async (request, response) => {
  const { specialRequest } = request.body;
  const modifiedReservation = await Reservation.findByIdAndUpdate(
    request.params.id,
    { specialRequest },
    {
      new: true,
      runValidators: true,
      context: 'query',
    },
  );
  response.json(modifiedReservation);
});

module.exports = reservationRouter;
