import { addNewsletterSubscriber, saveContactMessage } from '@/lib/localDataStore';
import { successResponse, errorResponse } from '@/lib/apiHelpers';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email ?? '');
}

export async function POST(req) {
  try {
    const body = await req.json();
    const kind = body.kind === 'newsletter' ? 'newsletter' : 'contact';

    if (kind === 'newsletter') {
      const email = body.email?.trim().toLowerCase();

      if (!isValidEmail(email)) {
        return errorResponse('Please enter a valid email address', 400);
      }

      await addNewsletterSubscriber(email);
      return successResponse({ message: 'Subscribed successfully' }, 201);
    }

    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const topic = body.topic?.trim() || 'General inquiry';
    const message = body.message?.trim();

    if (!name || name.length < 2) {
      return errorResponse('Please enter your name', 400);
    }

    if (!isValidEmail(email)) {
      return errorResponse('Please enter a valid email address', 400);
    }

    if (!message || message.length < 10) {
      return errorResponse('Please enter a message with at least 10 characters', 400);
    }

    await saveContactMessage({ name, email, topic, message });
    return successResponse({ message: 'Message received' }, 201);
  } catch (error) {
    console.error('Contact route error:', error);
    return errorResponse('Unable to process your request', 500);
  }
}
