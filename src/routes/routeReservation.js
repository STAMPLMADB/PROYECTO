import express from "express";
import authenticateToken from "../middlewares/middleToken.js";
import { controllerGetReserva, controllerPurchaseConfirmation, controllerReservation, controllerStatusReservation ,controllerGetReservations} from "../controllers/reservation/index.js";


const router = express.Router();

router.post("/reservation/:productId", authenticateToken ,controllerReservation);


//Verificar reserva? - Cambiar status de pendiente --> en proceso
router.put('/reservation-update',authenticateToken,controllerStatusReservation)

//COMPRA HECHA 
router.patch('/products/purchaseConfirmation/:reservationId',authenticateToken, controllerPurchaseConfirmation)

//ver todas las reservas del usuario logeado
router.get("/reservations", authenticateToken, controllerGetReservations)
router.get("/reservaStatus/:productId", authenticateToken, controllerGetReserva)

export default router;