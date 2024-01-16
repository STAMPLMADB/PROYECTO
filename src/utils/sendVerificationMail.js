import sendMail from "./sendMail.js";


const linkverificacion = "http://localhost:5173/validation:"
const sendVerificationMail = async (email, verificationCode, link) => {

    link = linkverificacion+verificationCode
    await sendMail(
      email,
      "Verificacion de cuenta",
      `¡Gracias por registrarte! Tu código de verificación es: ${verificationCode}`,
      link

    );
};

export default sendVerificationMail;


