const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const StudentProfile = require('../models/StudentProfile');
const TeacherProfile = require('../models/TeacherProfile');
const ParentProfile = require('../models/ParentProfile');
const AdminProfile = require('../models/AdminProfile');
const Organization = require('../models/Organization');
const { JWT_SECRET } = require('../middleware/authMiddleware');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Demo fallback for quick authentication
    let user = await User.findOne({ email });

    if (!user) {
      // Find or create default demo organization
      let org = await Organization.findOne({ code: 'edunova-demo' });
      if (!org) {
        org = await Organization.create({
          name: 'EduNova University',
          code: 'edunova-demo',
          email: 'admin@edunova.edu',
        });
      }

      user = await User.create({
        organizationId: org._id,
        name: email ? email.split('@')[0] : 'Demo User',
        email: email || 'student@edunova.edu',
        passwordHash: '$2b$10$demoHashedPasswordValuePlaceholder',
        role: role || 'student',
        permissions: ['course.read', 'ai.use', 'quiz.take'],
      });

      // Create profile based on role
      if (user.role === 'student') {
        await StudentProfile.create({ userId: user._id, organizationId: org._id });
      } else if (user.role === 'teacher') {
        await TeacherProfile.create({ userId: user._id, organizationId: org._id });
      } else if (user.role === 'parent') {
        await ParentProfile.create({ userId: user._id, organizationId: org._id });
      } else {
        await AdminProfile.create({ userId: user._id, organizationId: org._id });
      }
    }

    const token = jwt.sign(
      {
        id: user._id,
        organizationId: user.organizationId,
        role: user.role,
        permissions: user.permissions,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/auth/me
router.get('/me', async (req, res) => {
  return res.json({
    id: 'demo-user-id',
    name: 'EduNova Demo User',
    email: 'user@edunova.edu',
    role: 'student',
  });
});

module.exports = router;
