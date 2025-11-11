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
app.use(express.json())
app.use('/', express.static('public'));
APIrouter(app);

app.listen(PORT, () => {
    console.log(`el server estan en el puerto ${PORT}`);
});