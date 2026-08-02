import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit, UserCheck, Filter } from 'lucide-react';
import Modal from '../components/Modal';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'Computer Science',
    batch: '2023-2027',
    rollNo: '',
    gender: 'Male'
  });

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students');
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newStu = await res.json();
      setStudents([newStu, ...students]);
      setIsModalOpen(false);
      setFormData({ name: '', email: '', phone: '', course: 'Computer Science', batch: '2023-2027', rollNo: '', gender: 'Male' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/students/${id}`, { method: 'DELETE' });
      setStudents(students.filter(s => s._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.studentId.toLowerCase().includes(search.toLowerCase()) ||
    s.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="actions-bar">
        <div>
          <h1 className="page-title">Student Management</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>
            Manage student profiles, enrollments, roll numbers, and academic statuses.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Enroll New Student
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="search-box" style={{ flex: 1 }}>
            <Search size={18} style={{ color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by student name, ID, or course..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Course & Batch</th>
              <th>Roll No</th>
              <th>Contact Info</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((stu) => (
              <tr key={stu._id}>
                <td style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-primary)' }}>
                  {stu.studentId}
                </td>
                <td>
                  <div style={{ fontWeight: 700 }}>{stu.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stu.gender}</div>
                </td>
                <td>
                  <div style={{ fontWeight: 600 }}>{stu.course}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Batch: {stu.batch}</div>
                </td>
                <td style={{ fontWeight: 600 }}>{stu.rollNo}</td>
                <td>
                  <div style={{ fontSize: '0.85rem' }}>{stu.email}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stu.phone}</div>
                </td>
                <td>
                  <span className={`badge ${stu.status === 'Enrolled' ? 'badge-success' : 'badge-info'}`}>
                    {stu.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(stu._id)}>
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Enroll Student Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Enroll New Student">
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-control" 
              required 
              placeholder="e.g. Eleanor Vance"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              required 
              placeholder="eleanor@edunova.edu"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Course</label>
              <select 
                className="form-control"
                value={formData.course}
                onChange={(e) => setFormData({...formData, course: e.target.value})}
              >
                <option>Computer Science</option>
                <option>Software Engineering</option>
                <option>Business Administration</option>
                <option>Data Science</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Roll Number</label>
              <input 
                type="text" 
                className="form-control" 
                required 
                placeholder="e.g. CS-09"
                value={formData.rollNo}
                onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save & Enroll</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
