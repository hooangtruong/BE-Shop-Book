const Order = require('../model/Order');
const User = require('../model/User');
const { checkExistsById } = require('../utils/checkExistsById');

const orderController = {
  getOrder: async (req, res) => {
    try {
      const order = await Order.find();
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createOrder: async (req, res) => {
    try {
      const { username, product, totalOrder } = req.body;
      if (!username || !product || !totalOrder) {
        return res.status(400).json({ error: 'Missing required fields.' });
      }
      const user = await User.findOne({ username: username });

      const newOrder = new Order({
        username: user._id,
        product: product,
        totalOrder: totalOrder,
      });

      const savedOrder = await newOrder.save();
      res.json(savedOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      const OrderExists = await checkExistsById(Order, id);
      if (OrderExists) {
        const order = await Order.findOne({ _id: id });
        res.status(200).json(order);
      } else {
        return res.status(404).json({ error: 'Order not found' });
      }
    } catch {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = orderController;
