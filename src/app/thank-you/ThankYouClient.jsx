"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ThankYouClient({ user }) {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    // Generate a random order number for display
    const generateOrderNumber = () => {
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `TL${timestamp}${random}`;
    };
    
    setOrderNumber(generateOrderNumber());
    
    // Redirect to home after 30 seconds
    const timer = setTimeout(() => {
      router.push('/');
    }, 30000);
    
    return () => clearTimeout(timer);
  }, [router]);

  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-4xl text-white">check</span>
            </motion.div>

            {/* Success Message */}
            <div className="space-y-4">
              <h1 className="font-serif text-4xl font-bold text-on-surface md:text-5xl">
                Order Confirmed!
              </h1>
              
              <p className="text-xl text-on-surface-variant">
                Thank you for your order, {firstName}!
              </p>
              
              <div className="rounded-xl bg-surface-container-low p-6 max-w-md mx-auto">
                <p className="text-sm text-on-surface-variant mb-2">Order Number</p>
                <p className="font-mono text-lg font-bold text-primary">{orderNumber}</p>
              </div>
            </div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-8">
                <h2 className="font-serif text-2xl font-bold text-primary mb-4">What's Next?</h2>
                
                <div className="space-y-4 text-left max-w-md mx-auto">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary mt-1">email</span>
                    <div>
                      <p className="font-semibold text-on-surface">Order Confirmation</p>
                      <p className="text-sm text-on-surface-variant">Check your email for order details and tracking information</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary mt-1">local_shipping</span>
                    <div>
                      <p className="font-semibold text-on-surface">Processing</p>
                      <p className="text-sm text-on-surface-variant">We'll prepare your handmade items with care (2-3 days)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary mt-1">home_delivery</span>
                    <div>
                      <p className="font-semibold text-on-surface">Delivery</p>
                      <p className="text-sm text-on-surface-variant">Expected delivery in 5-7 business days</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
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
                Continue Shopping
              </Link>
            </motion.div>

            {/* Auto-redirect Notice */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-sm text-on-surface-variant"
            >
              You will be redirected to the homepage automatically in 30 seconds
            </motion.p>
          </motion.div>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
