import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { formatPrice } from '@/lib/formatters';
import { getLocalOrdersByUserId } from '@/lib/localDataStore';

export const metadata = {
  title: 'Order History | Threaded Life',
};

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login?callbackUrl=/admin/orders');
  }

  let orders = [];

  try {
    await connectToDatabase();

    orders = await Order.find({ user: session.user.id })
      .populate('orderItems.product', 'name image price')
      .sort({ createdAt: -1 })
      .lean();
  } catch (error) {
    console.warn('Orders page falling back to local store:', error);
    orders = await getLocalOrdersByUserId(session.user.id);
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-screen max-w-7xl px-6 pb-16 pt-24">
        <header className="mb-10">
          <h1 className="mb-2 font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl">Order History</h1>
          <p className="text-on-surface-variant">View and track your previous orders.</p>
        </header>

        {orders.length === 0 ? (
          <div className="rounded-3xl bg-surface-container-low p-12 text-center shadow-sm">
            <span className="material-symbols-outlined mb-4 text-5xl text-primary opacity-50">inventory_2</span>
            <h3 className="mb-2 font-serif text-2xl font-bold">No orders found</h3>
            <p className="text-on-surface-variant">You haven&apos;t placed any orders yet. Discover our artisanal collection!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order._id.toString()} className="rounded-2xl border border-secondary-fixed/50 bg-white p-6 shadow-sm">
                <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-surface-container-highest pb-4 md:flex-row md:items-center">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Order ID</span>
                    <p className="font-mono text-sm text-primary">{order._id.toString()}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Date</span>
                    <p className="font-medium text-on-surface">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Total Amount</span>
                    <p className="font-bold text-primary">{formatPrice(order.totalPrice)}</p>
                  </div>
                  <div>
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">Status</span>
                    <span className="rounded-full bg-primary-container px-3 py-1 text-xs font-bold text-on-primary-container">
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.orderItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      {(item.product?.image || item.image) && (
                        <div className="overflow-hidden rounded-lg bg-surface-container">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.product?.image || item.image} alt={item.product?.name || item.name} className="h-16 w-16 object-cover" />
                        </div>
                      )}
                      <div>
                        <p className="font-serif font-bold text-on-surface">{item.product?.name || item.name || 'Product Unavailable'}</p>
                        <p className="text-sm text-on-surface-variant">Qty: {item.quantity} x {formatPrice(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
