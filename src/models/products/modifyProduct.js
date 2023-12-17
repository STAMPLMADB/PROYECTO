import pool from "../../db/pool.js";

const modifyProduct = async (productData, sellerId) => {
  try {
    const { id, name, category, price, location, description } = productData;

    const query =
      "UPDATE products SET(name, category, price, location, imageURL, description) VALUES (?, ?, ?, ?, ?, ?) WHERE id = ?";
    const [result] = await pool.query(query, [
      name,
      category,
      price,
      location,
      imageURL,
      description,
      sellerId
    ]);

    return result.insertId;
  } catch (error) {
    throw new Error(`Error al modificar el producto: ${error.message}`);
  }
};

export default modifyProduct;
