import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import selectUserByEmail from "../../models/users/selectUserByEmail.js";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    

    const userDb = await selectUserByEmail(email);
     
    if (!userDb) {

      return res.status(400).send("El email o la contraseña son incorrectos");
    }

    const isPasswordOk = await bcrypt.compare(password, userDb.password);

    if (!isPasswordOk) {

      return res.status(400).send("El email o la contraseña son incorrectos");

    }

    // Revisar cómo se obtiene userDb.isEmailValidated de la base de datos


    if (userDb.isEmailValidated === 0) {
      return res.status(400).send("La cuenta no ha sido verificada, revisa tu email");
    }

    // Si todos los controles son exitosos, puedes generar el token JWT aquí

    const jwtPayload = { id: userDb.id };
    const token = jwt.sign(jwtPayload, process.env.TOKEN_SECRET, {
      expiresIn: "7d",
    });
    console.log(token)
    res.send({ message: "Login correcto" }
    );
  } catch (error) {
    next(error);
  }
};

export default login;
