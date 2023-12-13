

import bcrypt from "bcrypt";
import updateUser from "../../models/users/update.js";

const updateUserController = async (req, res, next) => {
  try {
    const { id } = req.user; // Obtiene el ID del usuario del token
    const { name, password, biography, avatarURL } = req.body;

    const userDataToUpdate = {};

    if (name !== undefined && name !== null) {
      userDataToUpdate.name = name;
    }

    if (password !== undefined && password !== null) {
      const hashedPassword = await bcrypt.hash(password, 10);
      userDataToUpdate.password = hashedPassword;
    }

    if (biography !== undefined && biography !== null) {
      userDataToUpdate.biography = biography;
    }

    if (avatarURL !== undefined && avatarURL !== null) {
      userDataToUpdate.avatarURL = avatarURL;
    }

    await updateUser({ id, ...userDataToUpdate });
 
    if (updateUser) {
      return res.status(200).json({
        message: "Datos de usuario actualizados correctamente",
        data: { id, ...userDataToUpdate },
      });
    } else {
      return res.status(500).json({ message: "Error al actualizar los datos del usuario" });
    }
  } catch (error) {
    next(error);
  }
};

export default updateUserController;
