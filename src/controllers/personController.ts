import { Request, Response } from 'express';
import { Person } from '../models/Person.js';
import { FamilyTree } from '../models/FamilyTree.js';

// Get all persons
export const getAllPersons = async (req: Request, res: Response) => {
  try {
    const persons = await Person.find()
      .populate('parentId')
      .populate('spouseIds')
      .populate('childrenIds')
      .populate('siblings');
    res.json({ data: persons });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching persons', error });
  }
};

// Get person by ID
export const getPersonById = async (req: Request, res: Response) => {
  try {
    const person = await Person.findById(req.params.id)
      .populate('parentId')
      .populate('spouseIds')
      .populate('childrenIds')
      .populate('siblings');
    if (!person) {
      res.status(404).json({ message: 'Person not found' });
      return;
    }
    res.json({ data: person });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching person', error });
  }
};

// Create new person
export const createPerson = async (req: Request, res: Response) => {
  try {
    const person = new Person(req.body);
    const savedPerson = await person.save();
    res.status(201).json({ data: savedPerson });
  } catch (error) {
    res.status(400).json({ message: 'Error creating person', error });
  }
};

// Update person
export const updatePerson = async (req: Request, res: Response) => {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('parentId')
      .populate('spouseIds')
      .populate('childrenIds')
      .populate('siblings');
    if (!person) {
      res.status(404).json({ message: 'Person not found' });
      return;
    }
    res.json({ data: person });
  } catch (error) {
    res.status(400).json({ message: 'Error updating person', error });
  }
};

// Delete person
export const deletePerson = async (req: Request, res: Response) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) {
      res.status(404).json({ message: 'Person not found' });
      return;
    }
    res.json({ message: 'Person deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting person', error });
  }
};
