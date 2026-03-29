import { getProductById } from '@/lib/products';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  try {
    const product = await getProductById(params.id);
    
    if (!product) {
      return {
        title: 'Product Not Found | Threaded Life',
        description: 'The requested product could not be found.',
      };
    }

    return {
      title: `${product.name} | Threaded Life`,
      description: product.description,
    };
  } catch (error) {
    return {
      title: 'Product | Threaded Life',
      description: 'Discover artisanal crochet pieces',
    };
  }
}

export default async function ProductPage({ params }) {
  let product = null;
  let error = null;

  try {
    product = await getProductById(params.id);
  } catch (err) {
    console.error('Error fetching product:', err);
    error = err.message;
  }

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
