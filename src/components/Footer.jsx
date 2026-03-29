"use client";

import Link from 'next/link';
import toast from 'react-hot-toast';

function ShareButton() {
  const handleShare = async () => {
    const shareData = {
      title: 'Threaded Life — Artisanal Crochet',
      text: 'Discover handmade crochet pieces crafted with love in India.',
      url: 'https://threadedlife.in',
    };

    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success('Link copied to clipboard!');
      }
    } catch (err) {
      // User cancelled or API unavailable - silent
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Share Threaded Life"
      className="material-symbols-outlined text-rose-900 transition-transform hover:scale-110 cursor-pointer bg-transparent border-none p-0"
    >
      share
    </button>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="tonal-shift-no-border mt-12 w-full bg-yellow-50 px-8 py-12 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 text-center md:grid-cols-3 md:text-left">
        <div>
          <div className="mb-4 text-xl font-serif text-rose-900 dark:text-rose-100">Threaded Life</div>
          <p className="max-w-xs font-serif text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Curating a handmade life through every stitch. Based in the heart of India, shipping warmth worldwide.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <h4 className="mb-2 font-bold text-rose-900">Shop</h4>
            <Link href="/shop" className="font-serif text-sm text-zinc-600 transition-all decoration-rose-200 hover:text-rose-700 hover:underline dark:text-zinc-400 dark:hover:text-rose-300">Amigurumi</Link>
            <Link href="/shop" className="font-serif text-sm text-zinc-600 transition-all decoration-rose-200 hover:text-rose-700 hover:underline dark:text-zinc-400 dark:hover:text-rose-300">Bags</Link>
            <Link href="/shop" className="font-serif text-sm text-zinc-600 transition-all decoration-rose-200 hover:text-rose-700 hover:underline dark:text-zinc-400 dark:hover:text-rose-300">Decor</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="mb-2 font-bold text-rose-900">Support</h4>
            <Link href="/contact" className="font-serif text-sm text-zinc-600 transition-all decoration-rose-200 hover:text-rose-700 hover:underline dark:text-zinc-400 dark:hover:text-rose-300">Contact</Link>
            <Link href="/contact" className="font-serif text-sm text-zinc-600 transition-all decoration-rose-200 hover:text-rose-700 hover:underline dark:text-zinc-400 dark:hover:text-rose-300">Shipping &amp; Returns</Link>
            <a href="https://instagram.com/threadedlife.in" target="_blank" rel="noreferrer" className="font-serif text-sm text-zinc-600 transition-all decoration-rose-200 hover:text-rose-700 hover:underline dark:text-zinc-400 dark:hover:text-rose-300">Instagram</a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 md:items-end">
          <div className="mb-4 flex gap-4">
            <ShareButton />
            <Link
              href="/shop"
              aria-label="Browse the Threaded Life collection"
              className="material-symbols-outlined text-rose-900 transition-transform hover:scale-110"
            >
              local_mall
            </Link>
          </div>
          <div className="text-center md:text-right">
            <p className="font-serif text-sm leading-relaxed text-rose-900 dark:text-rose-200">
              Handmade with love &copy; {year} Threaded Life
            </p>
            <p className="mt-2 text-xs text-zinc-400">Crafted by Artisans in Bharat</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
