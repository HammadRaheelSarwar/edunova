import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Meetings from './pages/Meetings';
import MeetingDetails from './pages/MeetingDetails';
import AiStudyAssistant from './pages/AiStudyAssistant';
import TeacherAiStudio from './pages/TeacherAiStudio';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import ParentDashboard from './pages/ParentDashboard';
import AdminDashboard from './pages/AdminDashboard';

function PathRedirect() {
  useEffect(() => {
    const path = window.location.pathname;
    if (path && path !== '/' && path !== '/index.html' && !window.location.hash) {
      window.location.replace('/#' + path);
    }
  }, []);
  return null;
}

function App() {
  return (
    <Router>
      <PathRedirect />
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
