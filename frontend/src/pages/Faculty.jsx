import React, { useState, useEffect } from 'react';
import { UserCheck, Plus, Trash2, Mail, Phone, BookOpen } from 'lucide-react';
import Modal from '../components/Modal';

export default function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Computer Science',
    designation: 'Professor',
    phone: ''
  });

  const fetchFaculty = async () => {
    try {
      const res = await fetch('/api/faculty');
      const data = await res.json();
      setFaculty(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/faculty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newFac = await res.json();
      setFaculty([newFac, ...faculty]);
      setIsModalOpen(false);
      setFormData({ name: '', email: '', department: 'Computer Science', designation: 'Professor', phone: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/faculty/${id}`, { method: 'DELETE' });
      setFaculty(faculty.filter(f => f._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="actions-bar">
        <div>
          <h1 className="page-title">Faculty Directory</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>
            Manage professors, lecturers, subject allocations, and departmental roles.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Add Faculty Member
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {faculty.map((f) => (
          <div key={f._id} className="glass-card" style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span className="badge badge-info" style={{ marginBottom: '0.4rem' }}>{f.department}</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{f.name}</h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>{f.designation}</p>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(f._id)}>
                <Trash2 size={14} />
              </button>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={14} color="var(--accent-primary)" /> {f.email}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={14} color="var(--success)" /> {f.phone || '+1 555-4000'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={14} color="var(--warning)" />
                Assigned: {f.subjectsAssigned ? f.subjectsAssigned.join(', ') : 'Data Structures'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Faculty Member">
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label className="form-label">Full Name & Title</label>
            <input 
              type="text" 
              className="form-control" 
              required 
              placeholder="e.g. Dr. Ada Lovelace"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              required 
              placeholder="ada@edunova.edu"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Department</label>
              <select 
                className="form-control"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
              >
                <option>Computer Science</option>
                <option>Software Engineering</option>
                <option>Business Administration</option>
                <option>Physics & Electronics</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Designation</label>
              <input 
                type="text" 
                className="form-control" 
                required 
                placeholder="e.g. Associate Professor"
                value={formData.designation}
                onChange={(e) => setFormData({...formData, designation: e.target.value})}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Faculty</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
