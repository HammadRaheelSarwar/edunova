import React, { useState, useEffect } from 'react';
import { Trophy, Plus, MapPin, Users, Calendar } from 'lucide-react';
import Modal from '../components/Modal';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Club',
    organizer: 'Tech Club',
    eventDate: '2026-09-01',
    venue: 'Main Auditorium',
    description: ''
  });

  const fetchActivities = async () => {
    try {
      const res = await fetch('/api/activities');
      const data = await res.json();
      setActivities(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newItem = await res.json();
      setActivities([newItem, ...activities]);
      setIsModalOpen(false);
      setFormData({ title: '', category: 'Club', organizer: 'Tech Club', eventDate: '2026-09-01', venue: 'Main Auditorium', description: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="actions-bar">
        <div>
          <h1 className="page-title">Extracurricular Activities</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>
            Student clubs, workshops, hackathons, sports, and cultural events.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Create Event Activity
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {activities.map((act) => (
          <div key={act._id} className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="badge badge-success">{act.category}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 700 }}>
                {act.eventDate}
              </span>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0.35rem 0' }}>{act.title}</h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{act.description}</p>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={14} color="var(--warning)" /> Venue: <strong style={{ color: 'var(--text-main)' }}>{act.venue}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={14} color="var(--info)" /> Organizer: <strong style={{ color: 'var(--text-main)' }}>{act.organizer}</strong> ({act.participantsCount || 0} Participants)
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Campus Event / Activity">
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label className="form-label">Activity Title</label>
            <input 
              type="text" 
              className="form-control" 
              required 
              placeholder="e.g. Annual AI Innovation Expo"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-control" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                <option>Club</option>
                <option>Sports</option>
                <option>Cultural</option>
                <option>Workshop</option>
                <option>Competition</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Organizer</label>
              <input 
                type="text" 
                className="form-control" 
                required 
                placeholder="Robotics Club"
                value={formData.organizer}
                onChange={(e) => setFormData({...formData, organizer: e.target.value})}
              />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Event Date</label>
              <input 
                type="date" 
                className="form-control" 
                required 
                value={formData.eventDate}
                onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Venue</label>
              <input 
                type="text" 
                className="form-control" 
                required 
                placeholder="Main Auditorium"
                value={formData.venue}
                onChange={(e) => setFormData({...formData, venue: e.target.value})}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Event</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
