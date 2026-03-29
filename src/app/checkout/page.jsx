import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';
import CheckoutClient from './CheckoutClient';

export const metadata = {
  title: 'Checkout | Threaded Life',
  description: 'Complete your order',
};

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login?callbackUrl=/checkout');
  }

  return <CheckoutClient user={session.user} />;
}
