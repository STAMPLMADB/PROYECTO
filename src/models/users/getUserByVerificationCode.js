import pool from "../../db/pool.js";

const getUserByVerificationCode = async (email, verificationCode) => {
  const [[user]] = await pool.query(
    "SELECT * FROM users WHERE email = ? AND verification_code = ?",
    [email, verificationCode]
  );
  return user;
};

export default getUserByVerificationCode;
