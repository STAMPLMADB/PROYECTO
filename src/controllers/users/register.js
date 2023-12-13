import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { sendMailUtil } from "../../utils/index.js";
import {selectUserByEmail, insertUser} from "../../models/users/index.js"

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userWithSameEmail = await selectUserByEmail(email);

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
      data: { id: insertId, nombre: name, email, verificationCode },
    });
  } catch (error) {
    next(error);
  }
};



export { register };
