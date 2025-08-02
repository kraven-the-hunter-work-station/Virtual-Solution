import { AxiosResponse } from 'axios';

// Contact form data interface
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}

// User credentials interface
export interface UserCredentials {
  email: string;
  password: string;
}

// User registration data interface
export interface UserRegistrationData {
  name: string;
  email: string;
  password: string;
}

// Response interfaces
export interface ApiResponse {
  success: boolean;
  message: string;
}

export interface AuthResponse extends ApiResponse {
  token?: string;
  user?: any;
}

// Declare the API functions
export function submitContactForm(formData: ContactFormData): Promise<ApiResponse>;
export function loginUser(credentials: UserCredentials): Promise<AuthResponse>;
export function registerUser(userData: UserRegistrationData): Promise<AuthResponse>;
