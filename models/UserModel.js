import mongoose  from 'mongoose';
//const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Creamos el Esquema
const esquema = new Schema({
    nombre: String,
    email: String,
    password: String,
    foto: String
});
//   
const User = mongoose.model('User', esquema);

// module.exports = User;
export default User;