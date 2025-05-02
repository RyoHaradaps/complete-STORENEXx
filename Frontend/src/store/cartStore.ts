import { create } from 'zustand';
import { Product } from '@/types/product';
import { CartItem } from '@/types/cart';

interface CartStore {
  cart: CartItem[];
  latestAddedProduct: Product | null;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  clearLatestAddedProduct: () => void; // <-- ADD this
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  latestAddedProduct: null,
  
  addToCart: (product: Product, quantity = 1) => {
    set(state => {
      const currentCart = [...state.cart];
      const existingItemIndex = currentCart.findIndex(
        item => item.product.id === product.id
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity if product already in cart
        currentCart[existingItemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        currentCart.push({ product, quantity });
      }
      
      return { 
        cart: currentCart,
        latestAddedProduct: product
      };
    });
  },
  
  removeFromCart: (productId: string) => {
    set(state => ({
      cart: state.cart.filter(item => item.product.id !== productId)
    }));
  },
  
  updateCartItem: (productId: string, quantity: number) => {
    set(state => {
      const currentCart = [...state.cart];
      const itemIndex = currentCart.findIndex(
        item => item.product.id === productId
      );
      
      if (itemIndex >= 0) {
        currentCart[itemIndex].quantity = quantity;
      }
      
      return { cart: currentCart };
    });
  },
  
  clearCart: () => {
    set({ cart: [] });
  },
  
  getCartTotal: () => {
    return get().cart.reduce(
      (total, item) => total + (item.product.price * item.quantity), 
      0
    );
  },

  clearLatestAddedProduct: () => {
    set({ latestAddedProduct: null }); // <-- CLEAR latest added product
  }
}));
