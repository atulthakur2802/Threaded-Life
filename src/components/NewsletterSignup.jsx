"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetchWithTimeout('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, kind: 'newsletter' }),
      }, 7000);
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || data.message || 'Unable to subscribe right now');
        return;
      }

      toast.success('You are on the list for new drops and stories.');
      setEmail('');
    } catch (error) {
      toast.error(error.name === 'AbortError' ? 'Request timed out. Please try again.' : 'Unable to subscribe right now');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="relative z-10 mx-auto flex max-w-md flex-col gap-4 md:flex-row" onSubmit={handleSubmit}>
      <input
        className="flex-1 rounded-xl border border-white/30 bg-white/20 px-6 py-4 text-white backdrop-blur-md placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
        placeholder="your@email.com"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-xl bg-white px-8 py-4 font-bold text-primary shadow-md transition-colors hover:bg-primary-container active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Joining...' : 'Subscribe'}
      </button>
    </form>
  );
}
