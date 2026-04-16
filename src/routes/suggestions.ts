import express from 'express';
import * as suggestionController from '../controllers/suggestionController.js';

const router = express.Router();

// Suggestion routes
router.get('/', suggestionController.getAllSuggestions);
router.get('/:id', suggestionController.getSuggestionById);
router.post('/', suggestionController.createSuggestion);
router.put('/:id', suggestionController.updateSuggestion);
router.delete('/:id', suggestionController.deleteSuggestion);

export default router;
