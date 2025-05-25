import { sanitizeObject } from '@/utils/sanitizer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const raw = await req.json(); // body still readable here
  const sanitized = sanitizeObject(raw);

  // Use sanitized data
  return NextResponse.json({ message: 'Sanitized input', data: sanitized });
}