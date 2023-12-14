import { createProductId } from "../../models/products/index.js";

// crear product engarzandolo con id user  //
// token y rollos ??
// revisar enviar por params?
const controllerCreateProductId = async (req, res, next) => {
  try {
    const productData = req.body;
    const sellerId = req.user.id; // user.id  no lo tengo claro
    const productId = await createProductId(productData, sellerId);
    res
      .status(201)
      .json({ id: productId, message: "Producto creado exitosamente" });
  } catch (error) {
    next(error);
  }
};

export default controllerCreateProductId;
