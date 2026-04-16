import express from 'express';
import * as personController from '../controllers/personController.js';

const router = express.Router();

// Person routes
router.get('/', personController.getAllPersons);
router.get('/:id', personController.getPersonById);
router.post('/', personController.createPerson);
router.put('/:id', personController.updatePerson);
router.delete('/:id', personController.deletePerson);

export default router;
