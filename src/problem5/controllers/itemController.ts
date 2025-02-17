import { Request, Response } from "express";
import Item from "models/item";

// Get all items
const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await Item.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
};

// Get a specific item by ID
const getItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      res.status(404).json({ message: "Item not found!" });
      return;
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
};

// Create a new item
const createItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, quantity } = req.body;
    const newItem = Item.create({
      name,
      description,
      quantity,
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Error creating item", error });
  }
};

// Update an item
const updateItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      const { name, description, quantity } = req.body;
      const updatedItem = await item.update({
        name,
        description,
        quantity,
      });
      res.status(200).json(updatedItem);
      return;
    }
    res.status(404).json({ message: "Item not found!" });
  } catch (error) {
    res.status(500).json({ message: "Error editing item", error });
  }
};

// Delete an item
const deleteItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      await item.destroy();
      res.status(200).json({ message: 'Item deleted successfully' });
      return;
    }
    res.status(404).json({ message: "Item not found!" });
  } catch (error) {
    res.status(500).json({ message: "Error editing item", error });
  }
};

export default {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
