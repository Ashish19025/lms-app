export const API_URL = 'https://api.freeapi.app/api/v1';

/**
 * STORAGE_KEYS - A collection of keys used for storing various types of data in secure storage and async storage, including authentication tokens, user data, and bookmarked courses. 
 * These keys help to ensure that sensitive information is stored securely and can be easily accessed when needed throughout the app.
 */
export const STORAGE_KEYS = {
  TOKEN: '@auth_token',
  USER: '@auth_user',
  BOOKMARKS: '@bookmarks',
};

/**
 * COLORS - A centralized object that defines the color palette used throughout the app, including primary and secondary colors, background color, text colors, and colors for error and success states. 
 * This allows for consistent styling across the app and makes it easier to maintain and update the color scheme in the future.
 */
export const COLORS = {
  primary: '#2563EB',
  secondary: '#1E40AF',
  background: '#F9FAFB',
  text: '#111827',
  textSecondary: '#6B7280',
  error: '#EF4444',
  success: '#10B981',
};