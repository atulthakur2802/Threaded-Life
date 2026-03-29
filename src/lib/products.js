import connectToDatabase from '@/lib/mongodb';
import { MOCK_PRODUCTS } from '@/lib/mockProducts';
import Product from '@/models/Product';

function serializeProduct(product) {
  if (!product) {
    return null;
  }

  return {
    ...product,
    _id: product._id.toString(),
    createdAt: product.createdAt?.toISOString?.() ?? product.createdAt,
    updatedAt: product.updatedAt?.toISOString?.() ?? product.updatedAt,
  };
}

export async function getProducts() {
  try {
    await connectToDatabase();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    return products.map(serializeProduct);
  } catch (error) {
    return MOCK_PRODUCTS;
  }
}

export async function getProductById(productId) {
  try {
    await connectToDatabase();
    const product = await Product.findById(productId).lean();
    return serializeProduct(product);
  } catch (error) {
    return MOCK_PRODUCTS.find((product) => product._id === productId) ?? null;
  }
}
