import { deleteProduct } from "../../models/products/index.js"

const controllerDeleteProduct = async (req, res, next) => {
  try {
    const productId = req.query.id;
    const sellerId = req.user.id;
    await deleteProduct(
      productId,
      sellerId
    );
    res
      .status(201)
      .json({ id: productId, message: "Producto eliminado exitosamente" });
  } catch (error) {
    next(error);
  }
};

export default controllerDeleteProduct;
