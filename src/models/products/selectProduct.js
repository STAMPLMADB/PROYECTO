import pool from '../../db/pool.js';

const Product = {
    // todos los productos luego se filtrna en el front  ok !!!
  getAllProducts: async () => {
    try {
      const query = 'SELECT * FROM products';
      const [rows] = await pool.query(query);
      console.log(rows)
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener los productos: ${error.message}`);
    } 
  },
  // rows trawe todas las columnas  //
  getProductsByUserId: async (userId) => {
    try {
      const query = 'SELECT * FROM products WHERE sellerId = ?';
      const [rows] = await pool.query(query, [userId]);
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener los productos del usuario: ${error.message}`);
    }
  },
 
  // ok genera producto pero lo creamos forzando el id nosotros 
  createProduct: async (productData) => {
    try {
      const {
        name,
        category,
        price,
        location,
        imageURL,
        description,
        sellerId,
      } = productData;

      const query =
        'INSERT INTO products (name, category, price, location, imageURL, description, sellerId) VALUES (?, ?, ?, ?, ?, ?, ?)';
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
  },

 
// BUSCADOR CATEGORIAS  va ok 
searchProducts: async ({ name, category, sellerId,price,location}) => {
  const queryParams = [];
  let query = 'SELECT * FROM products WHERE 1 = 1'; // Usamos WHERE 1 = 1 para concatenar condiciones  1=1 siempre es true y pasamos a valorar lo sig : 
  // lo habia hecho distinto que el rollo and pero mejor asi xp no hay q
  // pensar donde pones el and .... 


  if (name) {
    query += ' AND name LIKE ?';
    queryParams.push(`%${name}%`);
  }

  if (category) {
    query += ' AND category LIKE ?';
    queryParams.push(`%${category}%`);
  }

  if (sellerId) {
    query += ' AND sellerId = ?';
    queryParams.push(sellerId);
  }
// un beetween de precios ....
  if (price) {
    query += ' AND price = ?';
    queryParams.push(price);
  }
  if (location) {
    query += ' AND location = ?';
    queryParams.push(location);
  }

 
  try {
    const [rows] = await pool.query(query, queryParams);
    return rows;
  } catch (error) {
    throw new Error(`Error al buscar productos: ${error.message}`);
  }
},

 // le pasamos id al model  no es lo correcto pero fnciona
 createProductId: async (productData, sellerId) => {
  try {
    const {
      name,
      category,
      price,
      location,
      imageURL,
      description,
    } = productData;

    const query =
      'INSERT INTO products (name, category, price, location, imageURL, description, sellerId) VALUES (?, ?, ?, ?, ?, ?, ?)';
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
}
};

export default Product;
