// const { nanoid, customAlphabet } = require('nanoid');

const utc = require('dayjs/plugin/utc');
const customParseFormat = require('dayjs/plugin/customParseFormat');

const dayjs = require('dayjs');

const reservationRouter = require('express').Router();
const Reservation = require('../models/reservation');
const Customer = require('../models/customer');

dayjs.extend(utc);
dayjs.extend(customParseFormat);

// @desc get all the reservation
// @access Employee only
reservationRouter.get('/', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.employee.accessLevel === 1) {
    const reservations = await Reservation.find({}).sort({ reserveTimestamp: -1 });
    return response.json(reservations);
  }
  return response
    .status(403)
    .json({ error: `Don't have permission to access reservation details` })
    .end();
});
// @desc get all the reservation based on date
// @access Employee only
reservationRouter.get('/date/:selectedDate', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.employee.accessLevel === 1) {
    const { selectedDate } = request.params;
    if (dayjs(selectedDate, 'YYYY-MM-DD', true).isValid()) {
      const UTCOffset = 330 * 60000;
      const startDateInMs = dayjs(selectedDate).utc(true).valueOf();
      const endDateInMs = dayjs(selectedDate).endOf('date').utc(true).valueOf();
      const startDateInUTC = dayjs(startDateInMs - UTCOffset)
        .utc()
        .toJSON();
      const endDateInUTC = dayjs(endDateInMs - UTCOffset)
        .utc()
        .toJSON();
      const reservations = await Reservation.find({
        reserveTimestamp: { $gte: startDateInUTC, $lte: endDateInUTC },
      }).sort({ reserveTimestamp: -1 });
      return response.json(reservations);
    }
    return response.status(400).json({ error: `Date is missing or invalid` }).end();
  }
  return response
    .status(403)
    .json({ error: `Don't have permission to access reservation details` })
    .end();
});

// @desc create a reservation
// @access Customer and Employee
reservationRouter.post('/', async (request, response) => {
  if (!request.customerId || !request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
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
    customer.reservations = customer.reservations.concat(savedReservation._id);
    await customer.save();
  }
  return response.status(201).json(savedReservation);
});

// @desc delete a reservation(cancelling reservation)
// @access Employee only
reservationRouter.delete('/:id', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.employee.accessLevel === 1) {
    const reservation = await Reservation.findById(request.params.id);
    if (!reservation.customerId) {
      const customer = await Customer.findById(reservation.customerId);
      const customerRes = customer.reservations;

      customer.reservations = customerRes.filter(
        (id) => id.toString() !== reservation.id.toString(),
      );
      await customer.save();
      await Reservation.findByIdAndRemove(request.params.id);
      return response.status(204).json({ info: 'Reservation has been successfully deleted' }).end();
    }
    await Reservation.findByIdAndRemove(request.params.id);
    return response.status(204).json({ info: 'Reservation has been successfully deleted' }).end();
  }
  return response
    .status(403)
    .json({ error: `Don't have permission to delete this reservation details` })
    .end();
});

// @desc update reservation status(tag)
// @access Employee only
reservationRouter.patch('/:id', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.employee.accessLevel === 1) {
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
    return response.json(modifiedStatus);
  }
  return response
    .status(403)
    .json({ error: `Don't have permission to access this update details` })
    .end();
});

// @desc update reservation detail(only special Request)
// @access Customer only
reservationRouter.put('/updateRes/:id', async (request, response) => {
  if (!request.customerId) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.params.id === request.customerId) {
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
    return response.json(modifiedReservation);
  }
  return response
    .status(403)
    .json({ error: `Don't have permission to modify this customer's reservation` })
    .end();
});

module.exports = reservationRouter;
