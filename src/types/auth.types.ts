export interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email?: string;
  username?: string;
  password?: string;
}

export interface RegisterCredentials {
  email?: string;
  username?: string;
  password?: string;
}