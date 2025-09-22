import mongoose  from 'mongoose';
//const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Creamos el Esquema
const esquema = new Schema({

        nombre: {
            type: String,
            required: [true, 'nombre requerido '],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'email requerido'],
            trim: true
        },
        password: {
            type: String,
            required: [true, 'contraseña invalida'],
            trim: true
        },
    });
//   
const User = mongoose.model('User', esquema);

// module.exports = User;
export default User;