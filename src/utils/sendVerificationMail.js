import transport from "./sendMail";

//efectuar el envío del correo al usuario
//aquí lo que está dentro del parentesis son parámetros

const sendVerificationMail = async (email, verificationCode) => {
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

export default sendVerificationMail;
