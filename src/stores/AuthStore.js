import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { signIn } from '../api/auth';

class AuthStore {
  token = '';

  constructor() {
    makeAutoObservable(this);
  }

  async login(email, password) {
    try {
      const token = await signIn(email, password);
      this.setAuthToken(token);
      return token;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    this.removeAuthToken();
  }

  setAuthToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  removeAuthToken() {
    this.token = '';
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }

  get isAuthenticated() {
    return !!this.token;
  }

  getAuthToken() {
    this.token = localStorage.getItem('token');
    return this.token;
  }
}

const authStore = new AuthStore();
export default authStore;
