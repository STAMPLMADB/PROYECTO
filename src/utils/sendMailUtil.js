//importamos nuestras dependencias
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
//aquí lo que está dentro del parentesis son parámetros

const sendMailUtil = async (email, verificationCode) => {
  // envia el mail con el debido objeto de transporte
  try {
    const mailOptions = {
      from: SMTP_USER,
      to: email,
      subject: "Verificacion de cuenta",
      text: `¡Gracias por registrarte! Tu código de verificación es: ${verificationCode}`,
    };
    await transport.sendMail(mailOptions);

    return verificationCode;
  
  } catch (error) {
    console.error("Ufff ha ocurrido un error en el envío!!", error);
  }
};

export default sendMailUtil;
