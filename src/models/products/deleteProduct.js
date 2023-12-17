import pool from "../../db/pool.js";

const deleteProduct = async (productId, sellerId) => {
  try {
    const query =
      "DELETE FROM products WHERE id = ? AND sellerId = ?";
    const [result] = await pool.query(query, [
      productId,
      sellerId
    ]);

    if (productId != products.id){
        console.log("Producto Equivocado");
    };

    return result.insertId;
  } catch (error) {
    throw new Error(`Error al eliminar el producto: ${error.message}`);
  }
};

export default deleteProduct;