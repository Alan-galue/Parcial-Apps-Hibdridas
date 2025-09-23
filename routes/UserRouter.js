import express from 'express';
import { validation } from '../middlewares/auth.js';
import { newUser, listUsers, getUserById, deleteUserById, updateUserById, auth } from '../controllers/UserController.js';
const router = express.Router();
// Definimos las rutas de Usuario
router.get('/', validation, listUsers);
router.get('/:id', getUserById);
router.post('/', newUser);
router.delete('/:id', deleteUserById );
router.put('/:id', updateUserById);
router.post('/auth', auth);

//module.exports = router;
export default router;