            //const User = require('../models/UsuarioModel.js');
            import User from '../models/UserModel.js'
            import bcrypt from 'bcrypt';
            import dotenv from 'dotenv';
            import jsonwebtoken from 'jsonwebtoken';
            dotenv.config();
            const SECRET_KEY= process.env.SECRET_KEY;
            const newUser = async( request, response ) =>{
                const { nombre, email, password, /* foto */} = request.body;
                if(!nombre || !email || !password){
                    response.status(404).json({"msg" :" Rellene el campo nuevamente"})
                }
                //verificacion del email correctamente
                const user  = await User.findOne({email: email})

                if(user){
                    response.status(400).json({"msg" :"no se pudo, ya hay un email registrado"})
                    return
                }
                try{
                    const passwordHash =  await bcrypt.hash(password,5)
                    const usuario = new User({ nombre, email, password: passwordHash, /* foto */});
                    const data = await usuario.save();
                    response.status(201).json({ msg:"ok", data});
                    return data
                }catch{
                    response.status(400).json({"msg" :"no se pudo"})

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

            const auth = async (request, response) => {
                const {email, password} = request.body;
                const user = await User.findOne({email : email})
                if(!user){
                    response.status(404).json({"msg" :"Usuario invalido"})
                }
                const Valid = await bcrypt.compare( password, user.password )
                console.log(Valid)
                
                if(!Valid){
                    response.status(404).json({"msg" :"Contraseña invalida, intente nuevamente"})
                }
                
                const data = {
                    id: user._id,
                    email: user.email
                }
                console.log(data)
                const jwt = jsonwebtoken.sign(data, SECRET_KEY, {expiresIn : '1h'})
                response.status(200).json({"msg" :"nice", jwt : jwt})
            }    

            export { 
                newUser, listUsers, 
                getUserById, deleteUserById, updateUserById , auth
            };
            //module.exports = { newUser, listUsers }