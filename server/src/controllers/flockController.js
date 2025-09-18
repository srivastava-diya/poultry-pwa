import { Flock } from '../models/Flock.js';

export const createFlock = async (req, res) => {
    try {
        const flock = new Flock(req.body);
        await flock.save();
        res.status(201).json(flock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getFlocksByFarm = async (req, res) => {
    try {
        const flocks = await Flock.find({ farmId: req.params.farmId });
        res.status(200).json(flocks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getFlockById = async (req, res) => {
    try {
        const flock = await Flock.findById(req.params.id);
        if (!flock) return res.status(404).json({ message: 'Flock not found' });
        res.status(200).json(flock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
