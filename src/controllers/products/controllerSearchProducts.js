import { searchProducts } from "../../models/products/index.js";

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
