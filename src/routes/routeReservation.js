import express from "express";
import authenticateToken from "../middlewares/middleToken.js";
import { controllerPurchaseConfirmation, controllerReservation, controllerStatusReservation } from "../controllers/reservation/index.js";

const router = express.Router();

router.post("/reservation", authenticateToken ,controllerReservation);


//Verificar reserva? - Cambiar status de pendiente --> en proceso
router.post('/reservation-update',authenticateToken,controllerStatusReservation)

//COMPRA HECHA 
router.patch('/products/purchaseConfirmation',authenticateToken, controllerPurchaseConfirmation)

export default router;