import pool from "../../db/pool.js";

const createProductId = async (productData, sellerId) => {
  try {
    const { name, category, price, location, imageURL, description } =
      productData;

    const query =
      "INSERT INTO products (name, category, price, location, imageURL, description, sellerId) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const [result] = await pool.query(query, [
      name,
      category,
      price,
      location,
      imageURL,
      description,
      sellerId,
    ]);

    return result.insertId;
  } catch (error) {
    throw new Error(`Error al crear el producto: ${error.message}`);
  }
};

export default createProductId;
