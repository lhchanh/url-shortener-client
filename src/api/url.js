import axios from 'axios';
import { BASE_URL } from '../common/constants';
import AuthService from '../services/AuthService';

export const shortenUrl = async (originalUrl, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/shorten`,
      { original_url: originalUrl },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.short_url;
  } catch (error) {
    if(error?.response?.data?.error === 'Unauthorized'){
      AuthService.removeAuthToken()
    }
    throw error;
  }
};

export const redirectPage = async (shortUrl, token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/original_url?short_url=${shortUrl}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    
    return response.data.original_url;
  } catch (error) {
    console.log("sgjksgjskgjskgjsg", error)
    throw error;
  }
};
