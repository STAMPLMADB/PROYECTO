import { searchProducts } from "../../models/products/index.js";
import Joi from "joi";

//  BUSCADOR por body quizas mejor por params ... va bien
const controllerSearchProducts = async (req, res, next) => {
  try {
    const { name, category, sellerId, price, location } = req.body;
    console.log("Datos de búsqueda:", {
      name,
      category,
      sellerId,
      price,
      location,
    });

// pendiente de ver si necesita JOI
//JOIII
const allowedCategories = ['consola', 'ordenador', 'radio', 'televisor', 'movil']
const schema = Joi.object().keys({
  name: Joi.string().min(1).max(24),
  category: Joi.string().valid(allowedCategories),
  price: Joi.number().integer().positive().min(1).max(1000000),
  location: Joi.string(),
});

const validation = schema.validate(req.body);

if (validation.error){
  res.send(validation.error.message);
};


    const searchParams = {
      name,
      category,
      sellerId,
      price,
      location,
    };

    Object.keys(searchParams).forEach(
      (key) => searchParams[key] === undefined && delete searchParams[key]
    );

    const products = await searchProducts(searchParams);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export default controllerSearchProducts;
