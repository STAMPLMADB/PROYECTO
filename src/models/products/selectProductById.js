import pool from "../../db/pool.js";

const selectProductById = async (productId) => {
  const [[product]] = await pool.query("SELECT * FROM products WHERE id = ?;", [
    productId,
  ]);

  return product;
};

export default selectProductById;
