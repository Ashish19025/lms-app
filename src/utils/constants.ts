// Backend base URL. Set EXPO_PUBLIC_API_URL in .env.local; falls back to the public FreeAPI server.
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.freeapi.app';
