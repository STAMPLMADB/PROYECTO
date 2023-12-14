import bcrypt from "bcrypt";
import updateUser from "../../models/users/updateUser.js";

const updateUserController = async (req, res, next) => {
  try {
    const { id } = req.user; // Obtiene el ID del usuario del token
    const { name, password, biography } = req.body;
    //const { avatarURL } = req.files;

    const userDataToUpdate = {};

    if (name) {
      userDataToUpdate.name = name;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      userDataToUpdate.password = hashedPassword;
    }

    if (biography) {
      userDataToUpdate.biography = biography;
    }
    
    const file = req.files.avatar;
    //const timestamp = Date.now();
    //const date = new Date(timestamp);
    //const date = new Date(timestamp);
    const finalFileName = Date.now() + "-" + file.name;
    file.mv(`./uploads/${finalFileName}`);
    // res.status(200).json({
    //   nombre: file.name,
    //   tamaño: file.size,
    //   tipo: file.mimetype,
    // });

    
    if (req.files) {
      userDataToUpdate.avatarURL = finalFileName;
    }

    


    await updateUser({ id, ...userDataToUpdate });

    if (updateUser) {
      return res.status(200).json({
        message: "Datos de usuario actualizados correctamente",
        data: { id, ...userDataToUpdate },
      });
    } else {
      return res
        .status(500)
        .json({ message: "Error al actualizar los datos del usuario" });
    }
  } catch (error) {
    next(error);
  }
};

export default updateUserController;
