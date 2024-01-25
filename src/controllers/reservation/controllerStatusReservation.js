
import { generateError } from "../../utils/index.js";
import {
  
  updateReservationStatus,
} from "../../models/reservation/index.js";

const controllerStatusReservation = async (req, res, next) => {
  try {
    const { reservationId } = req.body;
   console.log(reservationId);
   console.log("controllerstatus ");

    if (reservationId ) {
      await updateReservationStatus(reservationId);

      res.status(200).send({
        message: "Se ha cambiado el status a en proceso correctamente",
      });
    } else {
      generateError("Ha ocurrido un error", 400);
    }
  } catch (error) {
    next(error);
  }
};

export default controllerStatusReservation;

// Queda cerrar la eliminación de la lógica reservation_token


/*
import { generateError } from "../../utils/index.js";
import { getReservationById, updateReservationStatus } from "../../models/reservation/index.js";

const controllerStatusReservation = async (req, res, next) => {
  try {
    const { reservationToken, reservationId } = req.body;
 console.log(reservationToken,reservationId);
    if (reservationToken && reservationId) {
      const reservation = await getReservationById(reservationId);
      
      if (reservation) {
        await updateReservationStatus(reservationToken);

        return res.status(200).send({
          message: "Se ha cambiado el status a en proceso correctamente",
          // Puedes incluir más información sobre la reserva si es necesario
          // reservation: updatedReservation,
        });
      } else {
        // La reserva no fue encontrada
        generateError("La reserva no existe", 404);
      }
    } else {
      // No se proporcionó reservationToken o reservationId
      generateError("Faltan parámetros", 400);
    }
  } catch (error) {
    next(error);
  }
};

export default controllerStatusReservation*/