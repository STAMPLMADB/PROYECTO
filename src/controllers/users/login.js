import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import selectUserByEmail from "../../models/users/selectUserByEmail.js";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userDb = await selectUserByEmail(email);

    if (!userDb) {
      return res.status(400).send("El email es incorrecto");
    }

    const isPasswordOk = await bcrypt.compare(password, userDb.password);

    if (!isPasswordOk) {
      return res.status(400).send("La contraseña es incorrecta");
    }

    // Revisar cómo se obtiene userDb.isEmailValidated de la base de datos

    if (userDb.isEmailValidated === false) {
      return res.status(400).send("La cuenta no ha sido verificada, revisa tu email");
    }

    // Si todos los controles son exitosos, puedes generar el token JWT aquí

    const jwtPayload = { id: userDb.id };
    const token = jwt.sign(jwtPayload, process.env.TOKEN_SECRET, {
      expiresIn: "7d",
    });

    res.send({ message: "Login correcto" });
  } catch (error) {
    next(error);
  }
};

export default login;
