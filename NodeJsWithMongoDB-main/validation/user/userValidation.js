const Joi = require('@hapi/joi');

const userSchema = Joi.object({
  username: Joi.string().min(4).required(),
  urlavatar: Joi.string().min(6).required(),
  address: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  admin: Joi.boolean(),
});

module.exports = {
  userSchema,
};
