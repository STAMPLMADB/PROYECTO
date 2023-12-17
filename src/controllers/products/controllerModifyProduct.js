import { modifyProduct } from "../../models/products/index.js";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";


const controllerModifyProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    const id = req.query.id
    const file = req.files.avatar;
    const finalFileName = uuidv4() + "-" + file.name;
    file.mv(`./uploads/${finalFileName}`);

    // JOII
    const allowedCategories = [
      "consola",
      "ordenador",
      "radio",
      "televisor",
      "movil",
    ];
    const schema = Joi.object().keys({
      name: Joi.string().min(1).max(80),
      category: Joi.string()
        .valid(...allowedCategories),
      price: Joi.number().min(0),
      location: Joi.string(),
      avatar: Joi.optional(),
      description: Joi.string(),
    });

    const validation = schema.validate(req.body);

    if (validation.error) {
      return res.send(validation.error.message);
    }

    const sellerId = req.user.id; // user.id  no lo tengo claro
    const productId = await modifyProduct(
      productData,
      sellerId,
      id
    );
    res
      .status(201)
      .json({ id: productId, message: "Producto modificado exitosamente" });
  } catch (error) {
    next(error);
  }
};

export default controllerModifyProduct;
