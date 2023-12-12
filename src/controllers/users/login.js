import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import selectUserByEmail from "../../models/users/selectUserByEmail.js";
// import generateError from "../../utils/generateError.js";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(password);

    const userDb = await selectUserByEmail(email);
    console.log(userDb.password);

    if (!userDb) {
      res.send("El email  son incorrectos", 400);
    }
    const isPasswordOk = await bcrypt.compare(password, userDb.password);

    if (!isPasswordOk) {
      res.send("El la contraseña son incorrectos", 400);
    }

    if (userDb.isEmailValidated === false) {
      res.send("Esta cuenta no ha sido verificada, revisa tu email", 400);
    }

    const jwtPayload = { id: userDb.id };

    // const token = jwt.sign(jwtPayload, process.env.TOKEN_SECRET, {
    //   expiresIn: "7d",
    // });

    res.send({ message: "Login correcto" });
    console.log("todo en orden");
  } catch (error) {
    next(error);
  }
};

export default login;
