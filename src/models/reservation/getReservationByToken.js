import pool from "../../db/pool.js";

const getReservationByToken = async (reservationToken) => {
  const [[reservation]] = await pool.query(
    "SELECT * FROM reservation WHERE reservation_token = ?",
    [reservationToken]
  );
  return reservation;
};

export default getReservationByToken;
