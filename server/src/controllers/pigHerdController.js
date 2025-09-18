import { PigHerd } from "../models/PigHerd.js";

// Create Pig Herd
export const createPigHerd = async (req, res) => {
  try {
    const herd = new PigHerd(req.body);
    await herd.save();
    res.status(201).json(herd);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get pig herds by farm
export const getPigHerdsByFarm = async (req, res) => {
  try {
    const herds = await PigHerd.find({ farmId: req.params.farmId });
    res.json(herds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get pig herd by ID
export const getPigHerdById = async (req, res) => {
  try {
    const herd = await PigHerd.findById(req.params.id);
    if (!herd) return res.status(404).json({ message: "Pig Herd not found" });
    res.json(herd);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
