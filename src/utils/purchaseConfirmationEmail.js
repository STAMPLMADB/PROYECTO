import sendMail from "./sendMail.js";
//efectuar el envío del correo al usuario
//aquí lo que está dentro del parentesis son parámetros

const purchaseConfirmationEmail = async (
  email,
  reservationLocation,
  reservationDate
) => {
  const link = `http://localhost:5173`
  await sendMail(
    email,
    "Compra confirmada",
    `El vendedor ha confirmado tu compra, los datos de entrega 
    de tu producto son fecha de entrega:${reservationDate}
     y lugar de la entrega:${reservationLocation}, esperamos que disfrutes el producto. Gracias por utilizar RetroShop`,
     link 
  );
};

export default purchaseConfirmationEmail;
