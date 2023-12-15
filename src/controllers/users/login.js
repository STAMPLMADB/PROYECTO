import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {selectUserByEmail} from "../../models/users/index.js";
import { generateError } from "../../utils/index.js";
import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userDb = await selectUserByEmail(email);

    // JOIIIIIIII
    const joiPassword = Joi.extend(joiPasswordExtendCore);
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: joiPassword.string().required()
    });

    const validation = schema.validate(req.body);

    if (validation.error){
      return res.send(validation.error.message);
    };

    if (!userDb) {
      generateError("El email o la contraseña son incorrectos", 400);
    }

    const isPasswordOk = await bcrypt.compare(password, userDb.password);

    if (!isPasswordOk) {
      generateError("El email o la contraseña son incorrectos", 400);
    }

    // Revisar cómo se obtiene userDb.isEmailValidated de la base de datos

    if (userDb.isEmailValidated === 0) {
      generateError("La cuenta no ha sido verificada, revisa tu email", 400);
    }

    // Si todos los controles son exitosos, puedes generar el token JWT aquí

    const jwtPayload = { id: userDb.id };
    const token = jwt.sign(jwtPayload, process.env.TOKEN_SECRET, {
      expiresIn: "7d",
    });
    console.log(token);
    res.send({ message: "Login correcto", token: token  });
  } catch (error) {
    next(error);
  }
};

export default login;
