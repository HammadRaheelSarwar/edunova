import React, { useState, useEffect } from 'react';
import { Library as LibraryIcon, Plus, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import Modal from '../components/Modal';

export default function Library() {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: 'Computer Science',
    totalCopies: 5
  });

  const fetchBooks = async () => {
    try {
      const res = await fetch('/api/library');
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/library', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newBook = await res.json();
      setBooks([newBook, ...books]);
      setIsModalOpen(false);
      setFormData({ title: '', author: '', isbn: '', category: 'Computer Science', totalCopies: 5 });
    } catch (err) {
      console.error(err);
    }
  };

  const issueBook = async (id) => {
    try {
      const res = await fetch(`/api/library/${id}/issue`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: 'STU-2026-001', studentName: 'Alex Johnson' })
      });
      const updated = await res.json();
      setBooks(books.map(b => b._id === id ? updated : b));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="actions-bar">
        <div>
          <h1 className="page-title">Library Book Catalog</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>
            Library catalog, media tracking, book issues, and returns.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Add Book to Catalog
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {books.map((b) => (
          <div key={b._id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="badge badge-info" style={{ marginBottom: '0.4rem' }}>{b.category}</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{b.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>By {b.author}</p>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>ISBN: {b.isbn || 'N/A'}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', marginTop: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Available</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: b.availableCopies > 0 ? 'var(--success)' : 'var(--danger)' }}>
                  {b.availableCopies} / {b.totalCopies} Copies
                </div>
              </div>
              <button 
                className="btn btn-secondary btn-sm" 
                disabled={b.availableCopies === 0}
                onClick={() => issueBook(b._id)}
              >
                <BookOpen size={14} /> Issue Book
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Book to Catalog">
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label className="form-label">Book Title</label>
            <input 
              type="text" 
              className="form-control" 
              required 
              placeholder="e.g. Design Patterns: Elements of Reusable Object-Oriented Software"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Author Name</label>
            <input 
              type="text" 
              className="form-control" 
              required 
              placeholder="Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-control" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                <option>Computer Science</option>
                <option>Software Engineering</option>
                <option>AI & Data Science</option>
                <option>Business Management</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Total Copies</label>
              <input 
                type="number" 
                className="form-control" 
                required 
                value={formData.totalCopies}
                onChange={(e) => setFormData({...formData, totalCopies: Number(e.target.value)})}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Book</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
