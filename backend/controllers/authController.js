const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');

const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  
  // Mock login response for development & testing
  const user = {
    id: 'usr-101',
    name: email.split('@')[0].toUpperCase() || 'Admin User',
    email: email || 'admin@edunova.edu',
    role: role || 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
  };

  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });

  return res.json({
    message: 'Login successful',
    token,
    user
  });
};

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const newUser = {
    id: 'usr-' + Date.now(),
    name,
    email,
    role: role || 'student',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
  };

  const token = jwt.sign(newUser, JWT_SECRET, { expiresIn: '7d' });

  return res.status(201).json({
    message: 'User registered successfully',
    token,
    user: newUser
  });
};

const getMe = async (req, res) => {
  res.json({ user: req.user });
};

module.exports = { loginUser, registerUser, getMe };
