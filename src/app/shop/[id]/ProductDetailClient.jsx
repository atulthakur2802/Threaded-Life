"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import useCartStore from '@/store/useCartStore';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPrice } from '@/lib/formatters';
import Link from 'next/link';

export default function ProductDetailClient({ product }) {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    try {
      addToCart(product, quantity);
      toast.success(`Added ${quantity} ${product.name} to cart!`, {
        style: {
          background: '#875763',
          color: '#fff',
        },
      });
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-screen max-w-7xl px-4 pb-20 pt-24 md:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-on-surface-variant">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-on-surface truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface-container-highest">
              <Image
                src={product.image || 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop'}
                alt={product.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <p className="mb-2 text-sm font-serif uppercase tracking-widest text-primary">
                {product.category}
              </p>
              <h1 className="font-serif text-4xl font-bold text-on-surface md:text-5xl">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 shadow-sm backdrop-blur-md">
                <span className="material-symbols-outlined text-sm text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="text-sm font-bold">{Number(product.rating).toFixed(1)}</span>
              </div>
              <span className="text-sm text-on-surface-variant">
                Handmade with love
              </span>
            </div>

            <div className="text-5xl font-serif font-bold text-primary">
              {formatPrice(product.price)}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-on-surface">Description</h3>
              <p className="text-on-surface-variant leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-on-surface">Quantity:</span>
                <div className="flex items-center rounded-full bg-surface-container-highest px-2 py-1">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="flex h-8 w-8 items-center justify-center rounded-full font-bold text-primary transition-colors hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= 10}
                    className="flex h-8 w-8 items-center justify-center rounded-full font-bold text-primary transition-colors hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full rounded-xl bg-primary py-4 text-lg font-bold text-on-primary shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isAdding ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">sync</span>
                    Adding...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">shopping_cart</span>
                    Add to Cart
                  </>
                )}
              </button>

              <Link
                href="/checkout"
                className="block w-full rounded-xl border-2 border-primary bg-transparent py-4 text-lg font-bold text-primary transition-all hover:bg-primary hover:text-on-surface text-center"
              >
                Buy Now
              </Link>
            </div>

            {/* Product Features */}
            <div className="space-y-4 rounded-xl bg-surface-container-low p-6">
              <h3 className="text-lg font-semibold text-on-surface">Craftsmanship Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">handyman</span>
                  <span className="text-sm text-on-surface-variant">100% handmade crochet</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">eco</span>
                  <span className="text-sm text-on-surface-variant">Premium quality yarn</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">local_shipping</span>
                  <span className="text-sm text-on-surface-variant">Free shipping on orders above ₹999</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">verified</span>
                  <span className="text-sm text-on-surface-variant">Quality assured</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
