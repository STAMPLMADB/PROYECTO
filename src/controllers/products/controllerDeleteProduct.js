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

    const {product} = await selectProductById(id);
   
    let status;
    const statusResult = await getStatusByProductId(product.id);
    if (statusResult) {
      status = statusResult.status;
    } else {
      status = null;
    }

    console.log(status);
    if (status) {
      return res.status(400).json({ error: "El artículo tiene una reserva" });
    }
    console.log(status);
    if (!product) {
      return res.status(400).json({ error: "El producto no existe"});
    }
    
    if (product.sellerId !== loggedUserId) {
      return res.status(400).json({ error:"No eres el propietario de este producto"});
    }

    const data = await deleteProduct(id);
    if (!data) {
      // por si el productId no existe o no se ha creado
      return res.status(404).json({ error: "Producto no Encontrado" });
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
