
gi

import pool from "../../db/pool.js";

const createReservation = async (reservationData, buyerId, productId) => {
  try {
    const { reservationLocation, reservationDate, status, review } = reservationData;

    // Consulta para insertar la reserva
    const insertQuery =
      "INSERT INTO reservation (reservationLocation, reservationDate, status, review, buyerId, productId) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await pool.query(insertQuery, [
      reservationLocation,
      reservationDate,
      status,
      review,
      buyerId,
      productId,
    ]);

    if (!result || !result.insertId) {
      throw new Error('Error al crear la reserva');
    }

    const reservationId = result.insertId;

    // Consulta para obtener el correo electrónico del vendedor
    const selectQuery = `
    SELECT p.sellerId, u.email, r.*
    FROM products p
    INNER JOIN users u ON p.sellerId = u.id
    INNER JOIN reservation r ON p.id = r.productId
    WHERE r.productId = ?`; // Modificar para usar r.productId en lugar de p.id

    const email = await pool.query(selectQuery, [productId]);
    console.log(productId);
    if (!email || !email.length) {
      throw new Error('Correo electrónico del vendedor no encontrado');
    }

    // Devuelve el correo electrónico del vendedor y el ID de la reserva
    return {
      reservationId,
      email: email[0].email,
    };

  } catch (error) {
    throw new Error(`Error al crear la reserva: ${error.message}`);
  }
};


export default createReservation;


