import { deleteProduct } from "../../models/products/index.js";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";


const controllerDeleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const sellerId = req.user.id; // user.id  no lo tengo claro
    const productId = await deleteProduct(
      id,
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
