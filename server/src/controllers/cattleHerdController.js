import { CattleHerd } from "../models/CattleHerd.js";

// Create a new cattle herd
export const createCattleHerd = async (req, res) => {
  try {
    const herd = new CattleHerd(req.body);
    await herd.save();
    res.status(201).json(herd);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all cattle herds by farm
export const getCattleHerdsByFarm = async (req, res) => {
  try {
    const herds = await CattleHerd.find({ farmId: req.params.farmId });
    res.json(herds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get cattle herd by ID
export const getCattleHerdById = async (req, res) => {
  try {
    const herd = await CattleHerd.findById(req.params.id);
    if (!herd) return res.status(404).json({ message: "Cattle Herd not found" });
    res.json(herd);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update cattle herd
export const updateCattleHerd = async (req, res) => {
  try {
    const herd = await CattleHerd.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(herd);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
