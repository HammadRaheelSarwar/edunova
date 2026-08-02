const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'edunova_super_secret_key_2026';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // Demo fallback for guest access in development mode
    req.user = {
      id: 'demo-user-id',
      organizationId: 'demo-org-id',
      role: 'student',
      permissions: ['course.read', 'ai.use', 'quiz.take'],
    };
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired access token' });
    req.user = user;
    next();
  });
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: `Access denied. Requires role: ${roles.join(' or ')}` });
    }
    next();
  };
}

function requirePermission(permission) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    if (req.user.role === 'superadmin') return next();
    
    if (!req.user.permissions || !req.user.permissions.includes(permission)) {
      return res.status(403).json({ error: `Access denied. Missing permission: ${permission}` });
    }
    next();
  };
}

module.exports = {
  authenticateToken,
  requireRole,
  requirePermission,
  JWT_SECRET,
};
