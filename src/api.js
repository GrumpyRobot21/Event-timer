import axios from 'axios';
import { useAuth } from './components/AuthContext';

const api = axios.create({
  baseURL: 'https://eventtimerdb.herokuapp.com',
});

api.interceptors.request.use(
  async (config) => {
    const { isAuthenticated, getAccessToken, refreshToken } = useAuth();
    if (isAuthenticated()) {
      const accessToken = getAccessToken();
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.refresh) {
        try {
          await refreshToken();
          const accessToken = getAccessToken();
          config.headers.Authorization = `Bearer ${accessToken}`;
        } catch (error) {
          console.error('Token refresh error:', error);
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;