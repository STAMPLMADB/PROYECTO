import express from "express";
import { PORT } from "../env.js";
import useDb from "./db/useDb.js";
import { register } from "./controllers/users/register.js";
import verify from "./controllers/users/verify.js";
import login from "./controllers/users/login.js";
import {
  getAllProducts,
  createProduct,
  createProductId,
  getProductsByUserId,
  searchProducts,
} from "./controllers/products/products.js";
import { authenticateToken } from "./middlewares/index.js";
import { handleError } from "./middlewares/index.js";
import updateUserController from "./controllers/users/profile.js";
import fileUpload from "express-fileupload";

const app = express();

useDb();

app.use(express.json());
app.use(fileUpload({ createParentPath: true }));

app.post("/register", register);

app.post("/verify", verify);

app.post("/login", login);

//
app.get("/products", getAllProducts);
app.get("/products/user/:userId", getProductsByUserId);

app.post("/products/search", searchProducts);

app.use(handleError);
// id seller a mano:  product sin problema
//app.post("/products", createProduct);
//********************//
//vincular id s producto solo pueden darlo de alta
app.post("/products", authenticateToken, createProductId);
// modificar usuario
app.post("/products:productId")
app.put("/profile", authenticateToken, updateUserController);

app.listen(PORT, () => {
  console.log(`SERVIDOR ACTIVO ${PORT}`);
});
