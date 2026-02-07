// API service for communicating with Java backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

export interface User {
  name: string;
  mobileNumber: string;
  username: string;
  password?: string; // Optional for responses
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface SignupRequest {
  name: string;
  mobileNumber: string;
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      // Check if response is empty or doesn't contain valid JSON
      const text = await response.text();
      if (!text) {
        return {
          success: false,
          message: 'Server returned empty response. Please check if the backend server is running.',
        };
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        return {
          success: false,
          message: 'Invalid JSON response from server. Please check if the backend server is running correctly.',
        };
      }

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'An error occurred',
          data: data.data,
        };
      }

      return data;
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network error occurred. Please check if the backend server is running.',
      };
    }
  }

  async signup(userData: SignupRequest): Promise<ApiResponse<User>> {
    return this.request<User>('/users/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<User>> {
    return this.request<User>('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getAllUsers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>('/users', {
      method: 'GET',
    });
  }
}

export const apiService = new ApiService();
