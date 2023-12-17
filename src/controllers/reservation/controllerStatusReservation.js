import pool from "../../db/pool.js";
const controllerStatusReservation = async (req, res, next) => {
  try {
    const { reservationToken } = req.body;
    const reservation = await getReservationByToken(reservationToken);

    if (reservation && reservation.reservation_token === reservationToken) {
      await updateReservationStatus(reservationToken);

      res.status(200).send({
        message: "Se ha cambiado el status a en proceso correctamente",
      });
    } else {
      res.status(400).send({
        message: "Ha ocurrido un error",
      });
    }
  } catch (error) {
    next(error);
  }
};

const getReservationByToken = async (reservationToken) => {
  const [[reservation]] = await pool.query(
    "SELECT * FROM reservation WHERE reservation_token = ?",
    [reservationToken]
  );
  return reservation;
};

const updateReservationStatus = async (reservationToken) => {
  await pool.query(
    "UPDATE reservation SET status = 'en proceso' WHERE reservation_token = ? ",
    [reservationToken]
  );
};

export default controllerStatusReservation;
