import express from "express";
import cors from "cors"
import { PORT } from "../env.js";
import useDb from "./db/useDb.js";
import { register } from "./controllers/users/register.js";
import verify from "./controllers/users/verify.js";
import login from "./controllers/users/login.js";
import {
  controllerGetAllProducts,
  controllerCreateProductId,
  controllerGetProductsByUserId,
  controllerSearchProducts,
} from "./controllers/products/index.js";
import { authenticateToken } from "./middlewares/index.js";
import { handleError } from "./middlewares/index.js";
import updateUserController from "./controllers/users/profile.js";
import fileUpload from "express-fileupload";
import controllerReservation from "./controllers/reservation/controllerReservation.js"

const app = express();

useDb();
app.use(cors())

app.use(express.json());
app.use(fileUpload({ createParentPath: true }));

app.post("/register", register);

app.post("/verify", verify);

app.post("/login", login);

// modificar usuario
app.put("/profile", authenticateToken, updateUserController);

//
//Usuario anonimo vea todos los productos
app.get("/products", controllerGetAllProducts);

//Usuarioo vea sus productos
app.get("/products/user/:userId", controllerGetProductsByUserId);

app.post("/products/search", controllerSearchProducts);

app.use(handleError);

//vincular id s producto solo pueden darlo de alta
app.post("/products/create", authenticateToken, controllerCreateProductId);

// Modificar producto
app.post("/products:productId");

//Enviar correo para reservar producto
// app.post("/reservation/:id", authenticateToken ,controllerReservation);
// app.post("/reservation:id", authenticateToken ,controllerReservation);
// app.get("/reservation:id", authenticateToken ,controllerReservation);
// app.get("/reservation/:id", authenticateToken ,controllerReservation);
app.post("/reservation", authenticateToken ,controllerReservation);


app.listen(PORT, () => {
  console.log(`SERVIDOR ACTIVO ${PORT}`);
});
