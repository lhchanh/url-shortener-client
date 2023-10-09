import axios from 'axios';
import { signIn } from '../api/auth';
import { toast } from 'react-toastify';

class AuthService {
  async login(email, password) {
    try {
      const token = await signIn(email, password);
      this.setAuthToken(token);
      return token;
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      throw error;
    }
  }

  logout() {
    this.removeAuthToken();
  }

  setAuthToken(token) {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  removeAuthToken() {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }

  getAuthToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return !!this.getAuthToken();
  }
}

export default new AuthService();
