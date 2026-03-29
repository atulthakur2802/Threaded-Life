import { NextResponse } from 'next/server';

export function withTimeout(promise, ms = 5000) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Request timed out')); 
    }, ms);

    promise
      .then((result) => {
        clearTimeout(timeoutId);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
}

export function successResponse(data = [], status = 200) {
  return NextResponse.json({ success: true, data, error: null }, { status });
}

export function errorResponse(message = 'Server Error', status = 500) {
  return NextResponse.json({ success: false, data: [], error: String(message) }, { status });
}

export function payloadResponse(payload, status = 200) {
  return NextResponse.json({ success: true, data: payload, error: null }, { status });
}
