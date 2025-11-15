import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const validation = (request, response, next) => {
    try {
        const authHeader = request.headers.authorization;
        
        if (!authHeader) {
            return response.status(401).json({"msg": "Token de autorización requerido"});
        }

        // El token puede venir como "Bearer <token>" o solo el token
        const token = authHeader.startsWith('Bearer ') 
            ? authHeader.substring(7) 
            : authHeader;

        if (!token) {
            return response.status(401).json({"msg": "Token de autorización inválido"});
        }

        // Verificar y decodificar el token
        const decoded = jsonwebtoken.verify(token, SECRET_KEY);
        
        // Agregar información del usuario al request para uso posterior
        request.user = decoded;
        
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return response.status(401).json({"msg": "Token inválido"});
        }
        if (error.name === 'TokenExpiredError') {
            return response.status(401).json({"msg": "Token expirado"});
        }
        return response.status(401).json({"msg": "Error en la autenticación"});
    }
}

export {
    validation
}