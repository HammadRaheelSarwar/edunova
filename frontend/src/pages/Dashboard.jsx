import React, { useState, useEffect } from 'react';
import { Users, UserCheck, BookOpen, CreditCard, Award, ArrowUpRight, Plus, CheckCircle2, Clock } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function Dashboard() {
  const [stats, setStats] = useState({
    studentsCount: 1420,
    facultyCount: 88,
    coursesCount: 32,
    feesCollected: '$482,500'
  });

  const recentActivities = [
    { id: 1, title: 'New Student Enrollment', detail: 'Sophia Chen enrolled in Software Engineering (Batch 2024-2028)', time: '10 mins ago', type: 'student' },
    { id: 2, title: 'Fee Payment Confirmed', detail: 'Alex Johnson paid $2,400 for Tuition Fee (Fall 2026)', time: '45 mins ago', type: 'fee' },
    { id: 3, title: 'Mid-Term Exam Schedule Published', detail: 'Computer Science Dept published Fall 2026 Exam timetable', time: '2 hours ago', type: 'exam' },
    { id: 4, title: 'New Faculty Assigned', detail: 'Dr. Alan Turing assigned to Artificial Intelligence course', time: '5 hours ago', type: 'faculty' }
  ];

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="page-title">
          Educational ERP <span className="gradient-text">Overview</span>
        </h1>
        <p className="page-subtitle">
          Real-time institutional metrics, active enrollments, and academic performance.
        </p>
      </div>

      {/* Top Stat Cards Grid */}
      <div className="grid-stats">
        <StatCard title="Total Enrolled Students" value={stats.studentsCount} icon={Users} color="#6366f1" subtitle="+12% from last term" />
        <StatCard title="Active Faculty Members" value={stats.facultyCount} icon={UserCheck} color="#10b981" subtitle="98% attendance record" />
        <StatCard title="Offered Programs & Courses" value={stats.coursesCount} icon={BookOpen} color="#3b82f6" subtitle="Across 4 Departments" />
        <StatCard title="Total Fees Collected" value={stats.feesCollected} icon={CreditCard} color="#f59e0b" subtitle="Fall 2026 Semester" />
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid-2col">
        {/* Left Column: Quick Stats & Recent Enrollments */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Quick Academic Actions</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>Admissions Open</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Fall 2026 admission portal is currently receiving applications.</div>
            </div>
            <div style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ color: 'var(--success)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>Attendance Rate</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>94.2% average student attendance logged this week.</div>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activities */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Recent Institutional Updates</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentActivities.map((act) => (
              <div key={act.id} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ background: 'rgba(99, 102, 241, 0.15)', padding: '0.4rem', borderRadius: '50%', color: 'var(--accent-primary)', flexShrink: 0 }}>
                  <Clock size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>{act.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.15rem 0' }}>{act.detail}</div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-dim)' }}>{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
