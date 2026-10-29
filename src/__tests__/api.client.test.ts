import axios from 'axios';
import { apiClient } from '../services/api/client';
import { API_BASE_URL } from '../utils/constants';

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

  test('should have baseURL set from config', () => {
    expect(apiClient.defaults.baseURL).toBe(API_BASE_URL);
  });

  test('should have timeout set to 10000ms', () => {
    expect(apiClient.defaults.timeout).toBe(10000);
  });
});
