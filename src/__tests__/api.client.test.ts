import axios from 'axios';
import { apiClient } from '../services/api/client';

describe('API Client', () => {
  test('should have axios instance', () => {
    expect(apiClient).toBeDefined();
  });

  test('should have request interceptor', () => {
    expect(apiClient.interceptors.request).toBeDefined();
  });

  test('should have response interceptor', () => {
    expect(apiClient.interceptors.response).toBeDefined();
  });

  test('should have baseURL set to freeapi', () => {
    expect(apiClient.defaults.baseURL).toBe('https://api.freeapi.app');
  });

  test('should have timeout set to 10000ms', () => {
    expect(apiClient.defaults.timeout).toBe(10000);
  });
});
