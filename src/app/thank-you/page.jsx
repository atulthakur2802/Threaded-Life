import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';
import ThankYouClient from './ThankYouClient';

export const metadata = {
  title: 'Order Confirmed | Threaded Life',
  description: 'Thank you for your order!',
};

export default async function ThankYouPage() {
  const session = await getServerSession(authOptions);

  // If not logged in, redirect to home
  if (!session) {
    redirect('/');
  }

  return <ThankYouClient user={session.user} />;
}
