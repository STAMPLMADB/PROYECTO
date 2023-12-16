import pool from "../../db/pool.js";

const createReservation = async (reservationData, buyerId, productId) => {
  try {
    const { reservationLocation, reservationDate, status, review } =
      reservationData;

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
      throw new Error("Error al crear la reserva");
    }

    const reservationId = result.insertId;

    // Consulta para obtener el correo electrónico del vendedor
    const selectQuery = `
    SELECT u.email 
    FROM users u
    INNER JOIN products p ON p.sellerId = u.id
    WHERE p.id = ?`;

    const emailResult = await pool.query(selectQuery, [productId]);

    if (!emailResult || !emailResult.length) {
      throw new Error("Correo electrónico del vendedor no encontrado");
    }

    // Seleccionar el correo electrónico del vendedor
    const patata = emailResult[0];
    const email = patata[0].email;
    
    console.log(email);
    // Devolver el ID de la reserva y el correo electrónico del vendedor
    return {
      reservationId,
      email,
    };
  } catch (error) {
    throw new Error(`Error al crear la reserva: ${error.message}`);
  }
};

export default createReservation;
