const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 5,
      required: true,
    },
    description: {
      type: String,
      minlength: 5,
      required: true,
    },
    urlImage: {
      type: String,
      minlength: 5,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    isHot: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Product', ProductSchema);
