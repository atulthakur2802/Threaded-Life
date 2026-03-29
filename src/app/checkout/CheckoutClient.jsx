"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useCartStore from '@/store/useCartStore';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPrice } from '@/lib/formatters';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';

function validateShippingAddress(shippingAddress) {
  const fullName = shippingAddress.fullName?.trim();
  const address = shippingAddress.address?.trim();
  const city = shippingAddress.city?.trim();
  const pinCode = shippingAddress.pinCode?.trim();
  const phone = shippingAddress.phone?.trim();

  if (!fullName || fullName.length < 2) {
    return 'Please enter the recipient full name';
  }

  if (!address || address.length < 8) {
    return 'Please enter a complete street address';
  }

  if (!city) {
    return 'Please enter the delivery city';
  }

  if (!/^\d{6}$/.test(pinCode ?? '')) {
    return 'PIN code must be 6 digits';
  }

  if (!/^(\+91[\s-]?)?\d{10}$/.test(phone ?? '')) {
    return 'Phone number must be 10 digits';
  }

  return null;
}

export default function CheckoutClient({ user }) {
  const firstName = user?.name?.split(' ')[0] || 'there';
  const router = useRouter();
  const cartItems = useCartStore((state) => state.cartItems);
  const cartTotal = useCartStore((state) => state.getCartTotal());
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: user.name || '',
    address: '',
    city: '',
    state: 'Rajasthan',
    pinCode: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const validationError = validateShippingAddress(shippingAddress);

    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsProcessing(true);
    toast.loading('Processing payment securely...', { id: 'payment' });

    try {
      const response = await fetchWithTimeout('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderItems: cartItems.map((item) => ({
            product: item.product._id,
            name: item.product.name,
            image: item.product.image,
            category: item.product.category,
            quantity: item.quantity,
            price: item.price,
          })),
          shippingAddress,
          paymentMethod,
          totalPrice: cartTotal,
          isPaid: true,
          paidAt: new Date().toISOString(),
        }),
      }, 10000);

      const data = await response.json();

      if (response.ok) {
        toast.success('Order confirmed! Tracking details sent to email.', { id: 'payment' });
        clearCart();
        router.push('/thank-you');
      } else {
        toast.error(data.error || data.message || 'Error processing order', { id: 'payment' });
      }
    } catch (error) {
      toast.error(error.name === 'AbortError' ? 'Checkout request timed out' : 'Network error during checkout', { id: 'payment' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-screen max-w-7xl px-4 pb-20 pt-24 md:px-8">
        <header className="mb-12">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-primary md:text-5xl">Review Your Selections</h1>
          <p className="font-body text-on-surface-variant">Complete your order to bring artisanal craft home, {firstName}.</p>
        </header>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            <section className="rounded-xl bg-surface-container-low p-6 shadow-sm md:p-8">
              <h2 className="mb-8 text-2xl font-serif font-bold text-on-surface">Your Cart ({cartItems.length})</h2>

              {cartItems.length === 0 ? (
                <div className="py-12 text-center text-on-surface-variant">
                  <span className="material-symbols-outlined mb-4 text-5xl text-primary opacity-50">shopping_cart</span>
                  <p>Your basket is currently empty.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, padding: 0, margin: 0 }}
                        key={item.product._id}
                        className="flex flex-col items-center gap-6 border-b border-surface-container-highest pb-6 last:border-0 last:pb-0 sm:flex-row"
                      >
                        <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-surface-container-highest">
                          <Image src={item.product.image} alt={item.product.name} fill className="object-cover" unoptimized />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-lg font-serif font-semibold">{item.product.name}</h3>
                          <p className="mb-4 text-sm text-on-surface-variant">Category: {item.product.category}</p>
                          <div className="flex items-center gap-6">
                            <div className="flex items-center rounded-full bg-surface-container-highest px-3 py-1">
                              <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)} className="flex h-8 w-8 items-center justify-center rounded-full font-bold text-primary transition-colors hover:bg-primary/10">-</button>
                              <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)} className="flex h-8 w-8 items-center justify-center rounded-full font-bold text-primary transition-colors hover:bg-primary/10">+</button>
                            </div>
                            <button onClick={() => removeFromCart(item.product._id)} className="p-2 text-on-surface-variant transition-colors hover:text-error">
                              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>delete</span>
                            </button>
                          </div>
                        </div>
                        <div className="mt-4 text-right font-serif text-xl font-bold text-primary sm:mt-0 sm:text-left">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </section>

            <section className="rounded-xl border border-secondary-fixed/50 bg-surface p-6 shadow-sm md:p-8">
              <h2 className="mb-8 text-2xl font-serif font-bold text-on-surface">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-on-surface-variant">Full Name</label>
                  <input name="fullName" value={shippingAddress.fullName} onChange={handleInputChange} className="w-full rounded-lg border-none bg-surface-container p-3 outline-none transition-all focus:ring-2 focus:ring-primary-fixed-dim" placeholder="Ananya Sharma" type="text" maxLength="60" />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-on-surface-variant">Street Address</label>
                  <input name="address" value={shippingAddress.address} onChange={handleInputChange} className="w-full rounded-lg border-none bg-surface-container p-3 outline-none transition-all focus:ring-2 focus:ring-primary-fixed-dim" placeholder="House No. 42, Green Meadows Lane" type="text" maxLength="140" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-on-surface-variant">City</label>
                  <input name="city" value={shippingAddress.city} onChange={handleInputChange} className="w-full rounded-lg border-none bg-surface-container p-3 outline-none transition-all focus:ring-2 focus:ring-primary-fixed-dim" placeholder="Jaipur" type="text" maxLength="60" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-on-surface-variant">State</label>
                  <select name="state" value={shippingAddress.state} onChange={handleInputChange} className="w-full rounded-lg border-none bg-surface-container p-3 outline-none transition-all focus:ring-2 focus:ring-primary-fixed-dim">
                    <option>Rajasthan</option>
                    <option>Maharashtra</option>
                    <option>Karnataka</option>
                    <option>Delhi</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-on-surface-variant">PIN Code</label>
                  <input
                    name="pinCode"
                    value={shippingAddress.pinCode}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-none bg-surface-container p-3 outline-none transition-all focus:ring-2 focus:ring-primary-fixed-dim"
                    placeholder="302001"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    pattern="\d{6}"
                    title="6-digit PIN code"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-on-surface-variant">Phone Number</label>
                  <input
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-none bg-surface-container p-3 outline-none transition-all focus:ring-2 focus:ring-primary-fixed-dim"
                    placeholder="+91 98765 43210"
                    type="tel"
                    inputMode="tel"
                    maxLength={13}
                    pattern="(\+91[\s-]?)?\d{10}"
                    title="10-digit Indian phone number, optionally prefixed with +91"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-secondary-fixed/50 bg-surface p-6 shadow-sm md:p-8">
              <h2 className="mb-6 text-2xl font-serif font-bold text-on-surface">Payment Method</h2>
              <div className="space-y-4">
                {[
                  { id: 'UPI', label: 'UPI (Google Pay, PhonePe, Paytm)', icon: 'account_balance_wallet', desc: 'Instant payment with your favorite app' },
                  { id: 'CARD', label: 'Debit / Credit Card', icon: 'credit_card', desc: 'Visa, Mastercard, RuPay supported' },
                  { id: 'COD', label: 'Cash on Delivery (COD)', icon: 'local_shipping', desc: 'Pay when your order arrives' },
                ].map((method) => (
                  <label key={method.id} className={`flex cursor-pointer items-center rounded-xl border-2 p-4 transition-all ${paymentMethod === method.id ? 'border-primary bg-primary-container/20 shadow-sm' : 'border-transparent bg-surface-container-low hover:bg-surface-container-high'}`}>
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="h-5 w-5 border-outline text-primary focus:ring-primary"
                    />
                    <div className="ml-4 flex-grow">
                      <p className="font-bold text-on-surface">{method.label}</p>
                      <p className="mt-1 text-xs text-on-surface-variant">{method.desc}</p>
                    </div>
                    <span className="material-symbols-outlined text-2xl text-primary">{method.icon}</span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          <div className="sticky top-28 lg:col-span-4">
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-2xl bg-surface-container-highest/50 p-8 shadow-xl shadow-rose-900/5 backdrop-blur-sm"
            >
              <div className="absolute right-0 top-0 -mr-10 -mt-10 h-32 w-32 rounded-full bg-primary-container/30 blur-xl"></div>

              <h2 className="relative mb-6 text-2xl font-serif font-bold text-on-surface">Order Summary</h2>
              <div className="relative mb-8 space-y-4">
                <div className="flex justify-between font-medium text-on-surface-variant">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="text-on-surface">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between font-medium text-on-surface-variant">
                  <span>Shipping</span>
                  <span className="font-bold text-primary">FREE</span>
                </div>
                <p className="rounded-lg bg-white/50 p-2 text-xs italic text-on-surface-variant">Free shipping on orders over {formatPrice(999)} applied</p>
                <div className="mt-4 flex items-center justify-between border-t border-outline-variant/30 pt-4">
                  <span className="text-xl font-serif font-bold text-on-surface">Total</span>
                  <span className="text-2xl font-serif font-bold text-primary">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessing || cartItems.length === 0}
                className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-lg font-bold text-on-primary shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="material-symbols-outlined animate-spin" style={{ fontSize: '20px' }}>sync</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>lock</span>
                    Place Order
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 text-sm font-medium text-on-surface-variant">
                <span className="material-symbols-outlined text-base text-green-600">verified_user</span>
                <span>Secure 256-bit SSL Encryption</span>
              </div>

              <div className="mt-8 rounded-xl border border-secondary-fixed/50 bg-white/60 p-4 shadow-sm">
                <h4 className="mb-2 flex items-center gap-2 font-serif text-sm font-bold text-primary">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                  Threaded Perks
                </h4>
                <p className="text-xs font-medium text-on-surface-variant">You&apos;ll earn <strong className="text-primary">{Math.floor(cartTotal * 0.1)} points</strong> on this purchase!</p>
              </div>
            </motion.section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
