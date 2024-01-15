import Joi from "joi";
import generateError from "../../utils/generateError.js";
import {
  getUserByVerificationCode,
  updateVerificationStatus,
} from "../../models/users/index.js";

const verify = async (req, res, next) => {
  try {
    const { verificationCode } = req.body;

    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      verificationCode: Joi.string().required(),
    });

    const validation = schema.validate(req.body);

    if (validation.error) {
      generateError(validation.error.message, 400);
    }

    const user = await getUserByVerificationCode(verificationCode);

    if (!user) {
      generateError("Código de verificación incorrecto.", 400);
    }

    const status = await updateVerificationStatus(email);

    res.status(200).send({
      message: "Verificación exitosa. Ahora puedes iniciar sesión.",
    });
  } catch (error) {
    next(error);
  }
};

export default verify;
