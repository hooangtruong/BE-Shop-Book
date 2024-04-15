const Joi = require('@hapi/joi');

const productOrderSchema = Joi.object({
  id: Joi.string().required(),
  quantity: Joi.number().required(),
  total: Joi.number().required(),
});

const orderSchema = Joi.object({
  username: Joi.string().required(),
  product: Joi.array().items(productOrderSchema).required(),
  totalOrder: Joi.number().required(),
});

module.exports = {
  orderSchema,
};
