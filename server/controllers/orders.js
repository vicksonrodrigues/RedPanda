/* eslint-disable no-underscore-dangle */
const orderRouter = require('express').Router();
const Customer = require('../models/customer');
const Order = require('../models/order');

// @desc get all orders
// @access Employee only
orderRouter.get('/', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const orders = await Order.find({});

  return response.json(orders);
});

// @desc get single order details
// @access Employee only
orderRouter.get('/:id', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const order = await Order.findById(request.params.id);

  return response.json(order);
});
// @desc create a order
// @access Customer only
orderRouter.post('/', async (request, response) => {
  const { customerId, totalAmount, paymentMode, orderStatus, orderItems, specialNote } =
    request.body;
  if (!request.customerId) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
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
  return response.json(savedOrder);
});

// @desc delete a order
// @access Employee only
orderRouter.delete('/:id', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.employee.accessLevel === 1) {
    const order = await Order.findById(request.params.id);
    if (!order) {
      return response
        .status(404)
        .json({
          error: `Couldn't delete as order is not available `,
        })
        .end();
    }
    if (!order.customer) {
      const customer = await Customer.findById(order.customer);
      const customerOrder = customer.orders;

      customer.orders = customerOrder.filter((id) => id.toString() !== order.id.toString());
      await customer.save();
      await Order.findByIdAndRemove(request.params.id);
      return response.status(204).json({ info: 'Order has been successfully deleted' }).end();
    }
    return response.status(400).json({ error: 'No customer linked to this order' });
  }
  return response
    .status(403)
    .json({ error: `Don't have permission to delete this order details` })
    .end();
});

// @desc change order status
// @access Employee only
orderRouter.patch('/:id', async (request, response) => {
  if (!request.employee) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (request.employee.accessLevel === 1) {
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
    return response.status(204).json(modifiedStatus);
  }
  return response
    .status(403)
    .json({ error: `Don't have permission to delete this order details` })
    .end();
});

module.exports = orderRouter;
