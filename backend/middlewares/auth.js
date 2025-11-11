import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv'
import { response } from 'express';
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const validation = (request, reponse, next) => {
const token = request.headers.authorization;
if(!token){
    response.status(401).json({"msg" :"falta el otro token "})
}
console.log(token)
next();
}

export {
    validation
}