import { Request, Response } from 'express';
import { FamilyTree } from '../models/FamilyTree.js';

// Get all family trees
export const getAllFamilyTrees = async (req: Request, res: Response) => {
  try {
    const trees = await FamilyTree.find()
      .populate('rootPersonId')
      .populate('members');
    res.json(trees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching family trees', error });
  }
};

// Get family tree by ID
export const getFamilyTreeById = async (req: Request, res: Response) => {
  try {
    const tree = await FamilyTree.findById(req.params.id)
      .populate('rootPersonId')
      .populate('members');
    if (!tree) {
      res.status(404).json({ message: 'Family tree not found' });
      return;
    }
    res.json(tree);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching family tree', error });
  }
};

// Create new family tree
export const createFamilyTree = async (req: Request, res: Response) => {
  try {
    const tree = new FamilyTree(req.body);
    const savedTree = await tree.save();
    await savedTree.populate('rootPersonId');
    await savedTree.populate('members');
    res.status(201).json(savedTree);
  } catch (error) {
    res.status(400).json({ message: 'Error creating family tree', error });
  }
};

// Update family tree
export const updateFamilyTree = async (req: Request, res: Response) => {
  try {
    const tree = await FamilyTree.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('rootPersonId')
      .populate('members');
    if (!tree) {
      res.status(404).json({ message: 'Family tree not found' });
      return;
    }
    res.json(tree);
  } catch (error) {
    res.status(400).json({ message: 'Error updating family tree', error });
  }
};

// Delete family tree
export const deleteFamilyTree = async (req: Request, res: Response) => {
  try {
    const tree = await FamilyTree.findByIdAndDelete(req.params.id);
    if (!tree) {
      res.status(404).json({ message: 'Family tree not found' });
      return;
    }
    res.json({ message: 'Family tree deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting family tree', error });
  }
};
