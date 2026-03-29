"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '@/store/useCartStore';
import { formatPrice } from '@/lib/formatters';
import toast from 'react-hot-toast';

export default function CartClient({ session }) {
  const cartItems = useCartStore((state) => state.cartItems);
  const cartTotal = useCartStore((state) => state.getCartTotal());
  const cartCount = useCartStore((state) => state.getCartCount());
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!session) {
      window.location.href = `/login?callbackUrl=${encodeURIComponent('/cart')}`;
      return;
    }

    setIsCheckingOut(true);
    try {
      // Simulate checkout process
      await new Promise(resolve => setTimeout(resolve, 1000));
      window.location.href = '/checkout';
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleRemoveItem = (productId, productName) => {
    removeFromCart(productId);
    toast.success(`${productName} removed from bag`);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-6 pb-16 pt-24">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="material-symbols-outlined mb-4 text-6xl text-primary opacity-50">
              shopping_bag
            </span>
            <h1 className="mb-4 font-serif text-3xl font-bold text-on-surface">Your bag is empty</h1>
            <p className="mb-8 text-on-surface-variant">Looks like you haven't added any items yet.</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-on-primary shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-95"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 pb-16 pt-24">
      <div className="mb-8">
        <h1 className="mb-2 font-serif text-3xl font-bold text-on-surface">Shopping Bag</h1>
        <p className="text-on-surface-variant">
          {cartCount} {cartCount === 1 ? 'item' : 'items'} in your bag
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.product._id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="rounded-2xl border border-surface-container-highest bg-white p-6 shadow-sm"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-surface-container">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-grow flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-on-surface">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-on-surface-variant">{item.product.category}</p>
                        <p className="mt-2 font-serif text-lg font-bold text-primary">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      {/* Quantity and Remove Controls */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center rounded-full bg-surface-container px-2 py-1">
                          <button
                            onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-primary hover:bg-primary/20 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-on-surface">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-primary hover:bg-primary/20 transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(item.product._id, item.product.name)}
                          className="text-on-surface-variant transition-colors hover:text-error"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-surface-container-highest bg-surface-container-low p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="mb-6 font-serif text-xl font-bold text-on-surface">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Subtotal ({cartCount} items)</span>
                <span className="font-medium text-on-surface">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Shipping</span>
                <span className="font-medium text-on-surface">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Tax</span>
                <span className="font-medium text-on-surface">Calculated at checkout</span>
              </div>
            </div>

            <div className="mb-6 border-t border-surface-container-highest pt-4">
              <div className="flex justify-between">
                <span className="font-serif text-lg font-bold text-on-surface">Total</span>
                <span className="font-serif text-lg font-bold text-primary">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut || cartItems.length === 0}
              className="w-full rounded-xl bg-primary py-4 font-bold text-on-primary shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isCheckingOut ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined animate-spin">loading</span>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">lock</span>
                  Proceed to Checkout
                </span>
              )}
            </button>

            <div className="mt-4 text-center">
              <Link
                href="/shop"
                className="text-sm text-primary hover:underline transition-colors"
              >
                Continue Shopping
              </Link>
            </div>

            <div className="mt-6 rounded-xl bg-primary-fixed/10 p-4">
              <div className="flex items-center gap-2 text-sm text-on-primary-container">
                <span className="material-symbols-outlined text-primary">security</span>
                <span>Secure checkout powered by Threaded Life</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
