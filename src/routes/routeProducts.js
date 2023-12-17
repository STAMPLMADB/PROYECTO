import express from "express";
import authenticateToken from "../middlewares/middleToken.js";
import {
  controllerSearchProducts,
  controllerGetProductsByUserId,
  controllerGetAllProducts,
  controllerCreateProductId,
  controllerModifyProduct,
  controllerDeleteProduct
} from "../controllers/products/index.js";

const router = express.Router();
//Usuario anonimo vea todos los productos

router.get("/products", controllerGetAllProducts);

//Usuarioo vea sus productos
router.get("/products/user/:userId", controllerGetProductsByUserId);

router.post("/products/search", controllerSearchProducts);

//vincular id s producto solo pueden darlo de alta
router.post("/products/create", authenticateToken, controllerCreateProductId);

// Modificar producto
router.put("/products", authenticateToken,controllerModifyProduct);

//Eliminar producto
router.delete("/products", authenticateToken, controllerDeleteProduct);

export default router;
