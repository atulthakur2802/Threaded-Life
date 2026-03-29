import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, failureUntil: 0 };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (cached.failureUntil && Date.now() < cached.failureUntil) {
    throw new Error('Database temporarily unavailable');
  }

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured. Use an environment variable or set LOCAL fallback values.');
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 3000,
      socketTimeoutMS: 5000,
      connectTimeoutMS: 3000,
      maxPoolSize: 1,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await Promise.race([
      cached.promise,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database connection timeout')), 8000)
      )
    ]);
    cached.failureUntil = 0;
  } catch (e) {
    cached.promise = null;
    cached.failureUntil = Date.now() + 30000; // 30 seconds cooldown
    console.error('Database connection failed:', e.message);
    throw new Error('Database connection failed');
  }

  return cached.conn;
}

export default connectToDatabase;
