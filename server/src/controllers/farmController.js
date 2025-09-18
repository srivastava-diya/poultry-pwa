import { Farm } from "../models/Farm.js";

// Create new farm
export const createFarm = async (req, res) => {
  try {
    const farm = new Farm({ ...req.body, owner: req.user._id });
    await farm.save();
    res.status(201).json(farm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get farm by ID
export const getFarmById = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id).populate("owner");
    if (!farm) return res.status(404).json({ message: "Farm not found" });
    res.json(farm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update farm
export const updateFarm = async (req, res) => {
  try {
    const farm = await Farm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(farm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
