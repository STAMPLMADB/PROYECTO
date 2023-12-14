import { getAllProducts } from "../../models/products/index.js";


/// trae todos lo productos
const controllerGetAllProducts = async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export default controllerGetAllProducts;
