import sendMail from "./sendMail.js";

//efectuar el envío del correo al usuario
//aquí lo que está dentro del parentesis son parámetros

const sendVerificationMail = async (email, verificationCode) => {
  // envia el mail con el debido objeto de transporte
  
    await sendMail(
      email,
      "Verificacion de cuenta",
      `¡Gracias por registrarte! Tu código de verificación es: ${verificationCode}`
    );
};

export default sendVerificationMail;
