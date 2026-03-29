import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';
import mongoose from 'mongoose';
import { createLocalOrder, getLocalOrdersByUserId } from '@/lib/localDataStore';
import { successResponse, errorResponse } from '@/lib/apiHelpers';

function validateShippingAddress(shippingAddress = {}) {
  const fullName = shippingAddress.fullName?.trim();
  const address = shippingAddress.address?.trim();
  const city = shippingAddress.city?.trim();
  const state = shippingAddress.state?.trim();
  const pinCode = shippingAddress.pinCode?.trim();
  const phone = shippingAddress.phone?.trim();

  if (!fullName || fullName.length < 2) {
    return 'Please enter the full name for delivery';
  }

  if (!address || address.length < 8) {
    return 'Please enter a complete street address';
  }

  if (!city) {
    return 'Please enter the delivery city';
  }

  if (!state) {
    return 'Please select the delivery state';
  }

  if (!/^\d{6}$/.test(pinCode ?? '')) {
    return 'PIN code must be 6 digits';
  }

  if (!/^(\+91[\s-]?)?\d{10}$/.test(phone ?? '')) {
    return 'Phone number must be 10 digits';
  }

  return null;
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return errorResponse('Unauthorized', 401);
    }

    const body = await req.json();
    const { orderItems, shippingAddress, paymentMethod, totalPrice, isPaid, paidAt } = body;

    if (!orderItems || orderItems.length === 0) {
      return errorResponse('No order items', 400);
    }

    const validationError = validateShippingAddress(shippingAddress);

    if (validationError) {
      return errorResponse(validationError, 400);
    }

    const normalizedOrderItems = orderItems.map((item) => ({
        product: mongoose.Types.ObjectId.isValid(item.product) ? item.product : undefined,
        productIdSnapshot: item.product,
        name: item.name,
        image: item.image,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
    }));

    try {
      await connectToDatabase();

      const order = new Order({
          user: session.user.id,
          orderItems: normalizedOrderItems,
          shippingAddress,
          paymentMethod,
          totalPrice,
          isPaid: isPaid || false,
          paidAt: paidAt || null,
          status: 'Pending',
      });

      const savedOrder = await order.save();

      return successResponse({ message: 'Order created', order: savedOrder }, 201);
    } catch (dbError) {
      console.warn('Create order falling back to local store:', dbError);

      const savedOrder = await createLocalOrder({
        user: session.user.id,
        orderItems: normalizedOrderItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
        isPaid: isPaid || false,
        paidAt: paidAt || null,
        status: 'Pending',
      });

      return successResponse({ message: 'Order created', order: savedOrder, fallback: true }, 201);
    }
  } catch (error) {
    console.error('Create Order Error:', error);
    return errorResponse('Server Error', 500);
  }
}

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
    
        if (!session) {
            return errorResponse('Unauthorized', 401);
        }
    
        try {
          await connectToDatabase();
      
          const orders = await Order.find({ user: session.user.id }).sort({ createdAt: -1 });
      
          return successResponse({ count: orders.length, orders }, 200);
        } catch (dbError) {
          console.warn('Get orders falling back to local store:', dbError);
          const orders = await getLocalOrdersByUserId(session.user.id);
          return successResponse({ count: orders.length, orders, fallback: true }, 200);
        }
      } catch (error) {
        console.error('Get Orders Error:', error);
        return errorResponse('Server Error', 500);
      }
}
