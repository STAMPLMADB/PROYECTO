import sendMail from "./sendMail.js";
//efectuar el envío del correo al usuario
//aquí lo que está dentro del parentesis son parámetros

const purchaseConfirmationEmail = async (
  email,
  reservationLocation,
  reservationDate,
  reservationId
) => {
  const ruta = "/profile/reservations"
  const link = `http://localhost:5173/confirmacion/${reservationId}/${email}/${encodeURIComponent(ruta)}`
  await sendMail(
    email,
    "Compra confirmada",
    `El vendedor ha confirmado tu compra, la entrega 
    de tu producto en la fecha y hora:${reservationDate}
     y lugar de la entrega será en:${reservationLocation}, Esperamos que disfrutes de tu compra. Gracias por utilizar RetroShop`,
     link 
  );
};

export default purchaseConfirmationEmail;
