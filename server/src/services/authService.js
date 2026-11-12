import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { isConnectedToMongo, localStore, saveLocalStore } from '../config/db.js';

export const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'super_secret_playground_jwt_key_2026_priya',
    { expiresIn: '30d' }
  );
};

export const loginAdmin = async (email, password) => {
  if (isConnectedToMongo) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }
    const token = generateToken(user._id, user.role);
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    };
  } else {
    // Local fallback store
    const user = localStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }
    const token = generateToken(user._id, user.role);
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    };
  }
};
