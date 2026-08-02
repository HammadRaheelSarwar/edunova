import React, { useState, useEffect } from 'react';
import { Users, Plus, Mail, Phone, Heart } from 'lucide-react';
import Modal from '../components/Modal';

export default function Parents() {
  const [parents, setParents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    occupation: '',
    studentName: '',
    studentId: '',
    relationship: 'Father'
  });

  const fetchParents = async () => {
    try {
      const res = await fetch('/api/parents');
      const data = await res.json();
      setParents(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchParents();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/parents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newItem = await res.json();
      setParents([newItem, ...parents]);
      setIsModalOpen(false);
      setFormData({ parentName: '', email: '', phone: '', occupation: '', studentName: '', studentId: '', relationship: 'Father' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="actions-bar">
        <div>
          <h1 className="page-title">Parent Directory</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>
            Parent profiles, guardian contact information, and student associations.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Add Parent Profile
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {parents.map((p) => (
          <div key={p._id} className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="badge badge-info">{p.relationship}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.occupation}</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0.35rem 0' }}>{p.parentName}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '0.75rem' }}>
              Student: {p.studentName} ({p.studentId})
            </p>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={14} color="var(--accent-primary)" /> {p.email}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={14} color="var(--success)" /> {p.phone}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Parent Profile">
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label className="form-label">Parent / Guardian Name</label>
            <input 
              type="text" 
              className="form-control" 
              required 
              placeholder="e.g. Robert Johnson"
              value={formData.parentName}
              onChange={(e) => setFormData({...formData, parentName: e.target.value})}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                required 
                placeholder="robert@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input 
                type="text" 
                className="form-control" 
                required 
                placeholder="+1 555-0190"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Student Name</label>
              <input 
                type="text" 
                className="form-control" 
                required 
                placeholder="Alex Johnson"
                value={formData.studentName}
                onChange={(e) => setFormData({...formData, studentName: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Student ID</label>
              <input 
                type="text" 
                className="form-control" 
                required 
                placeholder="STU-2026-001"
                value={formData.studentId}
                onChange={(e) => setFormData({...formData, studentId: e.target.value})}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Profile</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
