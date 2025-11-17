import express from 'express'
import {NewCharacter, CharacterList, FindCharacter, DeleteCharacter, UpdateCHaracterID, UpgradeCharacter} from '../controllers/PersonajeController.js'
const router = express.Router();

router.get('/', CharacterList)
router.post('/', NewCharacter)
router.patch('/:id/upgrade', UpgradeCharacter)
router.get('/:id', FindCharacter)
router.delete('/:id', DeleteCharacter)
router.put('/:id', UpdateCHaracterID)

export default router
