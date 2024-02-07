import {
  deleteProduct,
  selectProductById,
} from "../../models/products/index.js";
import getStatusByProductId from "../../models/reservation/getStatusByProductId.js";
import generateError from "../../utils/generateError.js";

const controllerDeleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const loggedUserId = req.user.id;

    const { product } = await selectProductById(id);
    const { status } = await getStatusByProductId(product.id);
    console.log(status);
    if (!product) {
      generateError("El producto no existe", 400);
    }
    if (status === "pendiente") {
      generateError("el articulo tiene una reserva", 400);
    }
    if (product.seller.id !== loggedUserId) {
      generateError("No eres el propietario de este producto", 400);
    }

    const data = await deleteProduct(id);
    if (!data) {
      // por si el productId no existe o no se ha creado
      generateError("Producto no Encontrado", 404);
    }
    res.status(200);
    res.json({
      id: id,
      message: "Producto eliminado exitosamente",
    });
  } catch (error) {
    next(error);
  }
};

export default controllerDeleteProduct;
