import express from 'express';
import { newUser, listUsers, getUserById, deleteUserById, updateUserById } from '../controllers/UserController.js';
const router = express.Router();
// Definimos las rutas de Usuario
router.get('/', listUsers);
router.get('/:id', getUserById);
router.post('/', newUser);
router.delete('/:id', deleteUserById );
router.put('/:id', updateUserById);

//module.exports = router;
export default router;