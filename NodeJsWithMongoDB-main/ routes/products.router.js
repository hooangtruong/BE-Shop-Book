const router = require('express').Router();
const productsController = require('../controllers/product.controller');
const middlewareToken = require('../middleware/token/tokenMiddleware');
const middlewareValidate = require('../middleware/validation/validationMiddleware');
const { productSchema } = require('../validation/product/productValidation.js');

router.get('/getAllProducs', productsController.getProducts);
router.get('/getItemProducs/:id', productsController.getProductsById);
router.post(
  '/createProduct',
  middlewareValidate(productSchema),
  middlewareToken.verifyTokenAdmin,
  productsController.createProduct,
);
router.put(
  '/updateProduct/:id',
  // middlewareValidate(productSchema),
  middlewareToken.verifyTokenAdmin,
  productsController.updateProduct,
);

router.put(
  '/updateProductQuantity',
  // middlewareValidate(productSchema),
  middlewareToken.verifyTokenMember,
  productsController.updateProductQuantity,
);

router.delete(
  '/deleteProduct/:id',
  middlewareToken.verifyTokenAdmin,
  productsController.deleteProduct,
);

module.exports = router;
