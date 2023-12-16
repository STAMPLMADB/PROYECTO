import Joi from "joi";
import createReservation from "../../models/reservation/createReservation.js";
import { reservationEmail } from "../../utils/index.js";

const controllerReservation = async (req, res, next) => {
  try {
    const productId = req.query.productId; // Obtener productId de los parámetros de la consulta
    const { reservationLocation, status } = req.body;
    const reservationDate = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const schema = Joi.object().keys({
      reservationLocation: Joi.string().required(),
      status: Joi.string()
        .valid("pendiente", "en proceso", "finalizada")
        .required(),
      //  review: Joi.string().valid("1", "2", "3", "4", "5").required(),
    });

    const validation = schema.validate({ reservationLocation, status });

    if (validation.error) {
      return res.status(400).json({ error: validation.error.message });
    }

    const buyerId = req.user.id;

    const { reservationId, email } = await createReservation(
      {
        reservationLocation,
        reservationDate,
        status,
      },
      buyerId,
      productId // Pasar productId como parámetro
    );

    await reservationEmail(email);
    // console.log(email);
    res
      .status(201)
      .json({ id: reservationId, message: "Reserva creada exitosamente" });
  } catch (error) {
    next(error);
  }
};

export default controllerReservation;
