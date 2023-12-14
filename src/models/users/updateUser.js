import pool from "../../db/pool.js";
import bcrypt from "bcrypt";

const updateUser = async ({ id, name, password, biography, avatarURL }) => {
  const queryParams = [];
  let query = 'UPDATE users SET';

  if (name) {
    query += ' name = ?,';
    queryParams.push(name);
  }

  if (password ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    query += ' password = ?,';
    queryParams.push(hashedPassword);
  }

  if (biography ) {
    query += ' biography = ?,';
    queryParams.push(biography);
  }

  if (avatarURL) {
    query += ' avatarURL = ?,';
    queryParams.push(avatarURL);
  }

  // Eliminar la última coma si existe
  query = query.endsWith(',') ? query.slice(0, -1) : query;

  query += ' WHERE id = ?';
  queryParams.push(id);

  try {
    const result = await pool.query(query, queryParams);
    return result.affectedRows > 0; // Devuelve true si se actualizaron filas propiedad nodde mysql
  } catch (error) {
    throw new Error(`Error al actualizar usuario: ${error.message}`);
  }
};

export default updateUser;
