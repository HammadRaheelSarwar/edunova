import React, { useState, useEffect } from 'react';
import { Building2, Plus, Users, CheckCircle, AlertTriangle } from 'lucide-react';
import Modal from '../components/Modal';

export default function Facilities() {
  const [facilities, setFacilities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Classroom',
    capacity: 40,
    building: 'Main Academic Block'
  });

  const fetchFacilities = async () => {
    try {
      const res = await fetch('/api/facilities');
      const data = await res.json();
      setFacilities(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/facilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newItem = await res.json();
      setFacilities([newItem, ...facilities]);
      setIsModalOpen(false);
      setFormData({ name: '', type: 'Classroom', capacity: 40, building: 'Main Academic Block' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="actions-bar">
        <div>
          <h1 className="page-title">Campus Facilities & Classrooms</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>
            Lecture halls, laboratories, auditoriums, seating capacity, and allocation.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Add Facility / Room
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {facilities.map((fac) => (
          <div key={fac._id} className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <span className="badge badge-info">{fac.type}</span>
              <span className={`badge ${fac.status === 'Available' ? 'badge-success' : 'badge-warning'}`}>
                {fac.status}
              </span>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0.35rem 0' }}>{fac.name}</h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Building: {fac.building}</p>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Facility Code: <strong style={{ color: 'var(--accent-primary)', fontFamily: 'monospace' }}>{fac.code}</strong>
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                {fac.capacity} Seats
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Facility / Classroom">
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label className="form-label">Facility / Room Name</label>
            <input 
              type="text" 
              className="form-control" 
              required 
              placeholder="e.g. Quantum Computing Lab 404"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Facility Type</label>
              <select className="form-control" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                <option>Classroom</option>
                <option>Laboratory</option>
                <option>Auditorium</option>
                <option>Sports Ground</option>
                <option>Hostel Block</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Seating Capacity</label>
              <input 
                type="number" 
                className="form-control" 
                required 
                value={formData.capacity}
                onChange={(e) => setFormData({...formData, capacity: Number(e.target.value)})}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Building / Block</label>
            <input 
              type="text" 
              className="form-control" 
              required 
              placeholder="Computing Block B"
              value={formData.building}
              onChange={(e) => setFormData({...formData, building: e.target.value})}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Facility</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
