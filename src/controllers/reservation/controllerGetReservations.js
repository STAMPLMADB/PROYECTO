import pool from "../../db/pool.js";

const controllerGetReservations = async (req, res, next) => {
  try {
    const loggedUserId = req.user.id;
    const [userReservations] = await pool.query(
      `Select * from reservation WHERE buyerId = ?`,
      [loggedUserId]
    );
    res.json({ data: userReservations });
  } catch (error) {
    next(error);
  }
};

export default controllerGetReservations;
