import {
  deleteProduct,
  selectProductById,
} from "../../models/products/index.js";
import generateError from "../../utils/generateError.js";

const controllerDeleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const loggedUserId = req.user.id;

    const product = await selectProductById(id);

    if (!product) {
      generateError("El producto no existe", 404);
    }

    if (product.sellerId !== loggedUserId) {
      generateError("No eres el propietario de este producto", 403);
    }

    await deleteProduct(id);
    res.status(201);
    res.json({
      id: id,
      message: "Producto eliminado exitosamente",
    });
  } catch (error) {
    next(error);
  }
};

export default controllerDeleteProduct;
