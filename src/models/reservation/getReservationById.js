import pool from "../../db/pool.js";

const getReservationById = async (reservationId) => {
  const [[id]] = await pool.query(
    "SELECT * FROM reservation WHERE id = ?",
    [reservationId]
  );
  return id
};

export default getReservationById;
// cambie id por reservation al reves