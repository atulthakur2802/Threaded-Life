import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="mb-8">
            <span className="material-symbols-outlined text-6xl text-primary opacity-50">search_off</span>
          </div>
          
          <h1 className="mb-4 font-serif text-4xl font-bold text-on-surface md:text-5xl">
            Page Not Found
          </h1>
          
          <p className="mb-8 text-lg text-on-surface-variant">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 font-semibold text-on-primary transition-all hover:opacity-90"
            >
              <span className="material-symbols-outlined mr-2">home</span>
              Back to Home
            </Link>
            
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-xl border-2 border-primary bg-transparent px-8 py-4 font-semibold text-primary transition-all hover:bg-primary hover:text-on-primary"
            >
              <span className="material-symbols-outlined mr-2">shopping_bag</span>
              Browse Shop
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
