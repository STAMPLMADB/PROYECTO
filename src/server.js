import express from "express";
import { PORT } from "../env.js";
import useDb from "./db/useDb.js";
import register from "./controllers/users/register.js"


const app = express();

useDb();

app.use(express.json());



app.post("/register", register)

app.listen(PORT, ()=>{
    console.log(`SERVIDOR ACTIVO ${PORT}`);})

