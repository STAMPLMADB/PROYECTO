import pool from "../../db/pool.js";

const verify = async (req, res, next) => {
  try {
    const { email, verificationCode } = req.body;

    // Busca al usuario en la base de datos por correo electrónico y código de verificación
    const user = await getUserByVerificationCode(email, verificationCode);

    if (user && user.verification_code === verificationCode) {
      // Actualiza el estado de verificación del usuario en la base de datos
      await updateVerificationStatus(email);

      res.status(200).send({
        message: "Verificación exitosa. Ahora puedes iniciar sesión.",
      });
    } else {
      res.status(400).send({ message: "Código de verificación incorrecto." });
    }
  } catch (error) {
    next(error);
  }
};

const getUserByVerificationCode = async (email, verificationCode) => {
  const [[user]] = await pool.query(
    "SELECT * FROM users WHERE email = ? AND verification_code = ?",
    [email, verificationCode]
  );
  return user;
};

const updateVerificationStatus = async (email) => {
  await pool.query("UPDATE users SET isEmailValidated = true WHERE email = ?", [
    email,
  ]);
};

export default verify;
