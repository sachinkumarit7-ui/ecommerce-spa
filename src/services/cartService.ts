import type { CartItem, Product, Cart } from '../types';

class CartService {
  private readonly CART_KEY = 'ecommerce_cart';

  getCart(): Cart {
    const cartStr = localStorage.getItem(this.CART_KEY);
    if (!cartStr) {
      return { items: [], total: 0 };
    }

    try {
      const cart = JSON.parse(cartStr);
      return {
        items: cart.items || [],
        total: this.calculateTotal(cart.items || [])
      };
    } catch {
      return { items: [], total: 0 };
    }
  }

  addToCart(product: Product, quantity: number = 1): Cart {
    const cart = this.getCart();
    const existingItemIndex = cart.items.findIndex(item => item.product.id === product.id);

    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }

    cart.total = this.calculateTotal(cart.items);
    this.saveCart(cart);
    return cart;
  }

  removeFromCart(productId: string): Cart {
    const cart = this.getCart();
    cart.items = cart.items.filter(item => item.product.id !== productId);
    cart.total = this.calculateTotal(cart.items);
    this.saveCart(cart);
    return cart;
  }

  updateQuantity(productId: string, quantity: number): Cart {
    const cart = this.getCart();
    const itemIndex = cart.items.findIndex(item => item.product.id === productId);

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
    }

    cart.total = this.calculateTotal(cart.items);
    this.saveCart(cart);
    return cart;
  }

  clearCart(): Cart {
    const emptyCart = { items: [], total: 0 };
    this.saveCart(emptyCart);
    return emptyCart;
  }

  private calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  private saveCart(cart: Cart): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }

  getCartItemCount(): number {
    const cart = this.getCart();
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  }
}

export const cartService = new CartService();