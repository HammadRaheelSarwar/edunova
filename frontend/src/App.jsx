import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Faculty from './pages/Faculty';
import Courses from './pages/Courses';
import Admissions from './pages/Admissions';
import Attendance from './pages/Attendance';
import Assignments from './pages/Assignments';
import Timetable from './pages/Timetable';
import Exams from './pages/Exams';
import Fees from './pages/Fees';
import Library from './pages/Library';
import Activities from './pages/Activities';
import Facilities from './pages/Facilities';
import Parents from './pages/Parents';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'students': return <Students />;
      case 'faculty': return <Faculty />;
      case 'courses': return <Courses />;
      case 'admissions': return <Admissions />;
      case 'attendance': return <Attendance />;
      case 'assignments': return <Assignments />;
      case 'timetable': return <Timetable />;
      case 'exams': return <Exams />;
      case 'fees': return <Fees />;
      case 'library': return <Library />;
      case 'activities': return <Activities />;
      case 'facilities': return <Facilities />;
      case 'parents': return <Parents />;
      default: return <Dashboard />;
    }
  };

  return (
    <AuthProvider>
      <div className="app-layout">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="main-wrapper">
          <Navbar />
          <main className="content-container">
            {renderPage()}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
