import Joi from "joi";
import createReservation from "../../models/reserva/createReserva.js";
import sendMailUtil from "../../utils/sendMailUtil.js"; // Importar la función sendMailUtil
import { v4 as uuidv4 } from "uuid";
import pool from "../../db/pool.js"; // Asegúrate de importar tu pool de conexión a la base de datos

const controllerCreateReservation = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { reservationLocation, status, review } = req.body;
    const reservationDate = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const schema = Joi.object().keys({
      reservationLocation: Joi.string().required(),
      status: Joi.string()
        .valid("pendiente", "en proceso", "finalizada")
        .required(),
      review: Joi.string().valid("1", "2", "3", "4", "5").required(),
    });

    const validation = schema.validate({ reservationLocation, status, review });

    if (validation.error) {
      return res.status(400).json({ error: validation.error.message });
    }

    const buyerId = req.user.id;

    // Consulta para obtener el sellerId del producto
    const getProductSellerQuery = "SELECT sellerId FROM products WHERE id = ?";
    const [productSellerRows] = await pool.query(getProductSellerQuery, [
      productId,
    ]);

    if (productSellerRows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const sellerId = productSellerRows[0].sellerId;

    // Consulta para obtener el nombre y apellido del vendedor
    const getSellerInfoQuery =
      "SELECT firstName, lastName, email FROM users WHERE id = ?";
    const [sellerInfoRows] = await pool.query(getSellerInfoQuery, [sellerId]);

    if (sellerInfoRows.length === 0) {
      return res
        .status(404)
        .json({ error: "Información del vendedor no encontrada" });
    }

    const sellerEmail = sellerInfoRows[0].email;
    const sellerName = sellerInfoRows[0].firstName;
    const sellerLastName = sellerInfoRows[0].lastName;

    // Crear la reserva utilizando la función createReservation y el productId de los parámetros
    const reservationId = await createReservation(
      {
        reservationLocation,
        reservationDate,
        status,
        review,
        productId,
      },
      buyerId
    );

    // Enviar el correo electrónico al vendedor
    const verificationCode = uuidv4();
    const mailContent = `Hola ${sellerName} ${sellerLastName}, se ha creado una reserva para un producto. ¡Revisa tu cuenta!`;
    await sendMailUtil(sellerEmail, verificationCode, mailContent);

    res
      .status(201)
      .json({ id: reservationId, message: "Reserva creada exitosamente" });
  } catch (error) {
    next(error);
  }
};

export default controllerCreateReservation;
