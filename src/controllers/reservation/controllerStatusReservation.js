
import { generateError } from "../../utils/index.js";
import {
  getReservationByToken,
  updateReservationStatus,
} from "../../models/reservation/index.js";

const controllerStatusReservation = async (req, res, next) => {
  try {
    const { reservationToken } = req.body;
    const reservation = await getReservationByToken(reservationToken);

    if (reservation && reservation.reservation_token === reservationToken) {
      await updateReservationStatus(reservationToken);

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
