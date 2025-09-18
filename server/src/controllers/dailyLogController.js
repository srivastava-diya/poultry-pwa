import { PoultryDailyLog } from "../models/PoultryDailyLog.js";
import { PigDailyLog } from "../models/PigDailyLog.js";
import { CattleDailyLog } from "../models/CattleDailyLog.js";

// Create a log (dynamic by animal type)
export const createDailyLog = async (req, res) => {
  try {
    const { animalType } = req.params;
    let LogModel;

    if (animalType === "poultry") LogModel = PoultryDailyLog;
    else if (animalType === "pig") LogModel = PigDailyLog;
    else if (animalType === "cattle") LogModel = CattleDailyLog;
    else return res.status(400).json({ message: "Invalid animal type" });

    const log = new LogModel({ ...req.body, loggedBy: req.user._id });
    await log.save();

    res.status(201).json(log);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get logs by group
export const getLogsByGroup = async (req, res) => {
  try {
    const { animalType, groupId } = req.params;
    let LogModel;

    if (animalType === "poultry") LogModel = PoultryDailyLog;
    else if (animalType === "pig") LogModel = PigDailyLog;
    else if (animalType === "cattle") LogModel = CattleDailyLog;

    const logs = await LogModel.find({ flockId: groupId, pigHerdId: groupId, cattleHerdId: groupId });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
