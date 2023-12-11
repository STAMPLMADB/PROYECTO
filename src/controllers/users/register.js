import bcrypt from "bcrypt";
import pool from "../../db/pool.js";

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userWithSameEmail = await selectUserByEmail(email);

    if (userWithSameEmail) {
      console.error("Ya existe un usuario con este email", 400);
      return res.status(400).send("Ya existe un usuario con este email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertId = await insertUser({ name, email, hashedPassword });

    res.status(201).send({
      message: "Registro completado con éxito",
      data: { id: insertId, nombre: name, email, hashedPassword },
    });
  } catch (error) {
    next(error);
  }
};

const selectUserByEmail = async (email) => {
  const [[userWithSameEmail]] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return userWithSameEmail;
};



const insertUser = async ({ name, email, hashedPassword }) => {
  const [{ insertId }] = await pool.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword]
  );
  return insertId;


};

export default register;