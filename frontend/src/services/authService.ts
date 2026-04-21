import { api } from '../lib/api';

export const authService = {
  login: async (credentials: any) => {
    const response = await api.post('/auth/login', credentials);
    const { accessToken, refreshToken, user } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId', user.id);
    localStorage.setItem('userRole', user.role);
    return response.data;
  },

  register: async (data: any) => {
    const response = await api.post('/auth/register', data);
    const { accessToken, refreshToken, user } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId', user.id);
    localStorage.setItem('userRole', user.role);
    return response.data;
  },

logout: () => {
  localStorage.clear();

  // IMPORTANT: clean redirect
  window.location.replace('/login');
},

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};
