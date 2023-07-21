/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  landmark: { type: String },
  zip: { type: String, match: [/^[1-9][0-9]{5}$/], required: true, maxLength: 6, minLength: 6 },
  tag: { type: String, required: true },
});

const customerSchema = new mongoose.Schema(
  {
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
        /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}$/i,
        'should match the correct format for email address',
      ],
      trim: true,
      immutable: true,
    },
    passwordHash: { type: String, required: true },
    addresses: [addressSchema],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    reservations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation',
      },
    ],
  },
  { timestamps: true },
);

customerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model('Customer', customerSchema);
