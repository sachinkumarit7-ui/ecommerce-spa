import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { User, Cart, AuthState } from '../types';
import { authService } from '../services/authService';
import { cartService } from '../services/cartService';

interface AppState {
  auth: AuthState;
  cart: Cart;
  loading: boolean;
}

type AppAction = 
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_CART'; payload: Cart }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGOUT' };

const initialState: AppState = {
  auth: {
    user: null,
    isAuthenticated: false
  },
  cart: { items: [], total: 0 },
  loading: false
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        auth: {
          user: action.payload,
          isAuthenticated: action.payload !== null
        }
      };
    case 'SET_CART':
      return {
        ...state,
        cart: action.payload
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'LOGOUT':
      authService.logout();
      return {
        ...state,
        auth: {
          user: null,
          isAuthenticated: false
        }
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Initialize user from localStorage
    const user = authService.getCurrentUser();
    if (user) {
      dispatch({ type: 'SET_USER', payload: user });
    }

    // Initialize cart from localStorage
    const cart = cartService.getCart();
    dispatch({ type: 'SET_CART', payload: cart });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}