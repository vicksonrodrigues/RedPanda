/* eslint-disable no-underscore-dangle */
const orderRouter = require('express').Router();
const Customer = require('../models/customer');
const Order = require('../models/order');

orderRouter.get('/', async (request, response) => {
  const orders = await Order.find({});

  response.json(orders);
});

orderRouter.get('/:id', async (request, response) => {
  const order = await Order.findById(request.params.id);

  response.json(order);
});

orderRouter.post('/', async (request, response) => {
  const { customerId, totalAmount, paymentMode, orderStatus, orderItems, specialNote } =
    request.body;
  const customer = await Customer.findById(customerId);

  const order = new Order({
    customer: customer._id,
    orderItems,
    totalAmount,
    paymentMode,
    orderStatus,
    specialNote,
  });
  const savedOrder = await order.save();
  customer.orders = customer.orders.concat(savedOrder._id);
  await customer.save();
  response.json(savedOrder);
});

orderRouter.delete('/:id', async (request, response) => {
  const order = await Order.findById(request.params.id);
  if (!order.customer) {
    const customer = await Customer.findById(order.customer);
    const customerOrder = customer.orders;

    customer.orders = customerOrder.filter((id) => id.toString() !== order.id.toString());
    await customer.save();
    await Order.findByIdAndRemove(request.params.id);
    response.status(204).json({ info: 'Blog has been successfully deleted' }).end();
  } else {
    await Order.findByIdAndRemove(request.params.id);
    response.status(204).json({ info: 'Blog has been successfully deleted' }).end();
  }
});

orderRouter.patch('/:id', async (request, response) => {
  const { orderStatus } = request.body;
  const modifiedStatus = await Order.findByIdAndUpdate(
    request.params.id,
    { orderStatus },
    {
      new: true,
      runValidators: true,
      context: 'query',
    },
  );
  response.json(modifiedStatus);
});

module.exports = orderRouter;
