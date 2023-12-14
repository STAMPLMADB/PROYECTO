import express from "express";
import { PORT } from "../env.js";
import useDb from "./db/useDb.js";
import { register } from "./controllers/users/register.js";
import verify from "./controllers/users/verify.js";
import login from "./controllers/users/login.js";
import {
  controllerGetAllProducts,
  controllerCreateProduct,
  controllerCreateProductId,
  controllerGetProductsByUserId,
  controllerSearchProducts,
} from "./controllers/products/index.js";
import { authenticateToken } from "./middlewares/index.js";
import { handleError } from "./middlewares/index.js";
import { updateUser } from "./controllers/users/updateUser.js";
const app = express();

useDb();

app.use(express.json());

app.post("/register", register);

app.post("/verify", verify);

app.post("/login", login);

//
app.get("/products", controllerGetAllProducts);
app.get("/products/user/:userId", controllerGetProductsByUserId);

app.post("/products/search", controllerSearchProducts);

app.use(handleError);
// id seller a mano:  product sin problema
app.post("/products", controllerCreateProduct);
//vincular id s producto solo pueden darlo de alta
app.post("/products/user", authenticateToken, controllerCreateProductId);
// modificar usuario
app.put("/profile", updateUser);

app.listen(PORT, () => {
  console.log(`SERVIDOR ACTIVO ${PORT}`);
});
