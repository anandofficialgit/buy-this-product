// Client-side API service for GitHub Pages deployment

export interface User {
  name: string;
  mobileNumber: string;
  username: string;
  password?: string; // Optional for responses
  createdAt?: string; // Optional for responses
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

class ClientApiService {
  private storageKey = 'buy-this-product-users';
  
  private getUsers(): User[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
  
  private saveUsers(users: User[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(users));
    } catch (error) {
      console.error('Failed to save users:', error);
    }
  }

  async signup(userData: SignupRequest): Promise<ApiResponse<User>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          // Validation
          if (!userData.name || !userData.mobileNumber || !userData.username || !userData.password) {
            resolve({
              success: false,
              message: 'All fields are required'
            });
            return;
          }

          // Mobile number validation
          const mobileRegex = /^[6-9][0-9]{9}$/;
          if (!mobileRegex.test(userData.mobileNumber)) {
            resolve({
              success: false,
              message: 'Mobile number must be exactly 10 digits and start with 6, 7, 8, or 9'
            });
            return;
          }

          const users = this.getUsers();
          
          // Check for existing username or mobile number
          const existingUser = users.find(u => u.username === userData.username || u.mobileNumber === userData.mobileNumber);
          if (existingUser) {
            resolve({
              success: false,
              message: 'Username or mobile number already exists'
            });
            return;
          }

          // Create new user
          const newUser: User = {
            ...userData,
            createdAt: new Date().toISOString()
          };

          // Save user
          users.push(newUser);
          this.saveUsers(users);

          // Return success response (without password)
          const { password: _, ...userWithoutPassword } = newUser;
          
          resolve({
            success: true,
            message: 'Account created successfully!',
            data: userWithoutPassword
          });

        } catch (error) {
          resolve({
            success: false,
            message: 'Failed to create account: ' + (error instanceof Error ? error.message : 'Unknown error')
          });
        }
      }, 500); // Simulate network delay
    });
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<User>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          if (!credentials.username || !credentials.password) {
            resolve({
              success: false,
              message: 'Username and password are required'
            });
            return;
          }

          const users = this.getUsers();
          const user = users.find(u => u.username === credentials.username && u.password === credentials.password);
          
          if (!user) {
            resolve({
              success: false,
              message: 'Invalid username or password'
            });
            return;
          }

          // Return user without password
          const { password: _, ...userWithoutPassword } = user;
          
          resolve({
            success: true,
            message: 'Login successful!',
            data: userWithoutPassword
          });

        } catch (error) {
          resolve({
            success: false,
            message: 'Login failed: ' + (error instanceof Error ? error.message : 'Unknown error')
          });
        }
      }, 500); // Simulate network delay
    });
  }

  async getAllUsers(): Promise<ApiResponse<User[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const users = this.getUsers();
          // Remove passwords from response
          const usersWithoutPasswords = users.map(({ password, ...user }) => user);
          
          resolve({
            success: true,
            message: 'Users retrieved successfully',
            data: usersWithoutPasswords
          });

        } catch (error) {
          resolve({
            success: false,
            message: 'Failed to retrieve users: ' + (error instanceof Error ? error.message : 'Unknown error')
          });
        }
      }, 300); // Simulate network delay
    });
  }
}

export const clientApiService = new ClientApiService();
