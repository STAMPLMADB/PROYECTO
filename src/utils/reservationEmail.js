//importamos nuestras dependencias
import { v4 as uuidv4 } from "uuid";
//import { verificationCode } from "../controllers/users/register.js";
import nodemailer from "nodemailer";

import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from "../../env.js";

//Preparando el transporte de nuestro correo

const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

//efectuar el envío del correo al usuario
//aquí lo que está dentro del parentesis son parametros

const reservationEmail = async (email, link) => {
  // envia el mail con el debido objeto de transporte
  try {

    const mailOptions = {
      from: SMTP_USER,
      to: email,
      subject: "Propuesta de compra",
      text: `¡Felicidades un usuario se ha interesado por tu producto! Pincha aquí para concertar cita ${link}`,
    };
    await transport.sendMail(mailOptions);

   

  } catch (error) {
    console.error("Ufff ha ocurrido un error en el envío!!", error);
  }
};

export default sendMailUtil;
