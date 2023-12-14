import { getProductsByUserId } from "../../models/products/index.js";

// por id  no tiene sentido
const controllerGetProductsByUserId = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const products = await getProductsByUserId(userId);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };

  export default controllerGetProductsByUserId;
