import React from 'react';
import { Star } from 'lucide-react';

export const Card = ({ children, glow, style }) => (
  <div
    style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: glow ? '0 0 15px rgba(99,102,241,0.2)' : '0 4px 24px rgba(0,0,0,0.4)',
      ...style
    }}
  >
    {children}
  </div>
);

export const Badge = ({ children, color, style }) => {
  return (
    <span
      style={{
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '0.75rem',
        fontWeight: 500,
        backgroundColor: `color-mix(in srgb, var(--${color}) 20%, transparent)`,
        color: `var(--${color === 'purple' ? 'purple-light' : color})`,
        ...style
      }}
    >
      {children}
    </span>
  );
};

export const ScoreRing = ({ value, label, color, size = 110 }) => {
  const radius = (size - 10) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', width: size, height: size, marginBottom: '24px' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="var(--bg-elevated)" strokeWidth="8" fill="transparent" />
        <circle cx={size / 2} cy={size / 2} r={radius} stroke={`var(--${color})`} strokeWidth="8" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
      </svg>
      <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '1.5rem', fontWeight: 700, color: `var(--${color})` }}>{value}</span>
      </div>
      <span style={{ position: 'absolute', bottom: '-24px', fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
    </div>
  );
};

export const KpiCard = ({ icon, label, value, sub, color }) => (
  <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '16px', height: '100%' }}>
    <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{icon}</div>
    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{label}</div>
    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: `var(--${color || 'text-primary'})` }}>{value}</div>
    {sub && <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', marginTop: '4px' }}>{sub}</div>}
  </Card>
);

export const ProgressBar = ({ label, value, color }) => (
  <div style={{ width: '100%', marginBottom: '12px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
      <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
      <span style={{ color: `var(--${color})` }}>{Math.round(value * 100)}%</span>
    </div>
    <div style={{ height: '6px', width: '100%', backgroundColor: 'var(--bg-elevated)', borderRadius: '9999px', overflow: 'hidden' }}>
      <div style={{ height: '100%', borderRadius: '9999px', transition: 'width 1s', width: `${value * 100}%`, backgroundColor: `var(--${color})` }} />
    </div>
  </div>
);

export const PatternBadge = ({ icon, label, count, active }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px',
    border: `1px solid ${active ? 'color-mix(in srgb, var(--purple) 30%, transparent)' : 'var(--border)'}`,
    backgroundColor: active ? 'color-mix(in srgb, var(--purple) 10%, transparent)' : 'var(--bg-elevated)',
    opacity: active ? 1 : 0.5,
    transition: 'all 0.2s'
  }}>
    <div style={{ fontSize: '1.25rem' }}>{icon}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{label}</div>
    </div>
    {active && (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '9999px', backgroundColor: 'color-mix(in srgb, var(--green) 20%, transparent)', color: 'var(--green)', fontSize: '0.75rem', fontWeight: 700 }}>
        {count}
      </div>
    )}
  </div>
);

export const SectionHeader = ({ icon, title, sub }) => (
  <div style={{ marginBottom: '24px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
      <span style={{ color: 'var(--purple-light)' }}>{icon}</span>
      <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--purple-light)', letterSpacing: '0.025em' }}>{title}</h2>
    </div>
    {sub && <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{sub}</p>}
  </div>
);

export const Spinner = ({ size = 24, color = 'purple' }) => (
  <div 
    className="animate-spin"
    style={{ 
      width: size, 
      height: size,
      borderRadius: '9999px',
      border: '2px solid var(--bg-elevated)', 
      borderTopColor: `var(--${color})` 
    }}
  />
);

export const EmptyState = ({ icon, title, sub }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px', textAlign: 'center', padding: '40px', opacity: 0.6 }}>
    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{icon}</div>
    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', maxWidth: '24rem' }}>{sub}</p>
  </div>
);

export const ConfidenceStars = ({ value }) => {
  const pct = Math.round(value * 100);
  const stars = Math.round(value * 5);
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ display: 'flex', color: 'var(--amber)', fontSize: '0.875rem' }}>
        {[1,2,3,4,5].map(i => (
          <Star key={i} size={14} fill={i <= stars ? "currentColor" : "none"} strokeWidth={i <= stars ? 0 : 2} />
        ))}
      </div>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{pct}% Confidence</span>
    </div>
  );
};
