import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      
      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.cartItems.find(item => item.product._id === product._id);
          if (existingItem) {
            return {
              cartItems: state.cartItems.map(item =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { cartItems: [...state.cartItems, { product, quantity, price: product.price }] };
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cartItems: state.cartItems.filter(item => item.product._id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          cartItems: state.cartItems.map(item =>
            item.product._id === productId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ cartItems: [] });
      },

      getCartTotal: () => {
        return get().cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getCartCount: () => {
        return get().cartItems.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'threaded-life-cart',
    }
  )
);

export default useCartStore;
