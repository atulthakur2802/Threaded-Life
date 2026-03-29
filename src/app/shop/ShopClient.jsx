"use client";

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import ProductCard from '@/components/ProductCard';
import { AnimatePresence, motion } from 'framer-motion';
import { formatPrice } from '@/lib/formatters';

const CATEGORIES = [
  'Soft Toys & Amigurumi',
  'Bags & Accessories',
  'Home Decor',
  'Baby Items',
  'Gifts & Combos',
];

export default function ShopClient({ initialProducts = [] }) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get('search') || '';
  
  const [activeCategory, setActiveCategory] = useState('Soft Toys & Amigurumi');
  const [priceRange, setPriceRange] = useState(4999);
  const [sortBy, setSortBy] = useState('Popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const filteredProducts = useMemo(
    () => {
      let products = [...(initialProducts || [])];
      
      // Apply search filter
      if (searchQuery) {
        products = products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Apply category filter
      products = products.filter((product) => product.category === activeCategory);
      
      // Apply price filter
      products = products.filter((product) => product.price <= priceRange);
      
      // Apply sorting
      products.sort((a, b) => {
        if (sortBy === 'Price: Low to High') return a.price - b.price;
        if (sortBy === 'Price: High to Low') return b.price - a.price;
        if (sortBy === 'Popularity') return b.rating - a.rating;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      
      return products;
    },
    [initialProducts, searchQuery, activeCategory, priceRange, sortBy]
  );

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, priceRange, sortBy, searchQuery]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-screen max-w-7xl px-4 pb-20 pt-28 md:px-8">
        {initialProducts.length === 0 && (
          <div className="mb-8 flex items-center gap-4 rounded-2xl bg-amber-50 border border-amber-200 px-6 py-4">
            <span className="material-symbols-outlined text-amber-600">warning</span>
            <div>
              <p className="font-semibold text-amber-800">Products temporarily unavailable</p>
              <p className="text-sm text-amber-700">We are having trouble loading our catalogue. Please try refreshing the page.</p>
            </div>
          </div>
        )}
        
        {searchQuery && (
          <div className="mb-8 flex items-center gap-4 rounded-2xl bg-blue-50 border border-blue-200 px-6 py-4">
            <span className="material-symbols-outlined text-blue-600">search</span>
            <div>
              <p className="font-semibold text-blue-800">Search Results</p>
              <p className="text-sm text-blue-700">Showing {filteredProducts.length} products for "{searchQuery}"</p>
            </div>
          </div>
        )}
        
        <div className="flex flex-col gap-8 md:flex-row">
          <motion.aside
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex-shrink-0 space-y-8 md:w-64"
          >
            <div>
              <h3 className="mb-4 font-serif text-lg font-bold text-primary">Categories</h3>
              <div className="space-y-3">
                {CATEGORIES.map((category) => (
                  <label key={category} className="group flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      className="rounded-md border-outline-variant text-primary focus:ring-primary-fixed-dim"
                      checked={activeCategory === category}
                      onChange={() => setActiveCategory(category)}
                    />
                    <span className={`text-sm font-medium transition-colors ${activeCategory === category ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`}>
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-serif text-lg font-bold text-primary">Price Range</h3>
              <div className="px-2">
                <input
                  type="range"
                  min="299"
                  max="4999"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-surface-container-highest accent-primary"
                />
                <div className="mt-3 flex justify-between text-xs font-bold text-on-surface-variant">
                  <span>{formatPrice(299)}</span>
                  <span>{formatPrice(4999)}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-serif text-lg font-bold text-primary">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-xl border-none bg-surface-container-low px-4 py-3 text-sm font-medium text-on-surface-variant focus:ring-2 focus:ring-primary-fixed-dim"
              >
                <option>Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </motion.aside>

          <section className="flex-grow">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8 flex justify-between items-end"
            >
              <div>
                <h1 className="font-serif text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
                  {searchQuery ? 'Search Results' : 'Artisanal Collections'}
                </h1>
                <p className="mt-2 text-on-surface-variant">
                  Discover {filteredProducts.length} hand-stitched treasures
                </p>
              </div>
            </motion.div>

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-surface-container-low p-12">
                <span className="material-symbols-outlined mb-4 text-4xl text-primary">
                  {searchQuery ? 'search_off' : 'inventory_2'}
                </span>
                <p className="font-serif text-xl font-bold text-on-surface">
                  {searchQuery ? 'No products found' : 'No products available'}
                </p>
                <p className="text-on-surface-variant">
                  {searchQuery 
                    ? 'Try adjusting your search terms or browse our categories.'
                    : 'Try adjusting your filters or check back later.'
                  }
                </p>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                  {paginatedProducts.map((product, index) => (
                    <ProductCard key={product._id} product={product} index={index} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            <div className="mt-12 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setCurrentPage((page) => Math.max(1, page - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                aria-label="Previous product page"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high text-primary transition-all hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <span className="font-serif font-bold text-on-surface">{currentPage} of {totalPages}</span>
              <button
                type="button"
                onClick={() => {
                  setCurrentPage((page) => Math.min(totalPages, page + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                aria-label="Next product page"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high text-primary transition-all hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
