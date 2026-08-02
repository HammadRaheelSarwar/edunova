import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Clock, Award, Layers } from 'lucide-react';
import Modal from '../components/Modal';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    department: 'School of Computing',
    credits: 160,
    durationYears: 4,
    description: ''
  });

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/courses');
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newC = await res.json();
      setCourses([newC, ...courses]);
      setIsModalOpen(false);
      setFormData({ code: '', name: '', department: 'School of Computing', credits: 160, durationYears: 4, description: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="actions-bar">
        <div>
          <h1 className="page-title">Programs & Courses</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>
            Academic degrees, course credits, duration, and curricula catalogs.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Create New Program
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {courses.map((c) => (
          <div key={c._id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-primary)', background: 'rgba(99,102,241,0.15)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                  {c.code}
                </span>
                <span className="badge badge-success">{c.status}</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0.4rem 0' }}>{c.name}</h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem', height: '2.8em', overflow: 'hidden' }}>
                {c.description}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Credits</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{c.credits}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Duration</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{c.durationYears} Yrs</div>
              </div>
              <div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Batches</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{c.batchesCount || 3}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Program / Course">
        <form onSubmit={handleCreate}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Course Code</label>
              <input 
                type="text" 
                className="form-control" 
                required 
                placeholder="e.g. AI505"
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Program Name</label>
              <input 
                type="text" 
                className="form-control" 
                required 
                placeholder="e.g. Artificial Intelligence & Robotics"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Department / School</label>
            <input 
              type="text" 
              className="form-control" 
              required 
              placeholder="School of Computing & AI"
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea 
              className="form-control" 
              rows="3"
              placeholder="Brief course overview..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Publish Course</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
