import pool from "../../db/pool.js";

const getAllProducts = async () => {
  const query = "SELECT * FROM products";
  const [rows] = await pool.query(query);
  console.log(rows);
  return rows;
};

export default getAllProducts;
