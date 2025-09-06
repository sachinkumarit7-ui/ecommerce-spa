import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { cartService } from '../services/cartService';

export function Cart() {
  const { state, dispatch } = useAppContext();
  const { cart } = state;

  const updateQuantity = (productId: string, quantity: number) => {
    const updatedCart = cartService.updateQuantity(productId, quantity);
    dispatch({ type: 'SET_CART', payload: updatedCart });
  };

  const removeItem = (productId: string) => {
    const updatedCart = cartService.removeFromCart(productId);
    dispatch({ type: 'SET_CART', payload: updatedCart });
  };

  const clearCart = () => {
    const updatedCart = cartService.clearCart();
    dispatch({ type: 'SET_CART', payload: updatedCart });
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-gray-600">Start shopping to add items to your cart</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-1">
              {cart.items.length} item{cart.items.length !== 1 ? 's' : ''} in your cart
            </p>
          </div>
          {cart.items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Clear Cart
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Cart Items */}
          <div className="divide-y divide-gray-200">
            {cart.items.map((item) => (
              <div key={item.product.id} className="p-6">
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-20 h-20">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.product.description}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {item.product.category}
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        ${item.product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-50 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4 text-gray-600" />
                      </button>
                      <span className="px-3 py-2 text-sm font-medium text-gray-900 min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-900">Subtotal:</span>
              <span className="text-lg font-bold text-gray-900">{cart.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">Shipping:</span>
              <span className="text-sm text-green-600 font-medium">Free</span>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Total:</span>
                <span className="text-xl font-bold text-blue-600">${cart.total.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}