import express from "express";
import { PORT } from "../env.js";


const app = express();
app.use(express.json());

app.listen(PORT, ()=>{
    console.log(`SERVIDOR ACTIVO ${PORT}`);})