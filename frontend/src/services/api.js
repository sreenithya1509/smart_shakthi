import axios from 'axios';
import { storage } from '../utils/storage.js';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response?.data || { message: 'Network error' })
);

export const authApi = {
  signup: (payload) => api.post('/auth/signup', payload),
  login: (payload) => api.post('/auth/login', payload),
  me: () => api.get('/auth/me'),
  updateProfile: (payload) => api.put('/auth/profile', payload),
  logout: () => api.post('/auth/logout')
};

export const contactApi = {
  list: () => api.get('/contacts'),
  create: (payload) => api.post('/contacts', payload),
  update: (id, payload) => api.put(`/contacts/${id}`, payload),
  remove: (id) => api.delete(`/contacts/${id}`),
  alert: (payload) => api.post('/contacts/alert', payload)
};

export const sosApi = {
  trigger: (payload) => api.post('/sos', payload),
  history: () => api.get('/sos'),
  resolve: (id) => api.patch(`/sos/${id}/resolve`)
};

export const locationApi = {
  live: () => api.get('/location/live'),
  update: (payload) => api.post('/location/live', payload)
};

export const activityApi = {
  list: () => api.get('/activity')
};

export const assistantApi = {
  session: () => api.get('/assistant/session'),
  send: (message) => api.post('/assistant/session', { message })
};
