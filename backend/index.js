import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import APIrouter from "./routes/index.js";

dotenv.config();

//creamos la conexion con la base de datos
const urldb = process.env.URI_DB;
mongoose.connect(urldb);
const db = mongoose.connection;

db.on('error' , () => {
    console.error("Error de conexion con la base de datos");
});
db.once('open', () => {
    console.log("se ingreso correctamente a la base de datos");
});
const PORT = process.env.PORT;
const app = express();

// Configurar CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

app.use(express.json())
app.use('/', express.static('public'));
APIrouter(app);

app.listen(PORT, () => {
    console.log(`el server esta en el puerto ${PORT}`);
});