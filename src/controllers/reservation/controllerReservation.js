//import Joi from "joi";
import { createReservation } from "../../models/reservation/index.js";
import { selectProductById} from "../../models/products/index.js"
import { reservationEmail } from "../../utils/index.js";

const controllerReservation = async (req, res, next) => {
  try {
    const productId = req.params.productId; // Obtener productId de los parámetros de la consulta

    const buyOrder = new Date();

    const buyerId = req.user.id;
 
    const {sellerId} = await selectProductById(productId)
        if(sellerId=== buyerId){
         res.status(201).json({
        message:"El articulo que intentas comprar es tuyo"}
    )
}else{
    const { reservationId, email ,buyerEmail} = await createReservation(
      {
        buyOrder,
      },
      buyerId,
      productId, // Pasar productId como parámetro
      
    );

    await reservationEmail(email, reservationId,buyerEmail);
     console.log(email);
     console.log(reservationId);
     console.log(buyerEmail);
    res.status(201).json({
      id: reservationId,
     
      message: "Reserva creada exitosamente",
    })};
  } catch (error) {
    next(error);
  }
};

export default controllerReservation;
/*//import Joi from "joi";
import { createReservation } from "../../models/reservation/index.js";
import { v4 as uuidv4 } from "uuid";
import { reservationEmail } from "../../utils/index.js";

const controllerReservation = async (req, res, next) => {
  try {
    const productId = req.params.productId; // Obtener productId de los parámetros de la consulta

    const buyOrder = new Date();

    const buyerId = req.user.id;

    const reservationToken = uuidv4();
    const { reservationId, email } = await createReservation(
      {
        buyOrder,
      },
      buyerId,
      productId, // Pasar productId como parámetro
      reservationToken
    );

    await reservationEmail(email, reservationId,reservationToken);
     console.log(email);
    res.status(201).json({
      id: reservationId,
      reservationToken:reservationToken,
      email:email,
      message: "Reserva creada exitosamente",
    });
  } catch (error) {
    next(error);
  }
};

export default controllerReservation;*/ 