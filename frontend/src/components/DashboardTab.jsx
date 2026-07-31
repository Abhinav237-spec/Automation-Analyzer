import React from 'react';
import { Card, ScoreRing, KpiCard, PatternBadge, SectionHeader } from './UI';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const DashboardTab = ({ data }) => {
  if (!data) return null;

  const radarData = [
    { subject: 'Complexity', A: data.scores.complexity },
    { subject: 'Automation', A: data.scores.automation },
    { subject: 'Efficiency', A: data.scores.efficiency }
  ];

  const barData = Object.entries(data.category.scores)
    .map(([name, score]) => ({ name, score: Math.round(score * 100) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const colors = ['#6366f1', '#22d3ee', '#34d399', '#fbbf24', '#f87171']; // hex colors for recharts

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Card glow>
        <SectionHeader icon="📊" title="Process Intelligence Scores" sub="Key metrics evaluating your workflow" />
        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
          <ScoreRing value={data.scores.complexity} label="Complexity" color="red" />
          <ScoreRing value={data.scores.automation} label="Automation" color="green" />
          <ScoreRing value={data.scores.efficiency} label="Efficiency" color="cyan" />
        </div>
      </Card>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 min-content' }}><KpiCard icon={data.category.icon} label="Category" value={data.category.top} color="purple-light" /></div>
        <div style={{ flex: '1 1 min-content' }}><KpiCard icon="⏱️" label="Weekly Hrs" value={`${data.roi.weekly_hours_saved}h`} color="cyan" /></div>
        <div style={{ flex: '1 1 min-content' }}><KpiCard icon="📅" label="Annual Hrs" value={`${data.roi.annual_hours_saved}h`} color="green" /></div>
        <div style={{ flex: '1 1 min-content' }}><KpiCard icon="💵" label="Saved/Yr" value={`$${data.roi.annual_cost_saved_usd.toLocaleString()}`} color="green" /></div>
        <div style={{ flex: '1 1 min-content' }}><KpiCard icon="👣" label="Est. Steps" value={data.step_estimate} color="amber" /></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <Card>
          <SectionHeader icon="🕸️" title="Score Distribution" />
          <div style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Score" dataKey="A" stroke="var(--purple)" fill="var(--purple)" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <SectionHeader icon="🗂️" title="Category Confidence" />
          <div style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'var(--bg-elevated)' }} contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <SectionHeader icon="🔍" title="Detected Patterns" sub="Friction points identified in your workflow" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {['repetitive_tasks', 'manual_operations', 'approval_bottlenecks', 'communication_delays', 'data_entry_tasks'].map(key => {
            const activeMatch = data.detections.find(d => d.key === key);
            const iconMap = { repetitive_tasks: '🔄', manual_operations: '✋', approval_bottlenecks: '⏳', communication_delays: '📧', data_entry_tasks: '📝' };
            const labelMap = { repetitive_tasks: 'Repetitive Tasks', manual_operations: 'Manual Operations', approval_bottlenecks: 'Approval Bottlenecks', communication_delays: 'Communication Delays', data_entry_tasks: 'Data Entry Tasks' };
            return (
              <PatternBadge 
                key={key} 
                icon={iconMap[key]} 
                label={labelMap[key]} 
                count={activeMatch?.count || 0} 
                active={!!activeMatch} 
              />
            );
          })}
        </div>
        
        {data.detections.length > 0 && (
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '12px' }}>Context Snippets</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.detections.map(d => (
                <div key={d.key} style={{ backgroundColor: 'var(--bg-elevated)', borderLeft: '3px solid var(--purple)', padding: '12px', borderRadius: '4px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--purple-light)', marginBottom: '8px' }}>{d.label}</div>
                  {d.snippets.map((snip, idx) => (
                    <code key={idx} style={{ display: 'block', fontSize: '0.85em', color: 'var(--text-primary)', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>"{snip}"</code>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
