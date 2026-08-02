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

// Registered Module Routes (Covering all 14 OpenEduCat ERP Modules)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));        // openeducat_core
app.use('/api/faculty', require('./routes/facultyRoutes'));          // openeducat_core
app.use('/api/courses', require('./routes/courseRoutes'));          // openeducat_core
app.use('/api/attendance', require('./routes/attendanceRoutes'));    // openeducat_attendance
app.use('/api/exams', require('./routes/examRoutes'));              // openeducat_exam
app.use('/api/fees', require('./routes/feeRoutes'));                // openeducat_fees
app.use('/api/library', require('./routes/libraryRoutes'));          // openeducat_library
app.use('/api/admissions', require('./routes/admissionRoutes'));    // openeducat_admission
app.use('/api/assignments', require('./routes/assignmentRoutes'));  // openeducat_assignment
app.use('/api/timetable', require('./routes/timetableRoutes'));      // openeducat_timetable
app.use('/api/activities', require('./routes/activityRoutes'));      // openeducat_activity
app.use('/api/facilities', require('./routes/facilityRoutes'));      // openeducat_facility & openeducat_classroom
app.use('/api/parents', require('./routes/parentRoutes'));          // openeducat_parent

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'EduNova MERN ERP API is healthy and running' });
});

// Root API Endpoint
app.get('/', (req, res) => {
  res.send('<h1>EduNova MERN ERP API</h1><p>Running live with all 14 OpenEduCat modules mounted.</p>');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 EduNova Server running on port ${PORT}`);
});

module.exports = app;
