import transport from "./sendMail";

//efectuar el envío del correo al usuario
//aquí lo que está dentro del parentesis son parámetros

const reservationEmail = async (email, reservationId) => {
  // envia el mail con el debido objeto de transporte
  try {
    const mailOptions = {
      from: SMTP_USER,
      to: email,
      subject: "Propuesta de compra",
      text: `¡Felicidades un usuario se ha interesado por tu producto! Pincha aquí para aceptar la propuesta de compra http://localhost:3001/reservation-update?reservationId=${reservationId}`,
    };
    await transport.sendMail(mailOptions);
  } catch (error) {
    console.error("Ufff ha ocurrido un error en el envío!!", error);
  }
};

export default reservationEmail;
