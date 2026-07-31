import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 90000,
});

export const analyzeWorkflow = async (workflow, nvidiaKey, useNim) => {
  const response = await api.post('/analyze', {
    workflow,
    nvidia_api_key: nvidiaKey,
    use_nim: useNim
  });
  return response.data;
};

export const searchWorkflows = async (query, topK = 5) => {
  const response = await api.post('/search', {
    query,
    top_k: topK
  });
  return response.data;
};

export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};
