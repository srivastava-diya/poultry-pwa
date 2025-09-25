import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import USER from '../models/User.js';


export const registerUser = async (req, res) => {
  try {
    const { name, email, passwordHash:password, role, farmId } = req.body;

   
    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new USER({ name, email, passwordHash:password, role, farmId });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login and issue JWT
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await USER.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    //JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get current logged-in user profile
export const getMe = async (req, res) => {
  try {
    const user = await USER.findById(req.user._id).select('-passwordHash');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update current user (e.g., set farmId)
export const updateMe = async (req, res) => {
  try {
    const allowed = {};
    if (typeof req.body.farmId !== 'undefined') allowed.farmId = req.body.farmId;

    const user = await USER.findByIdAndUpdate(req.user._id, allowed, { new: true }).select('-passwordHash');
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};