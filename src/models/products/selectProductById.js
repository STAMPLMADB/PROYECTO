import pool from "../../db/pool.js";

//buscar producto por id
const selectProductById = async (id) => {
  const [[product]] = await pool.query("SELECT * FROM products WHERE id = ?;", [
    id,
  ]);
  const [seller] = await pool.query("SELECT * FROM users WHERE id = ?;", [product.sellerId]);
  //console.log(result);
  //const { id: productId, sellerId, ...productInfo } = result[0];
  //const seller = { id: sellerId, ...result[0] };

  return {
    product: product,
    seller:seller,
  };
};

export default selectProductById;
