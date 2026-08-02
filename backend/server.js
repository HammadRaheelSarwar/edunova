const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/faculty', require('./routes/facultyRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/exams', require('./routes/examRoutes'));
app.use('/api/fees', require('./routes/feeRoutes'));
app.use('/api/library', require('./routes/libraryRoutes'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'EduNova MERN ERP API is healthy and running' });
});

// Root API Endpoint
app.get('/', (req, res) => {
  res.send('<h1>EduNova MERN ERP API</h1><p>Running live. Use /api/health to check server status.</p>');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 EduNova Server running on port ${PORT}`);
});

module.exports = app;
