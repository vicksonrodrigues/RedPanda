/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  customization: [
    {
      cName: { type: String },
    },
    { _id: false },
  ],
});

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    orderItems: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    paymentMode: {
      type: String,
      enum: ['Online', 'Cash'],
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ['Order Placed', 'Confirmed', 'In Kitchen', 'Out For Delivery', 'Delivered'],
      required: true,
      default: 'Order Placed',
    },
    specialNote: {
      type: String,
    },
  },
  { timestamps: true },
);

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Order', orderSchema);
