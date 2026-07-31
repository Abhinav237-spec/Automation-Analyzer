import { useState } from 'react';
import { analyzeWorkflow } from '../utils/api';

export const useAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const analyze = async (workflow, nvidiaKey, useNim) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeWorkflow(workflow, nvidiaKey, useNim);
      setData(result);
      setActiveTab('Dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || err.message || 'An error occurred during analysis.');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    data,
    error,
    activeTab,
    setTab: setActiveTab,
    analyze
  };
};
