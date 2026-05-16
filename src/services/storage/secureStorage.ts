import * as SecureStore from 'expo-secure-store';

// Key used to store the access token in secure storage, ensuring that sensitive authentication data is protected and not accessible to unauthorized parties
const TOKEN_KEY = 'auth_token';
// Key used to store user data in secure storage, ensuring that personal information is protected and not accessible to unauthorized parties
const USER_KEY = 'auth_user';

// Refresh token key
export const saveToken = async (token: string) => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

// Function to retrieve the access token from secure storage, allowing the app to include it in API requests for authentication
export const getToken = async () => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

// Function to remove the access token from secure storage, effectively logging the user out and preventing further authenticated API requests
export const removeToken = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};

// User data helpers
export const saveUser = async (user: any) => {
  await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
};

// Function to retrieve the user data from secure storage, allowing the app to access user information such as username and email for display and personalization
export const getUser = async () => {
  // Retrieve the user data from secure storage, parse it from JSON, and return it as an object. If no user data is found, return null.
  const userStr = await SecureStore.getItemAsync(USER_KEY);
  // If user data is found, parse it from JSON and return it. Otherwise, return null to indicate that no user is currently logged in.
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

// Function to remove the user data from secure storage, effectively clearing any stored user information and ensuring that the app does not retain any personal data after logout
export const removeUser = async () => {
  await SecureStore.deleteItemAsync(USER_KEY);
};

// Refresh token helpers
const REFRESH_KEY = 'refresh_token';

// Function to save the refresh token in secure storage, allowing the app to use it for obtaining new access tokens when the current access token expires
export const saveRefreshToken = async (token: string) => {
  try {
    // Save the refresh token securely using Expo's SecureStore, which provides encrypted storage for sensitive data. This allows the app to maintain user sessions without requiring them to log in again frequently, while also ensuring that the refresh token is protected from unauthorized access.
    await SecureStore.setItemAsync(REFRESH_KEY, token);
  } catch (e) {
    console.error('Failed to save refresh token', e);
  }
};

// Function to retrieve the refresh token from secure storage, allowing the app to use it for obtaining new access tokens when the current access token expires
export const getRefreshToken = async () => {
  try {
    // Retrieve the refresh token from secure storage, which is necessary for maintaining user sessions and allowing the app to obtain new access tokens without requiring the user to log in again. If the refresh token is not found, this function will return null, indicating that the user may need to log in again to obtain a new refresh token.
    return await SecureStore.getItemAsync(REFRESH_KEY);
  } catch (e) {
    console.error('Failed to read refresh token', e);
    return null;
  }
};


// Function to remove the refresh token from secure storage, effectively clearing any stored refresh token and ensuring that the app does not retain any sensitive authentication data after logout
export const removeRefreshToken = async () => {
  try {
    // Remove the refresh token from secure storage, which is an important step in the logout process to ensure that the app does not retain any sensitive authentication data that could potentially be used to gain unauthorized access to the user's account. This helps to protect the user's security and privacy by ensuring that all authentication tokens are properly cleared when they log out.
    await SecureStore.deleteItemAsync(REFRESH_KEY);
  } catch (e) {
    console.error('Failed to remove refresh token', e);
  }
};