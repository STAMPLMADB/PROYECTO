import sendMail from "./sendMail.js";


const linkverificacion = "http://localhost:5173/profile/validation/"
const sendVerificationMail = async (email, verificationCode, link) => {

  link = linkverificacion+verificationCode +"/"+ email
    await sendMail(
      email,
      "Verificacion de cuenta",
      `¡Vete al siguiente enlace para confirmar tu cuenta!`,
      link

    )
};

export default sendVerificationMail;
