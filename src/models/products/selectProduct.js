import pool from '../../db/pool.js';

const Product = {
    // todos los productos luego se filtrna en el front !!!
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


  createProduct: async (productData, sellerId) => {
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
  },
};

export default Product;
