import pool from "../../db/pool.js";

const selectProductById = async (id) => {
  const [[product]] = await pool.query("SELECT * FROM products WHERE id = ?;", [
    id,
  ]);

  return product;
};

export default selectProductById;
