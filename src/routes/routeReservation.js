import express from "express";
import authenticateToken from "../middlewares/middleToken.js";
import { controllerPurchaseConfirmation, controllerReservation, controllerStatusReservation } from "../controllers/reservation/index.js";
import controllerGetReservations from "../controllers/reservation/controllerGetReservations.js";
import controllerGetOnlyReservation from "../controllers/reservation/controllerGetOnlyReservation.js";
import controllerInsertReview from "../controllers/reservation/controllerInsertReview.js";

const router = express.Router();

router.post("/reservation/:productId", authenticateToken ,controllerReservation);
router.get("/reservaStatus/:productId", controllerGetOnlyReservation);
router.put("/review/:productId", authenticateToken,controllerInsertReview);


//Verificar reserva? - Cambiar status de pendiente --> en proceso
router.put('/reservation-update',authenticateToken,controllerStatusReservation)

//COMPRA HECHA 
router.patch('/products/purchaseConfirmation/:reservationId',authenticateToken, controllerPurchaseConfirmation)

//ver todas las reservas del usuario logeado
router.get("/reservations", authenticateToken, controllerGetReservations)

export default router;