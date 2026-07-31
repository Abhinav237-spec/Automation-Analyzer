import React from 'react';
import { Card, Badge, SectionHeader, ConfidenceStars } from './UI';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const SearchTab = ({ data }) => {
  if (!data?.similar_workflows) return null;
  const colors = ['purple', 'cyan', 'green'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Card>
        <SectionHeader icon="🧠" title="Semantic Search Results" sub="Matched via all-MiniLM-L6-v2 embeddings" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {data.similar_workflows.map((wf, idx) => {
            const color = colors[idx % colors.length];
            return (
              <div key={idx} style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '16px', backgroundColor: 'var(--bg-elevated)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>{wf.name}</h3>
                    <Badge color={color}>{wf.category}</Badge>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: `var(--${color})` }}>{wf.similarity_pct}%</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Similarity</div>
                  </div>
                </div>
                
                <div style={{ height: '4px', width: '100%', backgroundColor: 'var(--bg-base)', borderRadius: '9999px', marginBottom: '16px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${wf.similarity_pct}%`, backgroundColor: `var(--${color})`, transition: 'width 1s ease-out' }} />
                </div>
                
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
                  {wf.description}
                </p>
                
                <div>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px', textTransform: 'uppercase' }}>Automation Tips</h4>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {wf.automation_tips.map((tip, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export const ROITab = ({ data }) => {
  if (!data?.roi) return null;
  const { roi } = data;

  const Metric = ({ icon, label, value, color }) => (
    <div style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{ fontSize: '2rem' }}>{icon}</div>
      <div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>{label}</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: `var(--${color})` }}>{value}</div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Card>
        <SectionHeader icon="💰" title="Return on Investment" sub="Estimated savings based on industry averages ($50/hr)" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <Metric icon="⏱️" label="Weekly Hours Saved" value={`${roi.weekly_hours_saved}h`} color="cyan" />
          <Metric icon="📅" label="Monthly Hours Saved" value={`${roi.monthly_hours_saved}h`} color="purple-light" />
          <Metric icon="🏆" label="Annual Hours Saved" value={`${roi.annual_hours_saved}h`} color="green" />
          <Metric icon="💵" label="Annual Cost Saved" value={`$${roi.annual_cost_saved_usd.toLocaleString()}`} color="green" />
          <Metric icon="🛠️" label="Est. Implementation" value={`${roi.implementation_weeks} weeks`} color="amber" />
          <Metric icon="📈" label="Breakeven Time" value={`${roi.breakeven_months} months`} color="purple" />
        </div>

        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>Savings Breakdown</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {roi.breakdown.map((item, i) => (
              <div key={i} style={{ backgroundColor: 'var(--bg-elevated)', borderLeft: '3px solid var(--green)', padding: '12px 16px', borderRadius: '4px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <ReactMarkdown>{item}</ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export const RecommendationsTab = ({ data }) => {
  if (!data?.recommendations) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Card>
        <SectionHeader icon="💡" title="AI Recommendations" sub="Explainable AI (XAI) driven action plan" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {data.recommendations.map((rec, i) => (
            <div key={i} style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ padding: '16px', backgroundColor: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{rec.title}</h3>
                <Badge color={rec.effort === 'Low' ? 'green' : rec.effort === 'Medium' ? 'amber' : 'red'}>
                  {rec.effort} Effort
                </Badge>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', backgroundColor: 'var(--border)' }}>
                <div style={{ backgroundColor: 'var(--bg-card)', padding: '16px', borderTop: '2px solid var(--purple)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>Why Generated</div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{rec.why}</p>
                </div>
                <div style={{ backgroundColor: 'var(--bg-card)', padding: '16px', borderTop: '2px solid var(--green)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>Expected Impact</div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{rec.impact}</p>
                </div>
              </div>
              
              <div style={{ padding: '16px', backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '8px' }}>Implementation</div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '16px' }}>{rec.implementation}</p>
                <ConfidenceStars value={rec.confidence} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export const NIMTab = ({ data }) => {
  if (!data?.nim) return null;
  const { nim } = data;

  if (!nim.available) {
    return (
      <Card style={{ textAlign: 'center', padding: '48px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🚀</div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>NVIDIA NIM LLM Analysis</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 24px', lineHeight: 1.6 }}>
          Unlock advanced reasoning with Meta Llama 3.1 70B via NVIDIA NIM. 
          Provide your API key in the sidebar to generate deep contextual insights, 
          bottleneck identification, and strategic roadmaps.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '32px' }}>
          {['Deep Context', 'Strategic Roadmaps', 'Bottleneck Analysis', 'Exec Summaries'].map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--purple-light)', fontSize: '0.875rem' }}>
              <span>✓</span> {f}
            </div>
          ))}
        </div>
        <a 
          href="https://build.nvidia.com" 
          target="_blank" 
          rel="noreferrer"
          style={{ display: 'inline-block', padding: '12px 24px', backgroundColor: 'var(--green)', color: '#000', fontWeight: 600, borderRadius: '8px', textDecoration: 'none' }}
        >
          Get Free API Key
        </a>
      </Card>
    );
  }

  const Section = ({ title, content, color }) => {
    if (!content) return null;
    return (
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
        <div style={{ backgroundColor: `color-mix(in srgb, var(--${color}) 15%, transparent)`, borderBottom: `1px solid color-mix(in srgb, var(--${color}) 30%, transparent)`, padding: '12px 16px' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: `var(--${color})`, textTransform: 'uppercase' }}>{title}</h3>
        </div>
        <div className="markdown-content" style={{ padding: '16px', backgroundColor: 'var(--bg-elevated)' }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <SectionHeader icon="🤖" title="Llama 3.1 70B Analysis" sub="Powered by NVIDIA NIM" />
          <Badge color="green">Connected</Badge>
        </div>
        
        <Section title="Executive Summary" content={nim.executive_summary} color="purple-light" />
        <Section title="Key Bottlenecks" content={nim.bottlenecks} color="red" />
        <Section title="Strategic Recommendations" content={nim.recommendations} color="cyan" />
        <Section title="Implementation Roadmap" content={nim.roadmap} color="amber" />
      </Card>
    </div>
  );
};
