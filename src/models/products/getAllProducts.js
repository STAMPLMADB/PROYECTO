import pool from "../../db/pool.js";

const getAllProducts = async ({limit}) => {
  let query = "SELECT * FROM products";
  if (limit){
    query+=` LIMIT ${limit}`
  }
  const [rows] = await pool.query(query);
  console.log(rows);
  return rows;
};

export default getAllProducts;
