import { HealthReport } from "../models/HealthReport.js";

// Create report (supervisor)
export const createHealthReport = async (req, res) => {
  try {
    const report = new HealthReport({
      ...req.body,
      reportedBy: req.user._id
    });
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get reports for a group
export const getReportsByGroup = async (req, res) => {
  try {
    const reports = await HealthReport.find({ groupId: req.params.groupId });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update by vet
export const updateHealthReport = async (req, res) => {
  try {
    const report = await HealthReport.findByIdAndUpdate(req.params.reportId, req.body, { new: true });
    res.json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
