import type { User } from '../types';

class AuthService {
  private readonly TOKEN_KEY = 'ecommerce_token';
  private readonly USER_KEY = 'ecommerce_user';

  // Mock users database
  private users = [
    { id: '1', email: 'user@example.com', password: 'password123', name: 'sachin' },
    { id: '2', email: 'admin@example.com', password: 'admin123', name: 'Admin User' }
  ];

  generateToken(): string {
    return 'jwt_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }

  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = this.users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    const token = this.generateToken();
    const authUser: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      token
    };

    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authUser));

    return { success: true, user: authUser };
  }

  async signup(email: string, password: string, name: string): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (this.users.find(u => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }

    const newUser = {
      id: (this.users.length + 1).toString(),
      email,
      password,
      name
    };

    this.users.push(newUser);

    const token = this.generateToken();
    const authUser: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      token
    };

    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authUser));

    return { success: true, user: authUser };
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  getCurrentUser(): User | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const userStr = localStorage.getItem(this.USER_KEY);

    if (!token || !userStr) {
      return null;
    }

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}

export const authService = new AuthService();