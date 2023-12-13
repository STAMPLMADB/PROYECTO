import pool from "../../db/pool.js";

const modifyUser = async (req) => {
        const {email, name, password} = req.body;
        const [[userModify]] = await pool.query(`UPDATE users SET email = ?, name = ?, password = ? WHERE id = ?`,[email, name, password, req.user.id])
        return userModify;
}

export default modifyUser;