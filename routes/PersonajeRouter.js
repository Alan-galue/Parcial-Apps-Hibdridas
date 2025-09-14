import express from 'express'
import {NewCharacter, CharacterList, FindCharacterID, DeleteCharacter, UpdateCHaracterID} from '../controllers/PersonajeController.js'
const router = express.Router();

router.get('/', CharacterList)
router.get('/:id', FindCharacterID)
router.delete('/:id', DeleteCharacter)
router.post('/', NewCharacter)
router.put('/:id', UpdateCHaracterID)

export default router
