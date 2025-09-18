import { Alert } from "../models/Alert.js";

// Create a new alert (Vet only)
export const createAlert = async (req, res) => {
  try {
    const alert = new Alert({
      ...req.body,
      issuedByVet: req.user._id // comes from auth middleware
    });
    await alert.save();
    res.status(201).json(alert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all alerts by zipCode
export const getAlertsByZip = async (req, res) => {
  try {
    const alerts = await Alert.find({ zipCode: req.params.zipCode });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
