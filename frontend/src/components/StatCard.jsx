import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'var(--accent-primary)', change, subtitle }) {
  return (
    <div className="glass-card" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {title}
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.35rem 0', color: 'var(--text-main)' }}>
            {value}
          </h2>
          {subtitle && (
            <p style={{ fontSize: '0.775rem', color: 'var(--text-dim)' }}>
              {subtitle}
            </p>
          )}
        </div>
        <div style={{
          width: '46px',
          height: '46px',
          borderRadius: 'var(--radius-sm)',
          background: `rgba(99, 102, 241, 0.15)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color
        }}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}
