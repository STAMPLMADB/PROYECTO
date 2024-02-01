import pool from "../../db/pool.js";

const getStatusByProductId = async (id) =>{
    const [[status]] = await pool.query(
       " SELECT status FROM reservation WHERE productId = ? " ,
       [id]
    );
    return status
}

export default getStatusByProductId;