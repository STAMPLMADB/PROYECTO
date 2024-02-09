import express from "express";
import authenticateToken from "../middlewares/middleToken.js";

import {
  controllerInsertFavorite,
  controllerFavoriteProductsByUserId,
} from "../controllers/favorites/index.js";

const router = express.Router();

router.post("/favorites/add", authenticateToken, controllerInsertFavorite);
router.get("/favorites", authenticateToken, controllerFavoriteProductsByUserId);

export default router;
