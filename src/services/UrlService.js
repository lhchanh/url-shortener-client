import { redirectPage, shortenUrl } from '../api/url';
import AuthService from './AuthService';

class UrlService {
  async generateShortUrl(original_url) {
    try {
      const url = await shortenUrl(original_url, AuthService.getAuthToken());
      return url
    } catch (error) {
      throw error;
    }
  }

  async redirect(short_url) {
    try {
      const originalUrl = await redirectPage(short_url, AuthService.getAuthToken());
      return originalUrl
    } catch (error) {
      throw error;
    }
  }

}

export default new UrlService();
