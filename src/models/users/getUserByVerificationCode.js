import pool from "../../db/pool.js";

const getUserByVerificationCode = async (verificationCode) => {
  const [[user]] = await pool.query(
    "SELECT * FROM users WHERE email = ? AND verification_code = ?",
    [verificationCode]
  );
  return user;
};

export default getUserByVerificationCode;
