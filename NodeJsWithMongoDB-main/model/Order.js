const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
      },
    ],
    totalOrder: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model('Order', orderSchema);
