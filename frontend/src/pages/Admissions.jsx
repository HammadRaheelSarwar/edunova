import React, { useState, useEffect } from 'react';
import { UserPlus, Plus, CheckCircle, XCircle, Clock } from 'lucide-react';
import Modal from '../components/Modal';

export default function Admissions() {
  const [admissions, setAdmissions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    appliedCourse: 'Computer Science',
    prevSchool: ''
  });

  const fetchAdmissions = async () => {
    try {
      const res = await fetch('/api/admissions');
      const data = await res.json();
      setAdmissions(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newItem = await res.json();
      setAdmissions([newItem, ...admissions]);
      setIsModalOpen(false);
      setFormData({ applicantName: '', email: '', phone: '', appliedCourse: 'Computer Science', prevSchool: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/admissions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const updated = await res.json();
      setAdmissions(admissions.map(a => a._id === id ? updated : a));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="actions-bar">
        <div>
          <h1 className="page-title">Admission Portal</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>
            Process student applications, review qualifications, and manage enrollment status.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          New Application
        </button>
      </div>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>App No</th>
              <th>Applicant Name</th>
              <th>Applied Course</th>
              <th>Previous School</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admissions.map((adm) => (
              <tr key={adm._id}>
                <td style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-primary)' }}>
                  {adm.applicationNo}
                </td>
                <td>
                  <div style={{ fontWeight: 700 }}>{adm.applicantName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{adm.email}</div>
                </td>
                <td style={{ fontWeight: 600 }}>{adm.appliedCourse}</td>
                <td>{adm.prevSchool || 'N/A'}</td>
                <td style={{ color: 'var(--text-muted)' }}>{adm.applicationDate}</td>
                <td>
                  <span className={`badge ${
                    adm.status === 'Enrolled' || adm.status === 'Approved' ? 'badge-success' : adm.status === 'Rejected' ? 'badge-danger' : 'badge-warning'
                  }`}>
                    {adm.status}
                  </span>
                </td>
                <td>
                  {adm.status === 'Pending Review' && (
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button className="btn btn-primary btn-sm" onClick={() => updateStatus(adm._id, 'Approved')}>
                        Approve
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => updateStatus(adm._id, 'Rejected')}>
                        Reject
                      </button>
                    </div>
                  )}
                  {adm.status === 'Approved' && (
                    <button className="btn btn-primary btn-sm" onClick={() => updateStatus(adm._id, 'Enrolled')}>
                      Enroll Student
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Submit Admission Application">
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label className="form-label">Applicant Name</label>
            <input 
              type="text" 
              className="form-control" 
              required 
              placeholder="e.g. Jonathan Vance"
              value={formData.applicantName}
              onChange={(e) => setFormData({...formData, applicantName: e.target.value})}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                required 
                placeholder="jonathan@gmail.com"
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
                placeholder="+1 555-0921"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Applied Program</label>
            <select className="form-control" value={formData.appliedCourse} onChange={(e) => setFormData({...formData, appliedCourse: e.target.value})}>
              <option>Computer Science</option>
              <option>Software Engineering</option>
              <option>Business Administration</option>
              <option>Data Science</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Previous School / College</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. St. Xavier Academy"
              value={formData.prevSchool}
              onChange={(e) => setFormData({...formData, prevSchool: e.target.value})}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit Application</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
