import {
  modifyProduct,
  selectProductById,
} from "../../models/products/index.js";
import { generateError } from "../../utils/index.js";

const controllerModifyProduct = async (req, res, next) => {
  try {
    //const { id } = req.query; // ID producto
    const { name, category, price, location, description } = req.body;
    //const { avatarURL } = req.files;

    const loggedUserId = req.user.id;
    const id = req.params.productid;

    //console.log(loggedUserId);
    //console.log(id);

    const product = await selectProductById(id);

    if (!product) {
      generateError("El producto no existe", 404);
    }

    if (product.sellerId !== loggedUserId) {
      generateError("No eres el propietario de este producto", 403);
    }

    const productDataToUpdate = {};

    if (name) {
      productDataToUpdate.name = name;
    }

    if (category) {
      productDataToUpdate.category = category;
    }

    if (price) {
      productDataToUpdate.price = price;
    }

    if (location) {
      productDataToUpdate.location = location;
    }

    const file = req.files.avatar;
    const finalFileName = Date.now() + "-" + file.name;
    file.mv(`./uploads/${finalFileName}`);

    if (req.files) {
      productDataToUpdate.imageURL = finalFileName;
    }

    if (description) {
      productDataToUpdate.description = description;
    }

    await modifyProduct({ id, ...productDataToUpdate });

    if (modifyProduct) {
      return res.status(200).json({
        message: "Producto actualizado correctamente",
        data: { id, ...productDataToUpdate },
      });
    } else {
      return res
        .status(500)
        .json({ message: "Error al actualizar los datos del producto" });
    }
  } catch (error) {
    next(error);
  }
};

export default controllerModifyProduct;
