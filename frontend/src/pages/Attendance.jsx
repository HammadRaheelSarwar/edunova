import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, CheckCircle2, XCircle, Clock, Save } from 'lucide-react';

export default function Attendance() {
  const [attendanceDate, setAttendanceDate] = useState('2026-08-02');
  const [course, setCourse] = useState('Computer Science');
  const [students, setStudents] = useState([]);
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    const fetchStudentsForAttendance = async () => {
      try {
        const res = await fetch('/api/students');
        const data = await res.json();
        const formatted = data.map(s => ({
          id: s._id || s.studentId,
          studentId: s.studentId,
          name: s.name,
          rollNo: s.rollNo || 'CS-01',
          status: 'Present'
        }));
        setStudents(formatted);
      } catch (err) {
        console.error('Failed to fetch students for attendance', err);
      }
    };

    fetchStudentsForAttendance();
  }, []);

  const toggleStatus = (id, newStatus) => {
    setStudents(students.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const handleSave = async () => {
    try {
      await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: attendanceDate,
          course: course,
          batch: '2023-2027',
          records: students.map(s => ({
            studentId: s.studentId,
            studentName: s.name,
            rollNo: s.rollNo,
            status: s.status
          }))
        })
      });
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 3000);
    } catch (err) {
      console.error('Failed to save attendance', err);
    }
  };

  return (
    <div>
      <div className="actions-bar">
        <div>
          <h1 className="page-title">Attendance Register</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>
            Daily session attendance tracking connected to student database.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          <Save size={18} />
          Save Register
        </button>
      </div>

      {savedMsg && (
        <div style={{ background: 'var(--success-bg)', color: 'var(--success)', border: '1px solid var(--success)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontWeight: 600 }}>
          Attendance register saved successfully via API for {attendanceDate}!
        </div>
      )}

      {/* Control Bar */}
      <div className="glass-card" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div className="form-group" style={{ marginBottom: 0, minWidth: '200px' }}>
          <label className="form-label">Select Date</label>
          <input 
            type="date" 
            className="form-control" 
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
          />
        </div>
        <div className="form-group" style={{ marginBottom: 0, minWidth: '220px' }}>
          <label className="form-label">Select Course Program</label>
          <select className="form-control" value={course} onChange={(e) => setCourse(e.target.value)}>
            <option>Computer Science</option>
            <option>Software Engineering</option>
            <option>Business Administration</option>
            <option>Data Science</option>
          </select>
        </div>
      </div>

      {/* Student Attendance List */}
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Status</th>
              <th>Action Toggle</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu) => (
              <tr key={stu.id}>
                <td style={{ fontWeight: 700 }}>{stu.rollNo}</td>
                <td style={{ fontWeight: 600 }}>{stu.name}</td>
                <td>
                  <span className={`badge ${
                    stu.status === 'Present' ? 'badge-success' : stu.status === 'Absent' ? 'badge-danger' : 'badge-warning'
                  }`}>
                    {stu.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      className={`btn btn-sm ${stu.status === 'Present' ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => toggleStatus(stu.id, 'Present')}
                    >
                      <CheckCircle2 size={14} /> Present
                    </button>
                    <button 
                      className={`btn btn-sm ${stu.status === 'Absent' ? 'btn-danger' : 'btn-secondary'}`}
                      onClick={() => toggleStatus(stu.id, 'Absent')}
                    >
                      <XCircle size={14} /> Absent
                    </button>
                    <button 
                      className={`btn btn-sm ${stu.status === 'Late' ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => toggleStatus(stu.id, 'Late')}
                    >
                      <Clock size={14} /> Late
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
