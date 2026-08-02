import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, CheckCircle, DollarSign, AlertCircle } from 'lucide-react';
import Modal from '../components/Modal';

export default function Fees() {
  const [fees, setFees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentId: 'STU-2026-001',
    studentName: 'Alex Johnson',
    course: 'Computer Science',
    feeType: 'Tuition Fee (Fall 2026)',
    amount: 2400,
    dueDate: '2026-08-30'
  });

  const fetchFees = async () => {
    try {
      const res = await fetch('/api/fees');
      const data = await res.json();
      setFees(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/fees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newFee = await res.json();
      setFees([newFee, ...fees]);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const markPaid = async (id) => {
    try {
      const res = await fetch(`/api/fees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentStatus: 'Paid', paymentMethod: 'Credit Card' })
      });
      const updated = await res.json();
      setFees(fees.map(f => f._id === id ? updated : f));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="actions-bar">
        <div>
          <h1 className="page-title">Fees & Financial Ledger</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>
            Student invoices, tuition collection, overdue reminders, and payment receipts.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Create Fee Invoice
        </button>
      </div>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Student Name</th>
              <th>Course Program</th>
              <th>Fee Category</th>
              <th>Amount ($)</th>
              <th>Due Date</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee) => (
              <tr key={fee._id}>
                <td style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-primary)' }}>
                  {fee.invoiceNo}
                </td>
                <td style={{ fontWeight: 700 }}>{fee.studentName}</td>
                <td>{fee.course}</td>
                <td>{fee.feeType}</td>
                <td style={{ fontWeight: 800, fontSize: '1rem' }}>${fee.amount}</td>
                <td style={{ color: 'var(--text-muted)' }}>{fee.dueDate}</td>
                <td>
                  <span className={`badge ${
                    fee.paymentStatus === 'Paid' ? 'badge-success' : fee.paymentStatus === 'Pending' ? 'badge-warning' : 'badge-danger'
                  }`}>
                    {fee.paymentStatus}
                  </span>
                </td>
                <td>
                  {fee.paymentStatus !== 'Paid' && (
                    <button className="btn btn-primary btn-sm" onClick={() => markPaid(fee._id)}>
                      <CheckCircle size={14} /> Mark as Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Generate Fee Invoice">
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label className="form-label">Student Name</label>
            <input 
              type="text" 
              className="form-control" 
              required 
              placeholder="e.g. Sophia Chen"
              value={formData.studentName}
              onChange={(e) => setFormData({...formData, studentName: e.target.value})}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Fee Category</label>
              <input 
                type="text" 
                className="form-control" 
                required 
                placeholder="e.g. Tuition Fee"
                value={formData.feeType}
                onChange={(e) => setFormData({...formData, feeType: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Amount ($)</label>
              <input 
                type="number" 
                className="form-control" 
                required 
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
              />
            </div>
          </div>
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
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Generate Invoice</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
