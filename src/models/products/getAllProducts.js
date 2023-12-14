import pool from '../../db/pool.js';

const getAllProducts = async () => {
  try {
    const query = "SELECT * FROM products";
    const [rows] = await pool.query(query);
    console.log(rows);
    return rows;
  } catch (error) {
    throw new Error(`Error al obtener los productos: ${error.message}`);
  }
};

export default getAllProducts;
