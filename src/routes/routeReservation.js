import express from "express";
import authenticateToken from "../middlewares/middleToken.js";
import { controllerGetReserva, controllerPurchaseConfirmation, controllerReservation, controllerGetReservations} from "../controllers/reservation/index.js";
import controllerGetReservationsSeller from "../controllers/products/controllerGetReservationSeller.js";


const router = express.Router();

router.post("/reservation/:productId", authenticateToken ,controllerReservation);




//COMPRA HECHA 
router.patch('/products/purchaseConfirmation/:reservationId',authenticateToken, controllerPurchaseConfirmation)

//ver todas las reservas del usuario logeado
router.get("/reservations", authenticateToken, controllerGetReservations)
router.get("/reservationsSeller", authenticateToken, controllerGetReservationsSeller)
router.get("/reservaStatus/:productId", authenticateToken, controllerGetReserva)

export default router;