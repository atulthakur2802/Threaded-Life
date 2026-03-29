import { getProducts } from '@/lib/products';
import ShopClient from './ShopClient';

// Ensure the page is dynamically rendered to show fresh products
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Shop | Threaded Life',
  description: 'Discover artisanal crochet pieces',
};

export default async function ShopPage() {
  let initialProducts = [];
  try {
    initialProducts = (await getProducts()) || [];
  } catch (error) {
    console.error('Error fetching initial products for shop:', error);
  }
  return <ShopClient initialProducts={initialProducts} />;
}
