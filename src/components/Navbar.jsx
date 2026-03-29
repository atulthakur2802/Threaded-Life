"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { AnimatePresence, motion } from 'framer-motion';
import useCartStore from '@/store/useCartStore';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const cartCount = useCartStore((state) => state.getCartCount());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const navItems = [
    { href: '/shop', label: 'Shop', active: pathname?.startsWith('/shop') || pathname?.startsWith('/checkout') },
    { href: '/about', label: 'About', active: pathname === '/about' },
    { href: '/contact', label: 'Contact', active: pathname === '/contact' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-rose-50/50 to-transparent bg-white/80 shadow-sm backdrop-blur-xl dark:bg-zinc-900/80 dark:shadow-none">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-serif italic text-rose-900 dark:text-rose-100">
            Threaded Life
          </Link>

          <div className="hidden items-center gap-8 font-serif font-semibold tracking-tight md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={item.active
                  ? 'border-b-2 border-rose-900 pb-1 text-rose-900 dark:border-rose-200 dark:text-rose-200'
                  : 'border-b-2 border-transparent pb-1 text-zinc-600 transition-colors hover:text-rose-800 dark:text-zinc-400 dark:hover:text-rose-200'}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant">search</span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 rounded-full border-none bg-surface-container-highest py-1.5 pl-10 pr-4 text-sm outline-none transition-all focus:w-64 focus:ring-2 focus:ring-primary-fixed-dim"
                placeholder="Find joy..."
                type="text"
                aria-label="Search the collection"
              />
            </form>

            <Link
              href="/cart"
              aria-label="Open shopping bag"
              className="relative text-rose-900 transition-opacity duration-200 hover:opacity-80 active:scale-95 dark:text-rose-200"
            >
              <span className="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
              {isHydrated && cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="text-rose-900 md:hidden"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>

            {session ? (
              <div className="group relative hidden sm:block">
                <button className="pl-2 font-serif font-semibold text-rose-900 dark:text-rose-200">
                  {session.user.name?.split(' ')[0]}
                </button>
                <div className="invisible absolute right-0 top-full mt-2 flex w-48 flex-col overflow-hidden rounded-xl border border-rose-100 bg-white opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100 dark:border-zinc-700 dark:bg-zinc-800">
                  <Link href="/admin/orders" className="px-4 py-3 text-sm font-medium hover:bg-rose-50 dark:hover:bg-zinc-700">Orders</Link>
                  <button onClick={() => signOut()} className="px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-rose-50 dark:hover:bg-zinc-700">Logout</button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="hidden pl-2 font-serif font-semibold text-rose-900 hover:underline dark:text-rose-200 sm:block">
                Login
              </Link>
            )}
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
              aria-label="Close navigation menu"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 240, damping: 26 }}
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-surface p-6 shadow-2xl md:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-2xl font-serif italic text-rose-900">Threaded Life</span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-full p-2 text-on-surface transition-colors hover:bg-surface-container-low"
                  aria-label="Close menu"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <nav className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`rounded-2xl px-4 py-3 font-serif text-lg font-semibold transition-colors ${item.active ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface'}`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-2xl bg-surface-container-low px-4 py-3 text-left font-serif text-lg font-semibold text-on-surface"
                >
                  Basket ({cartCount})
                </Link>
              </nav>

              <div className="mt-auto flex flex-col gap-3 pt-8">
                {session ? (
                  <>
                    <Link
                      href="/admin/orders"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="rounded-2xl bg-surface-container-low px-4 py-3 font-semibold text-on-surface"
                    >
                      Your Orders
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        signOut();
                      }}
                      className="rounded-2xl bg-rose-100 px-4 py-3 text-left font-semibold text-rose-900"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-2xl bg-primary px-4 py-3 text-center font-semibold text-on-primary"
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
