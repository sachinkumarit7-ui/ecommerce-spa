
export interface User {
  id: string;
  email: string;
  name: string;
  token: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface FilterOptions {
  category: string;
  minPrice: number;
  maxPrice: number;
  searchTerm: string;
}