//import Joi from "joi";
import createReservation from "../../models/reservation/createReservation.js";
import { v4 as uuidv4 } from "uuid";
import { reservationEmail } from "../../utils/index.js";

const controllerReservation = async (req, res, next) => {
  try {
    const productId = req.query.productId; // Obtener productId de los parámetros de la consulta
    //const { status } = req.body;
    const buyOrder = new Date().toISOString().slice(0, 19).replace("T", " ");

    // const schema = Joi.object().keys({
    //   status: Joi.string()
    //     .valid("pendiente", "en proceso", "finalizada")
    //     .required(),
    //   //  review: Joi.string().valid("1", "2", "3", "4", "5").required(),
    // });

    //const validation = schema.validate({ status });

    // if (validation.error) {
    //   return res.status(400).json({ error: validation.error.message });
    // }

    const buyerId = req.user.id;

    const reservationToken = uuidv4();
    const { reservationId, email } = await createReservation(
      {
        buyOrder,
      },
      buyerId,
      productId, // Pasar productId como parámetro
      reservationToken
    );

    await reservationEmail(email, reservationId);
    // console.log(email);
    res
      .status(201)
      .json({ id: reservationId, reservationToken, message: "Reserva creada exitosamente" });
  } catch (error) {
    next(error);
  }
};

export default controllerReservation;
