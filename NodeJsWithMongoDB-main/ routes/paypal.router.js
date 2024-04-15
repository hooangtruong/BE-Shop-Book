const router = require('express').Router();
const paypalController = require('../controllers/paypal.controller');
const middlewareToken = require('../middleware/token/tokenMiddleware');
const validate = require('../middleware/validation/validationMiddleware');
const { paypalSchema } = require('../validation/payment/paymentValidation.js');

router.post(
  '/pay',
  validate(paypalSchema),
  middlewareToken.verifyTokenMember,
  paypalController.create_payment,
);
router.delete(
  '/cancel',
  middlewareToken.verifyTokenMember,
  paypalController.cancelPayment,
);

module.exports = router;
