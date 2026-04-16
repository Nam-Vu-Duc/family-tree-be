import express from 'express';
import * as familyTreeController from '../controllers/familyTreeController.js';

const router = express.Router();

// Family Tree routes
router.get('/', familyTreeController.getAllFamilyTrees);
router.get('/:id', familyTreeController.getFamilyTreeById);
router.post('/', familyTreeController.createFamilyTree);
router.put('/:id', familyTreeController.updateFamilyTree);
router.delete('/:id', familyTreeController.deleteFamilyTree);

export default router;
