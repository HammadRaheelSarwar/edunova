import React, { useState, useEffect } from 'react';
import { FileCode, Plus, Calendar, UserCheck } from 'lucide-react';
import Modal from '../components/Modal';

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    course: 'Computer Science',
    subject: '',
    facultyName: 'Dr. Alan Turing',
    dueDate: '2026-08-20',
    maxMarks: 100,
    description: ''
  });

  const fetchAssignments = async () => {
    try {
      const res = await fetch('/api/assignments');
      const data = await res.json();
      setAssignments(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newItem = await res.json();
      setAssignments([newItem, ...assignments]);
      setIsModalOpen(false);
      setFormData({ title: '', course: 'Computer Science', subject: '', facultyName: 'Dr. Alan Turing', dueDate: '2026-08-20', maxMarks: 100, description: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="actions-bar">
        <div>
          <h1 className="page-title">Assignments & Submissions</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>
            Coursework tasks, submission tracking, due date reminders, and grades.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Create Assignment
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {assignments.map((asg) => (
          <div key={asg._id} className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <span className="badge badge-info">{asg.course}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--danger)', fontWeight: 700 }}>
                Due: {asg.dueDate}
              </span>
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.35rem 0' }}>{asg.title}</h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{asg.description}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                By <strong style={{ color: 'var(--text-main)' }}>{asg.facultyName}</strong>
              </div>
              <span className="badge badge-success">
                {asg.submissionsCount || 0} Submissions
              </span>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Publish Assignment">
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label className="form-label">Assignment Title</label>
            <input 
              type="text" 
              className="form-control" 
              required 
              placeholder="e.g. Neural Networks Model Tuning"
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
                placeholder="Artificial Intelligence"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input 
                type="date" 
                className="form-control" 
                required 
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Max Marks</label>
              <input 
                type="number" 
                className="form-control" 
                required 
                value={formData.maxMarks}
                onChange={(e) => setFormData({...formData, maxMarks: Number(e.target.value)})}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Instructions / Description</label>
            <textarea 
              className="form-control" 
              rows="3" 
              placeholder="Assignment instructions..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Publish</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
