import Product from '../../models/products/selectProduct.js';


const productController = {
  getAllProducts: async (req, res, next) => {
    try {
      const products = await Product.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },
  // por id 
  getProductsByUserId: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const products = await Product.getProductsByUserId(userId);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },

  createProduct: async (req, res, next) => {
    try {
      const productData = req.body;
      const productId = await Product.createProduct(productData);
      res.status(201).json({ id: productId, message: 'Producto creado exitosamente' });
    } catch (error) {
      next(error);
    }
  },

    // crear product engarzandolo con id user  //

// revisar enviar por paramas?
      createProduct: async (req, res, next) => {
        try {
          const productData = req.body;
          const sellerId = req.user.id; // user.id  no lo tengo claro 
          const productId = await Product.createProduct(productData, sellerId);
          res.status(201).json({ id: productId, message: 'Producto creado exitosamente' });
        } catch (error) {
          next(error);
        }
      },
    
};

export default productController;
