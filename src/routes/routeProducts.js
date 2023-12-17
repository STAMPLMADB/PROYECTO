import express from "express";
import authenticateToken from "../middlewares/middleToken.js";
import {
  controllerSearchProducts,
  controllerGetProductsByUserId,
  controllerGetAllProducts,
  controllerCreateProductId,
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
router.post("/products:productId");

export default router;
