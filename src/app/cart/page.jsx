import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartClient from './CartClient';

export const metadata = {
  title: 'Shopping Bag | Threaded Life',
  description: 'Review your items and proceed to checkout',
};

export default async function CartPage() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Navbar />
      <CartClient session={session} />
      <Footer />
    </>
  );
}
