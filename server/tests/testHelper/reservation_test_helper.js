const { customAlphabet } = require('nanoid');
const Reservation = require('../../models/reservation');
const Customer = require('../../models/customer');

const sampleReservation = [
  {
    firstName: 'firstrev',
    lastName: 'firstrevLast',
    phone: '9685742351',
    email: 'firstrev@gmail.com',
    reserveTimestamp: '2023-01-09T11:25:38.567Z',
    guests: '4',
  },
  {
    firstName: 'secondrev',
    lastName: 'secondrevLast',
    phone: '9685742352',
    email: 'secondrev@gmail.com',
    reserveTimestamp: '2022-11-12T12:25:18.467Z',
    tag: 'Confirmed',
    guests: '2',
  },
  {
    firstName: 'thirdrev',
    lastName: 'thirdrevLast',
    phone: '9685742362',
    email: 'thirdrev@gmail.com',
    reserveTimestamp: '2023-01-09T12:25:18.467Z',
    guests: '2',
  },
];

const initialReservation = async (reservationList) => {
  await Promise.all(
    reservationList.map(async (reserve) => {
      const {
        firstName,
        lastName,
        phone,
        email,
        reserveTimestamp,
        branch,
        guests,
        tag,
        specialRequest,
      } = reserve;
      const nanoid = customAlphabet('23456789ABCDEFGHJKLMNPQRSTUVWXYZ', 14);
      const reservationNo = nanoid();
      const customer = await Customer.find({});
      const customerId = customer[0]._id;
      const newReservation = new Reservation({
        reservationNo,
        firstName,
        lastName,
        phone,
        email,
        reserveTimestamp,
        branch,
        guests,
        tag,
        specialRequest,
        customerId,
      });
      const savedReservation = await newReservation.save();
      if (customerId != null) {
        await Customer.findByIdAndUpdate(
          customerId,
          { $push: { reservations: savedReservation._id } },
          {
            new: true,
            runValidators: true,
            context: 'query',
          },
        );
      }
    }),
  );
};

const reservationInDb = async () => {
  const reservations = await Reservation.find({});
  return reservations.map((reserve) => reserve.toJSON());
};

const nonExistingId = async () => {
  const nanoid = customAlphabet('23456789ABCDEFGHJKLMNPQRSTUVWXYZ', 14);
  const reservationNo = nanoid();
  const newReservation = new Reservation({
    reservationNo,
    firstName: 'dummyrev',
    lastName: 'dummyrevLast',
    phone: '9685742355',
    email: 'dummyrev@gmail.com',
    reserveTimestamp: '2022-11-13T12:25:18.467Z',
    guests: '3',
  });
  await newReservation.save();
  await newReservation.remove();
  return newReservation._id.toString();
};

module.exports = {
  sampleReservation,
  initialReservation,
  reservationInDb,
  nonExistingId,
};
