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

const sendMail = async (email, subject, text) => {
  const mailOptions = {
    from: SMTP_USER,
    to: email,
    subject,
    text,
  };
  await transport.sendMail(mailOptions);
};

export default sendMail;
