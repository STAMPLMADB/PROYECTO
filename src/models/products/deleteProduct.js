import pool from "../../db/pool.js";

const deleteProduct = async (id) => {
  try {
    const query = "DELETE FROM products WHERE id = ?";
    const [result] = await pool.query(query, [id]);

    return result;
  } catch (error) {
    throw new Error(`Error al eliminar el producto: ${error.message}`);
  }
};

export default deleteProduct;
