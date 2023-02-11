/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    reservationNo: { type: String, immutable: true },
    firstName: {
      type: String,
      required: [true, "can't be blank"],
      minLength: [2, 'Name should contain at least two characters!'],
      trim: true,
    },
    lastName: { type: String, trim: true },
    phone: {
      type: String,
      required: [true, "can't be blank"],
      minLength: 10,
      match: [/^[6-9]\d{9}$/, 'should follow the correct format for phone number'],
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [
        /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        'should match the correct format for email address',
      ],
      trim: true,
      immutable: true,
    },
    reserveTimestamp: { type: Date, required: true },
    guests: { type: Number, required: true, max: 5 },
    tag: {
      type: String,
      enum: ['Received', 'Confirmed', 'Completed', 'No Show', 'No Seats'],
      default: 'Received',
    },
    specialRequest: { type: String },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
    },
  },
  { timestamps: true, discriminatorKey: 'customerType' },
);

reservationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Reservation', reservationSchema);
