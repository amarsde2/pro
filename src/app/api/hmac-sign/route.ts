// app/api/hmac-sign/route.ts (Next.js API route)
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  const { path } = await req.json(); // e.g. "/api/subscribe?email=xyz"

  const secret = process.env.HMAC_SECRET!;
  const signature = crypto.createHmac('sha256', secret).update(path).digest('hex');

  return NextResponse.json({ signature });
}
