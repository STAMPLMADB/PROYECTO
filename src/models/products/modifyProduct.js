import pool from "../../db/pool.js";

const updateProduct = async ({
  id,
  name,
  category,
  price,
  location,
  imageURL,
  description,
}) => {
  const queryParams = [];
  let query = "UPDATE products SET";

  if (name) {
    query += " name = ?,";
    queryParams.push(name);
  }

  if (category) {
    query += " category = ?,";
    queryParams.push(category);
  }

  if (price) {
    query += " price = ?,";
    queryParams.push(price);
  }

  if (location) {
    query += " location = ?,";
    queryParams.push(location);
  }

  if (imageURL) {
    query += " imageURL = ?,";
    queryParams.push(imageURL);
  }

  if (description) {
    query += " description = ?,";
    queryParams.push(description);
  }

  // Eliminar la última coma si existe
  query = query.endsWith(",") ? query.slice(0, -1) : query;

  query += " WHERE id = ?";
  queryParams.push(id);

  try {
    const result = await pool.query(query, queryParams);
    return result.affectedRows > 0; // Devuelve true si se actualizaron filas propiedad nodde mysql
  } catch (error) {
    throw new Error(`Error al actualizar usuario: ${error.message}`);
  }
};

export default updateProduct;
