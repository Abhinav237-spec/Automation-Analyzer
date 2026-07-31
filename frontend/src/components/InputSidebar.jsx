import React, { useState } from 'react';
import { Card, Spinner } from './UI';

const EXAMPLES = [
  {
    name: 'Customer Support',
    text: 'Agents manually read incoming emails, categorize them based on content, and assign them to the correct department. This process is slow and prone to errors. They then have to wait for manager approval for any refunds over $50.'
  },
  {
    name: 'Employee Onboarding',
    text: 'HR manually sends welcome emails, schedules training sessions, and requests IT to set up accounts for new hires. The HR rep then has to copy the new hire data from the spreadsheet into the payroll system manually.'
  },
  {
    name: 'Invoice Processing',
    text: 'Accounts payable receives invoices via email, manually enters the details into the accounting system, and routes them for manager approval. If there is a discrepancy, they email the vendor back and forth until resolved.'
  }
];

export const InputSidebar = ({ onAnalyze, loading }) => {
  const [workflow, setWorkflow] = useState('');
  const [nvidiaKey, setNvidiaKey] = useState('');
  const [useNim, setUseNim] = useState(true);
  
  const handleAnalyze = () => {
    if (workflow.length >= 20) {
      onAnalyze(workflow, nvidiaKey, useNim);
    }
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', height: '100%', overflowY: 'auto' }}>
      <div>
        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Describe Process</h3>
        <div style={{ position: 'relative' }}>
          <textarea
            value={workflow}
            onChange={(e) => setWorkflow(e.target.value)}
            placeholder="Describe the workflow step-by-step..."
            rows={12}
            style={{
              width: '100%',
              backgroundColor: 'var(--bg-elevated)',
              border: `1px solid ${workflow.length > 20 ? 'var(--purple-dark)' : 'var(--border)'}`,
              borderRadius: '8px',
              padding: '12px',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              resize: 'vertical',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
          <div style={{ position: 'absolute', bottom: '16px', right: '12px', fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-elevated)', padding: '2px 4px' }}>
            {workflow.split(/\s+/).filter(w => w.length > 0).length} words
          </div>
        </div>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={workflow.length < 20 || loading}
        style={{
          width: '100%',
          background: 'linear-gradient(to right, var(--purple-dark), var(--violet))',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          padding: '12px',
          fontWeight: 700,
          cursor: workflow.length < 20 || loading ? 'not-allowed' : 'pointer',
          opacity: workflow.length < 20 ? 0.5 : 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        {loading ? (
          <><Spinner size={16} color="purple-light" /> Analysing…</>
        ) : (
          'Analyze Workflow'
        )}
      </button>

      <Card style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>NVIDIA NIM Integration</h3>
          <input
            type="checkbox"
            checked={useNim}
            onChange={(e) => setUseNim(e.target.checked)}
            style={{ accentColor: 'var(--purple)', cursor: 'pointer' }}
          />
        </div>
        {useNim && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input
              type="password"
              value={nvidiaKey}
              onChange={(e) => setNvidiaKey(e.target.value)}
              placeholder="nvapi-..."
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-base)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '8px',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            />
            <a href="https://build.nvidia.com" target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: 'var(--cyan)', textDecoration: 'none' }}>
              Get API key at build.nvidia.com
            </a>
          </div>
        )}
      </Card>

      <div>
        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '12px' }}>Examples</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {EXAMPLES.map(ex => (
            <button
              key={ex.name}
              onClick={() => setWorkflow(ex.text)}
              style={{
                textAlign: 'left',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '8px 12px',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--purple)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              {ex.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
