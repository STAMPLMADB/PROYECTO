import pool from "../../db/pool.js";

const deleteProduct = async (productData) => {
  try {
    const { id } = productData;

    const query =
      "DELETE FROM products WHERE id = ?";
    const [result] = await pool.query(query, [
      id
    ]);

    return result.insertId;
  } catch (error) {
    throw new Error(`Error al eliminar el producto: ${error.message}`);
  }
};

export default deleteProduct;