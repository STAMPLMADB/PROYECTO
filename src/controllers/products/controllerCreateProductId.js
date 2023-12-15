import { createProductId } from "../../models/products/index.js";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";

// crear product engarzandolo con id user  //
// token y rollos ??
// revisar enviar por params?
const controllerCreateProductId = async (req, res, next) => {
  try {
    const productData = req.body;

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
      name: Joi.string().min(1).max(80).required(),
      category: Joi.string()
        .valid(...allowedCategories)
        .required(),
      price: Joi.number().min(0).required(),
      location: Joi.string().required(),
      avatar: Joi.optional(),
      description: Joi.string().required(),
    });

    const validation = schema.validate(req.body);

    if (validation.error) {
      return res.send(validation.error.message);
    }

    const sellerId = req.user.id; // user.id  no lo tengo claro
    const productId = await createProductId(
      productData,
      finalFileName,
      sellerId
    );
    res
      .status(201)
      .json({ id: productId, message: "Producto creado exitosamente" });
  } catch (error) {
    next(error);
  }
};

export default controllerCreateProductId;
