"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import useCartStore from '@/store/useCartStore';
import { motion } from 'framer-motion';

export default function FloatingActions() {
  const cartCount = useCartStore((state) => state.getCartCount());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="fixed bottom-6 right-6 z-40 flex flex-col gap-3"
    >
      <Link href="/cart" className="group relative rounded-full bg-white/50 p-4 text-rose-900 shadow-2xl shadow-rose-900/10 backdrop-blur-lg transition-transform duration-150 hover:rotate-3 hover:scale-110 active:scale-90">
        <span className="material-symbols-outlined" data-icon="shopping_basket">shopping_basket</span>
        {isHydrated && cartCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
            {cartCount}
          </span>
        )}
      </Link>
      <Link href="/contact" className="group relative rounded-full bg-rose-900 p-4 text-white shadow-2xl shadow-rose-900/10 transition-transform duration-150 hover:rotate-3 hover:scale-110 active:scale-90">
        <span className="material-symbols-outlined" data-icon="chat_bubble">chat_bubble</span>
        <span className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-rose-100 px-3 py-1 text-xs font-serif text-rose-950 opacity-0 transition-opacity group-hover:opacity-100">Chat with us</span>
      </Link>
    </motion.div>
  );
}

