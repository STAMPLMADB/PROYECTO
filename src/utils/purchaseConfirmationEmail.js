import transport from "./sendMail";
//efectuar el envío del correo al usuario
//aquí lo que está dentro del parentesis son parámetros

const purchaseConfirmationEmail = async (
  email,
  reservationLocation,
  reservationDate
) => {
  // envia el mail con el debido objeto de transporte
  try {
    const mailOptions = {
      from: SMTP_USER,
      to: email,
      subject: "Compra confirmada",
      text: `El vendedor ha confirmado tu compra, los datos de entrega 
      de tu producto son fecha de entrega:${reservationDate}
       y lugar de la entrega:${reservationLocation}, esperamos que disfrutes el producto. Gracias por utilizar RetroShop`,
    };
    await transport.sendMail(mailOptions);
  } catch (error) {
    console.error("Ufff ha ocurrido un error en el envío!!", error);
  }
};

export default purchaseConfirmationEmail;
