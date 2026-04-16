import { Request, Response } from 'express';
import { Suggestion } from '../models/Suggestion.js';

// Get all suggestions
export const getAllSuggestions = async (req: Request, res: Response) => {
  try {
    const suggestions = await Suggestion.find().sort({ createdAt: -1 });
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching suggestions', error });
  }
};

// Get suggestion by ID
export const getSuggestionById = async (req: Request, res: Response) => {
  try {
    const suggestion = await Suggestion.findById(req.params.id);
    if (!suggestion) {
      res.status(404).json({ message: 'Suggestion not found' });
      return;
    }
    res.json(suggestion);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching suggestion', error });
  }
};

// Create new suggestion
export const createSuggestion = async (req: Request, res: Response) => {
  try {
    const suggestion = new Suggestion(req.body);
    const savedSuggestion = await suggestion.save();
    res.status(201).json(savedSuggestion);
  } catch (error) {
    res.status(400).json({ message: 'Error creating suggestion', error });
  }
};

// Update suggestion
export const updateSuggestion = async (req: Request, res: Response) => {
  try {
    const suggestion = await Suggestion.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!suggestion) {
      res.status(404).json({ message: 'Suggestion not found' });
      return;
    }
    res.json(suggestion);
  } catch (error) {
    res.status(400).json({ message: 'Error updating suggestion', error });
  }
};

// Delete suggestion
export const deleteSuggestion = async (req: Request, res: Response) => {
  try {
    const suggestion = await Suggestion.findByIdAndDelete(req.params.id);
    if (!suggestion) {
      res.status(404).json({ message: 'Suggestion not found' });
      return;
    }
    res.json({ message: 'Suggestion deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting suggestion', error });
  }
};
