import pool from '../../db/pool.js';

const getProductsByUserId = async (userId) => {
    try {
      const query = 'SELECT * FROM products WHERE sellerId = ?';
      const [rows] = await pool.query(query, [userId]);
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener los productos del usuario: ${error.message}`);
    }
  }

  export default getProductsByUserId;