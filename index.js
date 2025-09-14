import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
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

// Middleware para parsear JSON con límite de tamaño
app.use(express.json({ limit: '10mb' }));

// Middleware para manejar errores de JSON parsing
app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return res.status(400).json({ 
            error: 'JSON inválido', 
            message: 'El cuerpo de la petición no contiene JSON válido' 
        });
    }
    next(error);
});

app.use('/', express.static('public'));
APIrouter(app);

app.listen(PORT, () => {
    console.log(`el server estan en el puerto ${PORT}`);
});