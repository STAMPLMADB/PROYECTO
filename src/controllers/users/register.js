import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { sendMailUtil } from "../../utils/index.js";
import {selectUserByEmail, insertUser} from "../../models/users/index.js"
import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userWithSameEmail = await selectUserByEmail(email);
    
// JOI
    const joiPassword = Joi.extend(joiPasswordExtendCore);
    const schema = Joi.object().keys({
      name: Joi.string().min(1).max(24).required(),
      email: Joi.string().email().required(),
      password: joiPassword.string().min(8).minOfUppercase(1).minOfSpecialCharacters(1).required()
    });
    
    const validation = schema.validate(req.body);

    if (validation.error){
      return res.send(validation.error.message);
    };

    if (userWithSameEmail) {
      console.error("Ya existe un usuario con este email", 400);
      return res.status(400).send("Ya existe un usuario con este email");
    }

    const verificationCode = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertId = await insertUser({
      name,
      email,
      hashedPassword, // Usar hashedPassword en lugar de password
      verificationCode,
    });

    await sendMailUtil(email, verificationCode);

    res.status(201).send({
      message:
        "Registro completado con éxito. Te hemos enviado un correo para que verifiques tu registro",
      data: { id: insertId, nombre: name, email },
    });
  } catch (error) {
    next(error);
  }
};

export { register };
