import pool from "../../db/pool.js";

const deleteProduct = async (id,sellerId) => {
  try {

    const query =
      "DELETE FROM products WHERE id = ?  and sellerId = ?";
    const [result] = await pool.query(query, [
      id,
      sellerId
    ]);
    
    if (result.affectedRows === 0) {
      throw new Error('No se pudo encontrar el producto o no tienes permisos para eliminarlo');
    }

    return result;

  } catch (error) {
    throw new Error(`Error al eliminar el producto: ${error.message}`);
  }

};

export default deleteProduct;