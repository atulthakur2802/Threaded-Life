"use client";

import Image from 'next/image';
import Link from 'next/link';
import useCartStore from '@/store/useCartStore';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { formatPrice } from '@/lib/formatters';

export default function ProductCard({ product, index = 0 }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success(`Added ${product.name} to cart!`, {
      style: {
        background: '#875763',
        color: '#fff',
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.4 }}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm"
    >
      <Link href={`/shop/${product._id}`} className="relative block aspect-square overflow-hidden">
        <Image
          src={product.image || 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          unoptimized
        />
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 shadow-sm backdrop-blur-md">
          <span className="material-symbols-outlined text-sm text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="text-xs font-bold">{Number(product.rating).toFixed(1)}</span>
        </div>
      </Link>

      <div className="p-5">
        <p className="mb-1 text-xs font-serif uppercase tracking-widest text-primary">{product.category}</p>
        <Link href={`/shop/${product._id}`} className="block">
          <h3 className="font-serif text-lg font-bold text-on-surface transition-colors group-hover:text-primary">{product.name}</h3>
        </Link>

        <div className="mt-4 flex items-center justify-between gap-4">
          <span className="font-serif text-xl font-bold text-on-surface">{formatPrice(product.price)}</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-on-primary transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">shopping_cart</span>
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}
