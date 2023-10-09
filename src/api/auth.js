import axios from 'axios';
import { BASE_URL } from '../common/constants';

export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth`, { email, password });
    return response.data.token;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const signUp = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/signup`, { email, password });
    return response.data.token;
  } catch (error) {
    throw error.response.data.error;
  }
};
