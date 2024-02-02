import sendMail from "./sendMail.js";

const reservationEmail = async (email, reservationId,buyerEmail) => {

  const link = `http://localhost:5173/confirmacion/${reservationId}/${email}`
  
  await sendMail(
    email,
    "Propuesta de compra",
    `¡Felicidades un usuario se ha interesado por tu producto! Pincha aquí para aceptar la propuesta de compra 
    el correo del usuario con el ue tienes que contactar es ${buyerEmail}`,
  link

  );
};

export default reservationEmail;