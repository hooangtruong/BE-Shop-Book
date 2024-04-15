const ProductSchema = require('../model/Product');
const { checkExistsById } = require('../utils/checkExistsById');
const productsController = {
  getProducts: async (req, res) => {
    try {
      const product = await ProductSchema.find();
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProductsById: async (req, res) => {
    try {
      const { id } = req.params;
      const ProductExists = await checkExistsById(ProductSchema, id);
      if (ProductExists) {
        const product = await ProductSchema.findOne({ _id: id });
        res.status(200).json(product);
      } else {
        return res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const existingProduct = await ProductSchema.findOne({
        title: req.body.title,
      });
      if (existingProduct) {
        return res.status(403).json('Product already exists');
      } else {
        const product = new ProductSchema({
          title: req.body.title,
          description: req.body.description,
          urlImage: req.body.urlImage,
          category: req.body.category,
          price: req.body.price,
          quantity: req.body.quantity,
          isHot: req.body.isHot,
        });
        const savedProduct = await product.save();
        res.json(savedProduct);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateProductQuantity: async (req, res) => {
    try {
      const { body } = req;

      if (!Array.isArray(body)) {
        return res.status(400).json({ error: 'Invalid request body' });
      }

      const updatedProducts = await Promise.all(
        body.map(async (item) => {
          const { id, quantity } = item;
          const productExists = await checkExistsById(ProductSchema, id);
          if (!productExists) {
            return null;
          }
          const product = await ProductSchema.findOne({ _id: id });
          if (product.quantity != 0) {
            product.quantity = Math.max(0, product.quantity - quantity);
            return product.save();
          }
        }),
      );
      res
        .status(200)
        .json(updatedProducts.filter((product) => product !== null));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const ProductExists = await checkExistsById(ProductSchema, id);
      if (!ProductExists) {
        return res.status(404).json({ error: 'Product not found' });
      }
      const updatedProduct = await ProductSchema.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            ...body,
          },
        },
        { new: true },
      ).exec();

      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const ProductExists = await checkExistsById(ProductSchema, id);

      if (!ProductExists) {
        return res.status(404).json({ error: 'Product not found' });
      }
      const deleteProcduct = await ProductSchema.deleteOne({
        _id: req.params.id,
      });
      res.json(deleteProcduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = productsController;
