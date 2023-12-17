import { deleteProduct } from "../../models/products/index.js"



const controllerDeleteProduct = async (req, res, next) => {
  try {
    const id = req.query.id;
    console.log(id);
    const sellerId = req.user.id;
   await deleteProduct( id, sellerId );
    res.status(201)
      res.json({ id: id, sellerId:sellerId, message: "Producto eliminado exitosamente" });
  } catch (error) {
    next(error);
  }
};

export default controllerDeleteProduct;