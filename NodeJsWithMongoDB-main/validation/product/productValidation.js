const Joi = require('@hapi/joi');

const productSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().min(8).required(),
  urlImage: Joi.string().uri().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  isHot: Joi.boolean(),
});

module.exports = {
  productSchema,
};
