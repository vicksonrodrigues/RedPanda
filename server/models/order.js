/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  dishName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  totalCost: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    orderNo: { type: String },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    orderItems: [orderItemSchema],
    deliveryAddress: { type: String },
    subTotal: { type: Number, required: true },
    taxCost: { type: Number, required: true },
    deliveryCost: { type: Number, required: true },
    totalCost: { type: Number, required: true },
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
