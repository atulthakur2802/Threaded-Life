import connectToDatabase from '@/lib/mongodb';
import { MOCK_PRODUCTS } from '@/lib/mockProducts';
import Product from '@/models/Product';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { successResponse, errorResponse } from '@/lib/apiHelpers';

export async function GET() {
  try {
    await connectToDatabase();

    await Product.deleteMany({});

    const importedProducts = await Product.insertMany(
      MOCK_PRODUCTS.map(({ _id, createdAt, updatedAt, ...product }) => product)
    );

    const existingUser = await User.findOne({ email: 'test@example.com' });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
      });
    }

    return successResponse({ message: 'Seeded Data Successfully!', productsCount: importedProducts.length }, 200);
  } catch (err) {
    console.error('Seed route error:', err);
    return errorResponse('Seed Failed', 500);
  }
}
