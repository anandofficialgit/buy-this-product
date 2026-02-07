// API service factory that chooses between real API and client API based on environment

import { apiService, User, ApiResponse, SignupRequest, LoginRequest } from './api';
import { clientApiService } from './clientApi';

// Check if we're in production (GitHub Pages) or development
const isProduction = import.meta.env.PROD;
const hasBackend = !isProduction && typeof window !== 'undefined' && window.location.hostname === 'localhost';

// Create a unified API service interface
interface ApiServiceInterface {
  signup(userData: SignupRequest): Promise<ApiResponse<User>>;
  login(credentials: LoginRequest): Promise<ApiResponse<User>>;
  getAllUsers(): Promise<ApiResponse<User[]>>;
}

// Choose the appropriate API service
const selectedApiService: ApiServiceInterface = hasBackend ? apiService : clientApiService;

export { selectedApiService as apiService };
export type { User, ApiResponse, SignupRequest, LoginRequest };
