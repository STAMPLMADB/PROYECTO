import Product from '../../models/products/selectProduct.js';


 /// trae todos lo productos
  const getAllProducts = async (req, res, next) => {
    try {
      const products = await Product.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
  // por id  no tiene sentido 
 const getProductsByUserId = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const products = await Product.getProductsByUserId(userId);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
 /// ok generamos productos pero sin vincular al id funciona guay pero 
 // no es lo correcto
  const createProduct = async (req, res, next) => {
    try {
      const productData = req.body;
      const productId = await Product.createProduct(productData);
      res.status(201).json({ id: productId, message: 'Producto creado exitosamente' });
    } catch (error) {
      next(error);
    }
  }

    // crear product engarzandolo con id user  //
  // token y rollos ??
// revisar enviar por paramas?
     const createProductId = async (req, res, next) => {
        try {
          const productData = req.body;
          const sellerId = req.user.id; // user.id  no lo tengo claro 
          const productId = await Product.createProductId(productData, sellerId);
          res.status(201).json({ id: productId, message: 'Producto creado exitosamente' });
        } catch (error) {
          next(error);
        }
      }

    //  BUSCADOR por body quizas mejor por params ... va bien 
    const searchProducts = async (req, res, next) => {
      try {
        const { name, category, sellerId, price, location } = req.body;
        console.log('Datos de búsqueda:', { name, category, sellerId, price,location });
    
        const searchParams = {
          name,
          category,
          sellerId,
          price,
          location
        
        };
    
        
        Object.keys(searchParams).forEach(key => searchParams[key] === undefined && delete searchParams[key]);
    
        const products = await Product.searchProducts(searchParams);
        res.status(200).json(products);
      } catch (error) {
        next(error);
      }
    };
    
export{ getAllProducts, createProduct,createProductId,getProductsByUserId, searchProducts}
