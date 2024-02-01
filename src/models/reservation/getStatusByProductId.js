import pool from "../../db/pool.js";

const getStatusByProductId = async (productId) =>{
    const [[status]] = await pool.query(
       " SELECT status FROM reservation WHERE productId = ? " ,
       [productId]
    );
    return status
}

export default getStatusByProductId;