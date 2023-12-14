import { createProduct } from "../../models/products/index.js";

/// ok generamos productos pero sin vincular al id funciona guay pero
// no es lo correcto
const controllerCreateProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    const productId = await createProduct(productData);
    res
      .status(201)
      .json({ id: productId, message: "Producto creado exitosamente" });
  } catch (error) {
    next(error);
  }
};

export default controllerCreateProduct;
