import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { createLocalUser, findLocalUserByEmail } from '@/lib/localDataStore';
import { successResponse, errorResponse } from '@/lib/apiHelpers';

function validateRegistrationInput({ name, email, password }) {
  const normalizedName = name?.trim();
  const normalizedEmail = email?.trim().toLowerCase();

  if (!normalizedName || !normalizedEmail || !password) {
    return 'Missing fields';
  }

  if (normalizedName.length < 2 || normalizedName.length > 60) {
    return 'Name must be between 2 and 60 characters';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return 'Please enter a valid email address';
  }

  if (password.length < 6 || password.length > 120) {
    return 'Password must be between 6 and 120 characters';
  }

  return null;
}

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const validationError = validateRegistrationInput({ name, email, password });

    if (validationError) {
      return errorResponse(validationError, 400);
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await connectToDatabase();

      const existingUser = await User.findOne({ email: normalizedEmail });

      if (existingUser) {
        return errorResponse('User already exists', 409);
      }

      const newUser = await User.create({
        name: normalizedName,
        email: normalizedEmail,
        password: hashedPassword,
      });

      return successResponse({ message: 'User registered successfully', userId: newUser._id }, 201);
    } catch (dbError) {
      console.warn('Registration falling back to local store:', dbError);

      const existingLocalUser = await findLocalUserByEmail(normalizedEmail);

      if (existingLocalUser) {
        return errorResponse('User already exists', 409);
      }

      const newUser = await createLocalUser({
        name: normalizedName,
        email: normalizedEmail,
        password: hashedPassword,
      });

      return successResponse({ message: 'User registered successfully', userId: newUser.id, fallback: true }, 201);
    }
  } catch (error) {
    console.error('Registration Error:', error);
    return errorResponse('Internal Server Error', 500);
  }
}
