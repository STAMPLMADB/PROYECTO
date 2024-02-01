import {getStatusByProductId} from "../../models/reservation/index.js"
const controllerGetOnlyReservation = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const {status} = await getStatusByProductId(productId);
     
        res.status(200).json({status} );
    } catch (error) {
        next(error); 
    }
};

export default controllerGetOnlyReservation;