import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Meetings from './pages/Meetings';
import MeetingDetails from './pages/MeetingDetails';
import AiStudyAssistant from './pages/AiStudyAssistant';
import TeacherAiStudio from './pages/TeacherAiStudio';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import ParentDashboard from './pages/ParentDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/meetings/:id" element={<MeetingDetails />} />
        <Route path="/ai-assistant" element={<AiStudyAssistant />} />
        <Route path="/teacher-ai" element={<TeacherAiStudio />} />
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
        <Route path="/dashboard/parent" element={<ParentDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />

        {/* HTML Fallbacks */}
        <Route path="/student-dashboard.html" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard.html" element={<TeacherDashboard />} />
        <Route path="/parent-dashboard.html" element={<ParentDashboard />} />
        <Route path="/admin-dashboard.html" element={<AdminDashboard />} />
        <Route path="/ai-assistant.html" element={<AiStudyAssistant />} />
        <Route path="/teacher-ai.html" element={<TeacherAiStudio />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
