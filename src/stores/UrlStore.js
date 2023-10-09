import { makeAutoObservable } from 'mobx';
import { redirectPage, shortenUrl } from '../api/url';
import authStore from './AuthStore';

class UrlStore {
  constructor() {
    makeAutoObservable(this);
  }

  async generateShortUrl(original_url) {
    try {
      const url = await shortenUrl(original_url, authStore.token);
      return url;
    } catch (error) {
      throw error;
    }
  }

  async redirect(short_url) {
    try {
      const originalUrl = await redirectPage(short_url, authStore.token);
      return originalUrl;
    } catch (error) {
      throw error;
    }
  }
}

const urlStore = new UrlStore();
export default urlStore;
 