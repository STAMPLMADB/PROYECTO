import pool from "../../db/pool.js";
import Joi from "joi";
import purchaseConfirmationEmail from "../../utils/purchaseConfirmationEmail.js";
import {
  getReservationById,
  purchaseConfirmation,
} from "../../models/reservation/index.js";

const controllerPurchaseConfirmation = async (req, res, next) => {
  try {
    const { reservationLocation, reservationDate } = req.body;
    const { reservationId } = req.query;

    const schema = Joi.object().keys({
      reservationDate: Joi.date().iso(),
      reservationLocation: Joi.string(),
    });

    const validation = schema.validate({
      reservationDate,
      reservationLocation,
    });

    if (validation.error) {
      return res.status(400).json({ error: validation.error.message });
    }

    // Consulta para obtener el correo electrónico del vendedor
    const selectQuery = `
    SELECT u.email 
    FROM users u
    INNER JOIN reservation r ON r.buyerId = u.id
    WHERE r.id = ?`;

    const emailResult = await pool.query(selectQuery, [reservationId]);

    if (!emailResult || !emailResult.length) {
      throw new Error("Correo electrónico del comprador no encontrado");
    }

    // Seleccionar el correo electrónico del vendedor
    const patata = emailResult[0];
    const email = patata[0].email;

    if (reservationId) {
      await getReservationById(reservationId);

      await purchaseConfirmation(
        reservationLocation,
        reservationDate,
        reservationId
      );

      await purchaseConfirmationEmail(
        email,
        reservationLocation,
        reservationDate
      );

      res.status(201).json({ message: " Compra confirmada con éxito" });
    } else {
    }
  } catch (error) {
    next(error);
  }
};

export default controllerPurchaseConfirmation;
