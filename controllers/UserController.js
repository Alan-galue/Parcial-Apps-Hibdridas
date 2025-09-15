    //const User = require('../models/UsuarioModel.js');
    import User from '../models/UserModel.js'

    const newUser = async( request, response ) =>{
        const { nombre, email, password, foto} = request.body;
        const usuario = new User({ nombre, email, password, foto});
        if(nombre){
            const data = await usuario.save();
        response.status(201).json({ msg:"ok", data});
        }else{
            response.status(404).json({"msg" :" Rellene el campo nuevamente"})
        }
    }

    const listUsers = async (request, response) =>{
        const usuarios = await User.find();
        response.json(usuarios);
    }

    const getUserById = async (request, response) => {
        const id = request.params.id;
        const user = await User.findById(id);
        if( user){
            response.status(200).json({data: user});
        } else {
            response.status(404).json({msg: 'Usuario no encontrado'});
        }
    }

    const deleteUserById = async( request, response) =>{
        const id = request.params.id;
        const user = await User.findByIdAndDelete(id);
        if ( user ){
            response.status(200).json({msg:'Usuario Eliminado'});
        } else {
            response.status(404).json({msg: 'Usuario no encontrado'});
        }
    }

    const updateUserById = async( request, response) =>{
        const id = request.params.id;
        const body = request.body;

        const user = await User.findByIdAndUpdate(id, body);
        if ( user ){
            response.status(200).json({msg:'Usuario Actualizado'});
        } else {
            response.status(404).json({msg: 'Usuario no encontrado'});
        }
    }

    export { 
        newUser, listUsers, 
        getUserById, deleteUserById, updateUserById 
    };
    //module.exports = { newUser, listUsers }