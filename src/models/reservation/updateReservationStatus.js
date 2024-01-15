import pool from "../../db/pool.js";

const updateReservationStatus = async (reservationToken) => {
  await pool.query(
    "UPDATE reservation SET status = 'en proceso' WHERE reservation.id = ? ",
    [reservationToken]
  );
};

export default updateReservationStatus;
