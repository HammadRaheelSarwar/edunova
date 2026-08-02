import { BrowserRouter, Routes, Route } from 'react';
import { BrowserRouter as Router, Routes as RouteList, Route as RouteItem } from 'react-router-dom';
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
      <RouteList>
        <RouteItem path="/" element={<Home />} />
        <RouteItem path="/meetings" element={<Meetings />} />
        <RouteItem path="/meetings/:id" element={<MeetingDetails />} />
        <RouteItem path="/ai-assistant" element={<AiStudyAssistant />} />
        <RouteItem path="/teacher-ai" element={<TeacherAiStudio />} />
        <RouteItem path="/dashboard/student" element={<StudentDashboard />} />
        <RouteItem path="/dashboard/teacher" element={<TeacherDashboard />} />
        <RouteItem path="/dashboard/parent" element={<ParentDashboard />} />
        <RouteItem path="/dashboard/admin" element={<AdminDashboard />} />
      </RouteList>
    </Router>
  );
}

export default App;
