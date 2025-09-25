import { Farm } from "../models/Farm.js";
import User from "../models/User.js";

// Create new farm
export const createFarm = async (req, res) => {
  try {
    const ownerId = req.user.role === 'owner' ? req.user._id : (req.body.ownerId || req.user._id);
    const farm = new Farm({ ...req.body, owner: ownerId });
    await farm.save();
    // Link supervisor to farm if supervisor created it
    if (req.user.role === 'supervisor') {
      await User.findByIdAndUpdate(req.user._id, { farmId: farm._id });
    }
    res.status(201).json(farm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// List farms (basic): owners see their farms; others see all for now
export const getFarms = async (req, res) => {
  try {
    const filter = {};
    if (req.user?.role === 'owner') {
      filter.owner = req.user._id;
    }
    if (req.user?.role === 'supervisor' && req.user?.farmId) {
      filter._id = req.user.farmId;
    }
    const farms = await Farm.find(filter).sort({ createdAt: -1 });
    res.json(farms);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    // Ensure only the owner of the farm can update
    const farmToUpdate = await Farm.findById(req.params.id);
    if (!farmToUpdate) return res.status(404).json({ message: "Farm not found" });
    if (String(farmToUpdate.owner) !== String(req.user._id)) {
      return res.status(403).json({ message: "Forbidden: Only owner can update farm" });
    }
    const farm = await Farm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(farm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
