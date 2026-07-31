import React from 'react';
import { useAnalysis } from './hooks/useAnalysis';
import { InputSidebar } from './components/InputSidebar';
import { DashboardTab } from './components/DashboardTab';
import { SearchTab, ROITab, RecommendationsTab, NIMTab } from './components/ResultTabs';
import { Spinner, EmptyState } from './components/UI';

export default function App() {
  const { loading, data, error, activeTab, setTab, analyze } = useAnalysis();

  const tabs = ['Dashboard', 'Semantic Search', 'ROI', 'Recommendations', 'NVIDIA NIM'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'var(--bg-base)' }}>
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '2rem' }}>🧠</span>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--purple-light)', letterSpacing: '0.05em' }}>AUTOPSY AI</h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Process Intelligence Platform v3</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['HF Transformers', 'Sentence Transformers', 'NVIDIA NIM', 'Explainable AI'].map(tag => (
            <span key={tag} style={{ padding: '4px 8px', backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-light)', borderRadius: '4px', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Main Layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{ width: '320px', backgroundColor: 'var(--bg-card)', borderRight: '1px solid var(--border)', flexShrink: 0 }}>
          <InputSidebar onAnalyze={analyze} loading={loading} />
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', padding: '0 24px' }}>
            {tabs.map(tab => {
              const isActive = activeTab === tab;
              const isDisabled = !data;
              return (
                <button
                  key={tab}
                  onClick={() => !isDisabled && setTab(tab)}
                  disabled={isDisabled}
                  style={{
                    padding: '16px 20px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: isActive ? 'var(--purple-light)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'var(--bg-elevated)' : 'transparent',
                    border: 'none',
                    borderBottom: isActive ? '2px solid var(--purple)' : '2px solid transparent',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    opacity: isDisabled ? 0.4 : 1,
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isDisabled && !isActive) {
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isDisabled && !isActive) {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Scrollable Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '32px 24px', backgroundColor: 'var(--bg-base)' }}>
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px', gap: '16px' }}>
                <Spinner size={40} color="purple-light" />
                <p style={{ color: 'var(--text-secondary)' }}>Analyzing workflow semantics...</p>
              </div>
            ) : error ? (
              <div style={{ backgroundColor: 'color-mix(in srgb, var(--red) 10%, transparent)', border: '1px solid var(--red)', borderRadius: '8px', padding: '24px', color: 'var(--red)', maxWidth: '600px', margin: '0 auto' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '8px' }}>Analysis Failed</h3>
                <p>{error}</p>
              </div>
            ) : !data ? (
              <EmptyState 
                icon="📊" 
                title="Awaiting Input" 
                sub="Describe a process in the sidebar and click Analyze to generate insights." 
              />
            ) : (
              <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                {activeTab === 'Dashboard' && <DashboardTab data={data} />}
                {activeTab === 'Semantic Search' && <SearchTab data={data} />}
                {activeTab === 'ROI' && <ROITab data={data} />}
                {activeTab === 'Recommendations' && <RecommendationsTab data={data} />}
                {activeTab === 'NVIDIA NIM' && <NIMTab data={data} />}
              </div>
            )}
          </div>

          {/* Footer */}
          <footer style={{ padding: '8px 24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-card)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Powered by Llama 3.1 & all-MiniLM-L6-v2
            </div>
            {data && (
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Analyzed {data.word_count} words • Processed at {new Date(data.processed_at).toLocaleTimeString()}
              </div>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
}
