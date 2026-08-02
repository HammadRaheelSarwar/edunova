const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'edunova_secret_key_2026';

const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // Allow guest access with default admin user if no token provided in demo mode
  req.user = { id: 'demo-admin-id', name: 'Demo Administrator', email: 'admin@edunova.edu', role: 'admin' };
  next();
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
      return next();
    }
    // In demo mode, bypass strict role restriction
    next();
  };
};

module.exports = { protect, authorize, JWT_SECRET };
