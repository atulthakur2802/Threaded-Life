import { randomUUID } from 'crypto';

// In-memory store for Vercel compatibility
const memoryStore = {
  users: [],
  orders: [],
  contactMessages: [],
  newsletterSubscribers: [],
};

// For development with filesystem, fallback to memory in production
const useFileSystem = process.env.NODE_ENV === 'development' && !process.env.VERCEL;

let fileStoreCache = null;

async function getStore() {
  if (useFileSystem) {
    // Use filesystem in local development
    if (fileStoreCache) return fileStoreCache;
    try {
      const { promises: fs } = await import('fs');
      const path = await import('path');
      const os = await import('os');
      
      const storeDir = process.env.LOCAL_DATA_STORE_DIR || path.join(os.tmpdir(), 'threaded-life-store');
      const storePath = path.join(storeDir, 'local-store.json');
      
      await fs.mkdir(storeDir, { recursive: true });
      
      try {
        const raw = await fs.readFile(storePath, 'utf8');
        fileStoreCache = { ...memoryStore, ...JSON.parse(raw) };
      } catch {
        fileStoreCache = { ...memoryStore };
        await fs.writeFile(storePath, JSON.stringify(fileStoreCache, null, 2), 'utf8');
      }
      
      return fileStoreCache;
    } catch (error) {
      console.warn('Filesystem store failed, using memory:', error.message);
      return memoryStore;
    }
  }
  
  // Use memory store in production
  return memoryStore;
}

async function saveStore(store) {
  if (useFileSystem && fileStoreCache) {
    try {
      const { promises: fs } = await import('fs');
      const path = await import('path');
      const os = await import('os');
      
      const storeDir = process.env.LOCAL_DATA_STORE_DIR || path.join(os.tmpdir(), 'threaded-life-store');
      const storePath = path.join(storeDir, 'local-store.json');
      
      await fs.writeFile(storePath, JSON.stringify(store, null, 2), 'utf8');
      fileStoreCache = { ...store };
    } catch (error) {
      console.warn('Failed to save to filesystem:', error.message);
    }
  }
  
  // Update memory store
  Object.assign(memoryStore, store);
}

export async function findLocalUserByEmail(email) {
  const store = await getStore();
  return store.users.find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function createLocalUser({ name, email, password }) {
  const store = await getStore();
  const existingUser = store.users.find((user) => user.email.toLowerCase() === email.toLowerCase());

  if (existingUser) {
    throw new Error('USER_EXISTS');
  }

  const user = {
    id: randomUUID(),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  store.users.push(user);
  await saveStore(store);
  return user;
}

export async function createLocalOrder(order) {
  const store = await getStore();
  const savedOrder = {
    ...order,
    _id: randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.orders.unshift(savedOrder);
  await saveStore(store);
  return savedOrder;
}

export async function getLocalOrdersByUserId(userId) {
  const store = await getStore();
  return store.orders
    .filter((order) => order.user === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function saveContactMessage(message) {
  const store = await getStore();
  const savedMessage = {
    id: randomUUID(),
    ...message,
    createdAt: new Date().toISOString(),
  };

  store.contactMessages.unshift(savedMessage);
  await saveStore(store);
  return savedMessage;
}

export async function addNewsletterSubscriber(email) {
  const store = await getStore();
  const normalizedEmail = email.toLowerCase();
  const existingSubscriber = store.newsletterSubscribers.find((item) => item.email === normalizedEmail);

  if (existingSubscriber) {
    return existingSubscriber;
  }

  const subscriber = {
    id: randomUUID(),
    email: normalizedEmail,
    createdAt: new Date().toISOString(),
  };

  store.newsletterSubscribers.unshift(subscriber);
  await saveStore(store);
  return subscriber;
}
