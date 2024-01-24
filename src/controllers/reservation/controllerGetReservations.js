import pool from "../../db/pool.js";

const controllerGetReservations = async (req, res, next) => {
  try {
    const loggedUserId = req.user.id;
    const [userReservations] = await pool.query(
      `Select p.*, r.*,u.name buyerName, u.email, u.avatarURL  from reservation r JOIN products p ON r.productId = p.id JOIN users u ON r.buyerId = u.id  WHERE buyerId = ?`,
      [loggedUserId]
    );
    res.json({ data: userReservations });
  } catch (error) {
    next(error);
  }
};

export default controllerGetReservations;
