import { loginAdmin } from '../services/authService.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await loginAdmin(email, password);
    res.json({
      success: true,
      message: 'Login successful',
      user: userData
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message || 'Authentication failed'
    });
  }
};

export const getMe = async (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
};
