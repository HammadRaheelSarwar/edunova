import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Faculty from './pages/Faculty';
import Courses from './pages/Courses';
import Attendance from './pages/Attendance';
import Exams from './pages/Exams';
import Fees from './pages/Fees';
import Library from './pages/Library';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'students': return <Students />;
      case 'faculty': return <Faculty />;
      case 'courses': return <Courses />;
      case 'attendance': return <Attendance />;
      case 'exams': return <Exams />;
      case 'fees': return <Fees />;
      case 'library': return <Library />;
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
