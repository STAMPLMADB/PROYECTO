import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../../db/pool.js";

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const selectUserByEmail = async (email) => {
      const [[userWithSameEmail]] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      return userWithSameEmail;
    };

    if (selectUserByEmail) {
      console.error("Ya existe un usuario con este email", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUser = async ({ name, email, hashedPassword }) => {
      
      const [{ insertId }] = await pool.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
      );
      return insertId;
    };

    res.status(201).send({
      message: "Registro completado con éxito",
      data: { id: insertUser, nombre: name, email, hashedPassword },
    });
  } catch (error) {
    next(error);
  }
};

export default register;
