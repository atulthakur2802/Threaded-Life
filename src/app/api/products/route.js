import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/products';
import { MOCK_PRODUCTS } from '@/lib/mockProducts';
import { withTimeout } from '@/lib/apiHelpers';

export async function GET() {
  const startTime = Date.now();
  
  try {
    let products = [];
    let dataSource = 'mock';

    try {
      products = await withTimeout(getProducts(), 5000);
      if (Array.isArray(products) && products.length > 0) {
        dataSource = 'database';
      }
    } catch (dbError) {
      console.error('Products API database error:', dbError.message);
      products = MOCK_PRODUCTS;
      dataSource = 'fallback';
    }

    // Ensure we always have valid products
    if (!Array.isArray(products) || products.length === 0) {
      products = MOCK_PRODUCTS;
      dataSource = 'fallback';
    }

    const responseTime = Date.now() - startTime;
    console.log(`Products API: ${products.length} products from ${dataSource} in ${responseTime}ms`);

    return NextResponse.json({ 
      success: true, 
      count: products.length, 
      data: products,
      source: dataSource,
      responseTime 
    }, { status: 200 });

  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error('Products API critical error:', error);
    
    // Always return something usable
    return NextResponse.json({ 
      success: false, 
      data: MOCK_PRODUCTS,
      error: 'Using fallback products due to server error',
      source: 'emergency-fallback',
      responseTime 
    }, { status: 500 });
  }
}
