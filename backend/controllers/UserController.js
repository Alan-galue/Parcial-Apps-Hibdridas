            //const User = require('../models/UsuarioModel.js');
            import User from '../models/UserModel.js'
            import bcrypt from 'bcrypt';
            import dotenv from 'dotenv';
            import jsonwebtoken from 'jsonwebtoken';
            dotenv.config();
            const SECRET_KEY= process.env.SECRET_KEY;
            const newUser = async( request, response ) =>{
                try {
                    const { nombre, email, password } = request.body;
                    if(!nombre || !email || !password){
                        return response.status(400).json({"msg" :"Todos los campos son requeridos"})
                    }
                    //verificacion del email correctamente
                    const user  = await User.findOne({email: email})

                    if(user){
                        return response.status(400).json({"msg" :"Ya existe un usuario con este email"})
                    }
                    
                    const passwordHash = await bcrypt.hash(password, 10)
                    const usuario = new User({ nombre, email, password: passwordHash});
                    const data = await usuario.save();
                    
                    // No enviar la contraseña en la respuesta
                    const userResponse = {
                        id: data._id,
                        nombre: data.nombre,
                        email: data.email
                    };
                    
                    response.status(201).json({ msg:"Usuario creado exitosamente", data: userResponse});
                } catch(error) {
                    console.error("Error al crear usuario:", error);
                    response.status(400).json({"msg" :"Error al crear el usuario"})
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
                try {
                    const {email, password} = request.body;
                    
                    if(!email || !password){
                        return response.status(400).json({"msg" :"Email y contraseña son requeridos"})
                    }
                    
                    // Verificar que SECRET_KEY esté definido
                    if(!SECRET_KEY){
                        console.error("SECRET_KEY no está definido en las variables de entorno");
                        return response.status(500).json({"msg" :"Error de configuración del servidor"})
                    }
                    
                    const user = await User.findOne({email : email})
                    if(!user){
                        return response.status(401).json({"msg" :"Credenciales inválidas"})
                    }
                    
                    // Verificar que el usuario tenga contraseña
                    if(!user.password){
                        console.error("Usuario sin contraseña en la base de datos");
                        return response.status(500).json({"msg" :"Error en la base de datos"})
                    }
                    
                    const Valid = await bcrypt.compare( password, user.password )
                    
                    if(!Valid){
                        return response.status(401).json({"msg" :"Credenciales inválidas"})
                    }
                    
                    const data = {
                        id: user._id,
                        email: user.email
                    }
                    
                    const jwt = jsonwebtoken.sign(data, SECRET_KEY, {expiresIn : '1h'})
                    response.status(200).json({
                        "msg" :"Autenticación exitosa", 
                        jwt: jwt,
                        user: {
                            id: user._id,
                            nombre: user.nombre,
                            email: user.email
                        }
                    })
                } catch(error) {
                    console.error("Error en autenticación:", error);
                    console.error("Stack trace:", error.stack);
                    response.status(500).json({"msg" :"Error en el servidor", "error": error.message})
                }
            }    

            export { 
                newUser, listUsers, 
                getUserById, deleteUserById, updateUserById , auth
            };
            //module.exports = { newUser, listUsers }