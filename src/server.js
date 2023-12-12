import express from "express";
import { PORT } from "../env.js";
import useDb from "./db/useDb.js";
import pool from "./db/pool.js";
import {register} from "./controllers/users/register.js";
import verify from "./controllers/users/verify.js";
import login from "./controllers/users/login.js";

const app = express();

useDb();

app.use(express.json());

app.post("/register", register);

app.post("/verify", verify);

app.post("/login", login);

app.listen(PORT, () => {
  console.log(`SERVIDOR ACTIVO ${PORT}`);
});
