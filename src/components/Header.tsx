import { ShoppingCart, User, LogOut, Store } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { cartService } from '../services/cartService';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  const { state, dispatch } = useAppContext();
  const cartItemCount = cartService.getCartItemCount();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    onViewChange('login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onViewChange('products')}
          >
            <Store className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">ShopEase</span>
          </div>

          {/* Navigation */}
          {state.auth.isAuthenticated && (
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => onViewChange('products')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'products'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => onViewChange('cart')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                  currentView === 'cart'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center space-x-1">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Cart</span>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </div>
              </button>
            </nav>
          )}

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {state.auth.isAuthenticated ? (
              <>
                {/* Mobile Cart Button */}
                <button
                  onClick={() => onViewChange('cart')}
                  className="md:hidden relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700 hidden sm:block">
                      {state.auth.user?.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={() => onViewChange('login')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentView === 'login'
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => onViewChange('signup')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentView === 'signup'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}