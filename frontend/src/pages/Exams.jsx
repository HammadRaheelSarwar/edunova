import React, { useState, useEffect } from 'react';
import { Award, Plus, FileText, CheckCircle } from 'lucide-react';
import Modal from '../components/Modal';

export default function Exams() {
  const [exams, setExams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    course: 'Computer Science',
    subject: '',
    examDate: '2026-08-20',
    totalMarks: 100
  });

  const fetchExams = async () => {
    try {
      const res = await fetch('/api/exams');
      const data = await res.json();
      setExams(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newExam = await res.json();
      setExams([newExam, ...exams]);
      setIsModalOpen(false);
      setFormData({ title: '', course: 'Computer Science', subject: '', examDate: '2026-08-20', totalMarks: 100 });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="actions-bar">
        <div>
          <h1 className="page-title">Exams & Gradebook</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>
            Manage examination timetables, marksheets, and grade assessments.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Schedule Examination
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {exams.map((exam) => (
          <div key={exam._id} className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <span className="badge badge-info" style={{ marginBottom: '0.35rem' }}>{exam.course}</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{exam.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Subject: <strong style={{ color: 'var(--text-main)' }}>{exam.subject}</strong> | Exam Date: <strong style={{ color: 'var(--accent-primary)' }}>{exam.examDate}</strong>
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Max Marks</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{exam.totalMarks}</div>
              </div>
            </div>

            {/* Results Table inside Exam */}
            {exam.results && exam.results.length > 0 && (
              <div className="table-responsive" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Marks Obtained</th>
                      <th>Grade</th>
                      <th>Result Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exam.results.map((res, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 700 }}>{res.studentName}</td>
                        <td style={{ fontWeight: 700 }}>{res.marksObtained} / {exam.totalMarks}</td>
                        <td style={{ fontWeight: 800, color: 'var(--warning)' }}>{res.grade}</td>
                        <td>
                          <span className={`badge ${res.status === 'Pass' ? 'badge-success' : 'badge-danger'}`}>
                            {res.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Schedule Examination">
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label className="form-label">Examination Title</label>
            <input 
              type="text" 
              className="form-control" 
              required 
              placeholder="e.g. Mid-Term Fall 2026"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Course</label>
              <select className="form-control" value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})}>
                <option>Computer Science</option>
                <option>Software Engineering</option>
                <option>Business Administration</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input 
                type="text" 
                className="form-control" 
                required 
                placeholder="e.g. Database Systems"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Exam Date</label>
              <input 
                type="date" 
                className="form-control" 
                required 
                value={formData.examDate}
                onChange={(e) => setFormData({...formData, examDate: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Total Marks</label>
              <input 
                type="number" 
                className="form-control" 
                required 
                value={formData.totalMarks}
                onChange={(e) => setFormData({...formData, totalMarks: Number(e.target.value)})}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Schedule Exam</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
