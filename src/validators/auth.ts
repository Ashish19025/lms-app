import { z } from 'zod';

// Validation schema for login form, ensuring that the identifier (username or email) is provided and that the password meets minimum length requirements
export const loginSchema = z.object({
  identifier: z.string().min(1, 'Username or email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Type definition for the login form data, inferred from the login validation schema to ensure type safety and consistency across the application
export type LoginSchema = z.infer<typeof loginSchema>;

// Validation schema for registration form, ensuring that the username, email, and password meet specific requirements for account creation
export const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
