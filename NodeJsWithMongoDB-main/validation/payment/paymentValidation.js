const Joi = require('@hapi/joi');

const paypalSchema = Joi.object({
  intent: Joi.string().valid('sale').required(),
  payer: Joi.object({
    payment_method: Joi.string().valid('paypal').required(),
  }).required(),
  redirect_urls: Joi.object({
    return_url: Joi.string().uri().required(),
    cancel_url: Joi.string().uri().required(),
  }).required(),
  transactions: Joi.array()
    .items(
      Joi.object({
        item_list: Joi.object({
          items: Joi.array()
            .items(
              Joi.object({
                name: Joi.string().required(),
                sku: Joi.string().required(),
                price: Joi.string().required(),
                currency: Joi.string().valid('USD').required(),
                quantity: Joi.number().integer().required(),
              }),
            )
            .required(),
        }).required(),
        amount: Joi.object({
          currency: Joi.string().valid('USD').required(),
          total: Joi.string().required(),
        }).required(),
        description: Joi.string().required(),
      }),
    )
    .required(),
});

module.exports = {
  paypalSchema,
};
