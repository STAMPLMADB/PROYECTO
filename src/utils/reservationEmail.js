import sendMail from "./sendMail.js";

const reservationEmail = async (email, reservationId) => {
const ruta = "/profile/seller"
  const link = `http://localhost:5173/confirmacion/${reservationId}/${email}/${encodeURIComponent(ruta)}`
  
  await sendMail(
    email,
    "Propuesta de compra",
    `¡Felicidades un usuario se ha interesado por tu producto! Pincha aquí para confirmar en la ficha del producto  la hora  y el lugar de la entrega.
   `,
  link

  );
};

export default reservationEmail;