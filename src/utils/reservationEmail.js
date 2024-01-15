import sendMail from "./sendMail.js";

const reservationEmail = async (email, reservationId) => {
  // envia el mail con el debido objeto de transporte
  await sendMail(
    email,
    "Propuesta de compra",
    `¡Felicidades un usuario se ha interesado por tu producto! Pincha aquí para aceptar la propuesta de compra http://localhost:3001/reservation-update?reservationId=${reservationId}`
  );
};

export default reservationEmail;
