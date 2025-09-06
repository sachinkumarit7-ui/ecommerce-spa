import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { AppProvider, useAppContext } from './context/AppContext';

function AppContent() {
  const { state } = useAppContext();
  const [currentView, setCurrentView] = useState<string>('login');

  useEffect(() => {
    // Set initial view based on authentication status
    if (state.auth.isAuthenticated) {
      setCurrentView('products');
    } else {
      setCurrentView('login');
    }
  }, [state.auth.isAuthenticated]);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'signup':
        return <Signup onViewChange={setCurrentView} />;
      case 'products':
        return state.auth.isAuthenticated ? <ProductList /> : <Login onViewChange={setCurrentView} />;
      case 'cart':
        return state.auth.isAuthenticated ? <Cart /> : <Login onViewChange={setCurrentView} />;
      default:
        return <Login onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <main>
        {renderCurrentView()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
