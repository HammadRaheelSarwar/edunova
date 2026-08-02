import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Clock, MapPin, User } from 'lucide-react';
import Modal from '../components/Modal';

export default function Timetable() {
  const [timetable, setTimetable] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    day: 'Monday',
    course: 'Computer Science',
    batch: '2023-2027',
    subject: '',
    facultyName: 'Dr. Alan Turing',
    classroom: 'Lab 302',
    startTime: '09:00 AM',
    endTime: '10:30 AM'
  });

  const fetchTimetable = async () => {
    try {
      const res = await fetch('/api/timetable');
      const data = await res.json();
      setTimetable(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/timetable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newItem = await res.json();
      setTimetable([...timetable, newItem]);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div>
      <div className="actions-bar">
        <div>
          <h1 className="page-title">Institutional Timetable</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>
            Weekly class schedule, lecture slots, faculty allocation, and classroom venues.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Add Schedule Slot
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {days.map((day) => {
          const daySlots = timetable.filter(t => t.day === day);
          return (
            <div key={day} className="glass-card">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={18} /> {day} Schedule
              </h3>
              {daySlots.length === 0 ? (
                <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>No classes scheduled for {day}.</div>
              ) : (
                <div className="table-responsive">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Time Slot</th>
                        <th>Subject & Program</th>
                        <th>Classroom / Venue</th>
                        <th>Faculty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {daySlots.map((slot) => (
                        <tr key={slot._id}>
                          <td style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                            {slot.startTime} - {slot.endTime}
                          </td>
                          <td>
                            <div style={{ fontWeight: 700 }}>{slot.subject}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{slot.course} ({slot.batch})</div>
                          </td>
                          <td>
                            <span className="badge badge-info">{slot.classroom}</span>
                          </td>
                          <td style={{ fontWeight: 600 }}>{slot.facultyName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Timetable Slot">
        <form onSubmit={handleCreate}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Day of Week</label>
              <select className="form-control" value={formData.day} onChange={(e) => setFormData({...formData, day: e.target.value})}>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input 
                type="text" 
                className="form-control" 
                required 
                placeholder="e.g. Data Structures"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Start Time</label>
              <input 
                type="text" 
                className="form-control" 
                required 
                placeholder="09:00 AM"
                value={formData.startTime}
                onChange={(e) => setFormData({...formData, startTime: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">End Time</label>
              <input 
                type="text" 
                className="form-control" 
                required 
                placeholder="10:30 AM"
                value={formData.endTime}
                onChange={(e) => setFormData({...formData, endTime: e.target.value})}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Classroom Venue</label>
            <input 
              type="text" 
              className="form-control" 
              required 
              placeholder="e.g. Lab 302 / Room 101"
              value={formData.classroom}
              onChange={(e) => setFormData({...formData, classroom: e.target.value})}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Schedule Slot</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
