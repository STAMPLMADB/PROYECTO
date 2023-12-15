import { createProductId } from "../../models/products/index.js";
import Joi from "joi";

// crear product engarzandolo con id user  //
// token y rollos ??
// revisar enviar por params?
const controllerCreateProductId = async (req, res, next) => {
  try {
    const productData = req.body;
    
    // JOII
    const allowedCategories = ['consola', 'ordenador', 'radio', 'televisor', 'movil'];
    const schema = Joi.object().keys({
      name: Joi.string().min(1).max(24).required(),
      category: Joi.string().valid(...allowedCategories).required(),
      price: Joi.number().min(0).required(),
      location: Joi.string().required(),
      imageURL: Joi.string().uri().required(),
      description: Joi.string().required()
    });
    
    const validation = schema.validate(req.body);

    if (validation.error){
      return res.send(validation.error.message);
    };

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
