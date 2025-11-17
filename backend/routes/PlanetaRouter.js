import express from 'express';
import {ListPlanet, FindPlanet, DeletePlanet, UpdatePlanet, NewPlanet, UpgradePlanet} from '../controllers/planetaController.js';

const router = express.Router();
router.post('/', NewPlanet)
router.get('/', ListPlanet);
router.patch('/:id/upgrade', UpgradePlanet);
router.get('/:id', FindPlanet);
router.delete('/:id', DeletePlanet);
router.put('/:id', UpdatePlanet);

export default router;