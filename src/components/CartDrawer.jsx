"use client";

import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '@/store/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/formatters';

export default function CartDrawer({ isOpen, onClose }) {
  const cartItems = useCartStore((state) => state.cartItems);
  const cartTotal = useCartStore((state) => state.getCartTotal());
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 cursor-pointer bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-surface shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-surface-container-highest bg-surface-container-low p-6">
              <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
                Your Basket
              </h2>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-surface-container-highest"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-grow space-y-6 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-on-surface-variant opacity-60">
                  <span className="material-symbols-outlined mb-4 text-6xl" style={{ fontVariationSettings: "'FILL' 0" }}>production_quantity_limits</span>
                  <p className="font-serif text-lg font-bold">Your basket is empty</p>
                  <p className="text-sm">Time to start filling it up!</p>
                  <button onClick={onClose} className="mt-6 font-bold text-primary hover:underline">Continue Shopping</button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.product._id} className="flex gap-4">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-surface-container">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" unoptimized />
                      </div>
                      <div className="flex flex-grow flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-serif font-bold text-on-surface">{item.product.name}</h3>
                            <p className="text-xs text-on-surface-variant">{item.product.category}</p>
                          </div>
                          <button onClick={() => removeFromCart(item.product._id)} className="text-on-surface-variant transition-colors hover:text-error">
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center rounded-full bg-surface-container px-2 py-1">
                            <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)} className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-primary hover:bg-primary/20">-</button>
                            <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)} className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-primary hover:bg-primary/20">+</button>
                          </div>
                          <span className="font-serif font-bold text-primary">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-surface-container-highest bg-surface-container-low p-6">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-bold text-on-surface-variant">Subtotal</span>
                  <span className="font-serif text-2xl font-bold text-primary">{formatPrice(cartTotal)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-lg font-bold text-on-primary shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-95"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                  Secure Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
