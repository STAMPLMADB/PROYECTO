import {modifyUser} from "../../models/users/index.js";

const updateUser = async (req,res,next)=>{

try {
    const {email, name, password} = req.body
    const mdfUser = await modifyUser(email, name, password);
    // if (mdfUser.email === "") {
        
    // } 
    res.status(200).send("Cambios guardados correctamente");
} catch (error) {
    next(error)
}
}

export {updateUser};