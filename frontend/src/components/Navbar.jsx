import React from 'react';
import { Bell, Search, User, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header style={{
      height: 'var(--header-height)',
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 90
    }}>
      {/* Search Input */}
      <div className="search-box">
        <Search size={18} style={{ color: 'var(--text-muted)' }} />
        <input type="text" placeholder="Search students, faculty, courses, fees..." />
      </div>

      {/* User Profile & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <button style={{
          position: 'relative',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid var(--border-color)',
          borderRadius: '50%',
          width: '38px',
          height: '38px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
          cursor: 'pointer'
        }}>
          <Bell size={18} />
          <span style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--danger)'
          }}></span>
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'rgba(30, 41, 59, 0.6)',
          padding: '0.4rem 0.85rem 0.4rem 0.5rem',
          borderRadius: '50px',
          border: '1px solid var(--border-color)'
        }}>
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
            alt="User Avatar"
            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.2 }}>
              {user?.name || 'Administrator'}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <Shield size={10} />
              {(user?.role || 'Admin').toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
