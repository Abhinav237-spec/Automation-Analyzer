import React from 'react';
import { useAnalysis } from './hooks/useAnalysis';
import { InputSidebar } from './components/InputSidebar';
import { DashboardTab } from './components/DashboardTab';
import { SearchTab, ROITab, RecommendationsTab, NIMTab } from './components/ResultTabs';
import { Spinner, EmptyState } from './components/UI';
import { Activity, BrainCircuit, CircleDot, Sparkles } from 'lucide-react';

export default function App() {
  const { loading, data, error, activeTab, setTab, analyze } = useAnalysis();

  const tabs = ['Dashboard', 'Semantic Search', 'ROI', 'Recommendations', 'NVIDIA NIM'];

  return (
    <div className="app-shell">
      <div className="ambient-scene" aria-hidden="true">
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="signal-core"><i /><i /><i /><span /></div>
        <div className="floating-cube cube-a"><b /><b /><b /><b /><b /><b /></div>
        <div className="data-plane" />
      </div>
      {/* Header */}
      <header className="app-header">
        <div className="brand-lockup">
          <span className="brand-mark"><BrainCircuit size={22} /></span>
          <div>
            <h1 className="brand-name">Autopsy AI</h1>
            <p className="brand-subtitle">Process intelligence workspace</p>
          </div>
        </div>
        <div className="header-meta">
          <span className="system-status"><CircleDot size={13} /> Models ready</span>
          <span className="header-chip"><Activity size={13} /> Explainable AI</span>
          <span className="header-chip"><Sparkles size={13} /> NIM enhanced</span>
        </div>
      </header>

      {/* Main Layout */}
      <div className="app-workspace">
        {/* Sidebar */}
        <div className="input-rail">
          <InputSidebar onAnalyze={analyze} loading={loading} />
        </div>

        {/* Content Area */}
        <div className="results-workspace">
          {/* Tabs */}
          <div className="tab-bar" role="tablist" aria-label="Analysis results">
            {tabs.map(tab => {
              const isActive = activeTab === tab;
              const isDisabled = !data;
              return (
                <button
                  key={tab}
                  onClick={() => !isDisabled && setTab(tab)}
                  disabled={isDisabled}
                  style={{
                    padding: '15px 18px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: isActive ? 'var(--purple-light)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'rgba(136, 117, 255, 0.09)' : 'transparent',
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
          <div className="results-scroll">
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
          <footer className="app-footer">
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
