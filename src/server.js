import express from "express";
import { PORT } from "../env.js";
import register from "./controllers/users/register.js"


const app = express();
app.use(express.json());



app.post("/register", register)

app.listen(PORT, ()=>{
    console.log(`SERVIDOR ACTIVO ${PORT}`);})

