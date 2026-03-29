"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';

const initialState = {
  name: '',
  email: '',
  topic: 'General inquiry',
  message: '',
};

export default function InquiryForm({
  defaultTopic = 'General inquiry',
  submitLabel = 'Send message',
  className = 'space-y-5',
  compact = false,
}) {
  const [formData, setFormData] = useState({ ...initialState, topic: defaultTopic });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Client-side validation
    const trimmedName = formData.name?.trim();
    const trimmedEmail = formData.email?.trim();
    const trimmedMessage = formData.message?.trim();

    if (!trimmedName || trimmedName.length < 2) {
      toast.error('Please enter your full name (at least 2 characters)');
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!trimmedMessage || trimmedMessage.length < 10) {
      toast.error('Please enter a message with at least 10 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetchWithTimeout('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, name: trimmedName, email: trimmedEmail, message: trimmedMessage, kind: 'contact' }),
      }, 7000);

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || data.message || 'We could not send your message');
        return;
      }

      toast.success('Message sent. We will get back to you soon.');
      setFormData({ ...initialState, topic: defaultTopic });
    } catch (error) {
      toast.error(error.name === 'AbortError' ? 'Request timed out. Please try again.' : 'We could not send your message right now');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Name</span>
          <input
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={80}
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full rounded-2xl border-0 bg-white px-4 py-4 text-on-surface shadow-sm ring-1 ring-primary/10 outline-none transition focus:ring-2 focus:ring-primary/30"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Email</span>
          <input
            name="email"
            type="email"
            required
            maxLength={120}
            value={formData.email}
            onChange={handleChange}
            placeholder="hello@example.com"
            className="w-full rounded-2xl border-0 bg-white px-4 py-4 text-on-surface shadow-sm ring-1 ring-primary/10 outline-none transition focus:ring-2 focus:ring-primary/30"
          />
        </label>
      </div>

      {!compact && (
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Topic</span>
          <select
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full rounded-2xl border-0 bg-white px-4 py-4 text-on-surface shadow-sm ring-1 ring-primary/10 outline-none transition focus:ring-2 focus:ring-primary/30"
          >
            <option>Order help</option>
            <option>Custom request</option>
            <option>Wholesale or gifting</option>
            <option>General inquiry</option>
          </select>
        </label>
      )}

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Message</span>
        <textarea
          name="message"
          rows={compact ? 4 : 6}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us what you are looking for..."
          className="w-full rounded-[1.5rem] border-0 bg-white px-4 py-4 text-on-surface shadow-sm ring-1 ring-primary/10 outline-none transition focus:ring-2 focus:ring-primary/30"
        />
      </label>

      <div className={`flex ${compact ? 'justify-start' : 'flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between'}`}>
        {!compact && (
          <p className="text-sm leading-6 text-on-surface-variant">
            Need something special? Mention colors, quantity, and delivery timeline.
          </p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 font-semibold text-on-primary transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Sending...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
