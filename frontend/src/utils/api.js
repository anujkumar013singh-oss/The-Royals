import axios from 'axios';

let baseURL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5001/api');
baseURL = baseURL.replace(/\/+$/, '');
if (!baseURL.endsWith('/api')) baseURL += '/api';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
