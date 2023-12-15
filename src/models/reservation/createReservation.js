import pool from "../../db/pool.js";


const createReservation = async (reservationData, buyerId) => {
  try {
    const { reservationLocation, reservationDate, status, review, productId } = reservationData;

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

    // Consulta con JOIN para obtener sellerId y el correo electrónico del vendedor
    const selectQuery = `
      SELECT r.*, p.sellerId, u.email
      FROM reservation r
      INNER JOIN products p ON r.productId = p.id
      INNER JOIN users u ON p.sellerId = u.id
      WHERE r.id = ?
    `;
    const [reservationInfo] = await pool.query(selectQuery, [reservationId]);

    if (!reservationInfo || !reservationInfo.length) {
      throw new Error('Información de reserva no encontrada');
    }



    return reservationId;
  } catch (error) {
    throw new Error(`Error al crear la reserva: ${error.message}`);
  }
};

export default createReservation;