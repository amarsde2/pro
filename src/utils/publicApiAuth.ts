// lib/auth/publicApiAuth.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ALLOWED_ORIGIN = process.env.NEXT_PUBLIC_API_URL || 'https://amaraiverse.com/';
const RATE_LIMIT = 100; // requests per 24h
const RATE_LIMIT_WINDOW_SECONDS = 60 * 60 * 24; // 24h

interface Options {
  allowedIPs?: string[];
  requireHMAC?: boolean;
  rateLimit?: boolean;
}

// ✅ Origin check: only allow requests from your site
function isAllowedOrigin(referer: string | null): boolean {
  return referer?.startsWith(ALLOWED_ORIGIN) ?? false;
}

// ✅ IP allowlist
function isAllowedIP(ip: string | null, allowedIPs?: string[]): boolean {
  if (!allowedIPs) return true;
  if (!ip) return false;
  return allowedIPs.includes(ip);
}

// ✅ HMAC validation
function isValidHMAC(req: NextRequest): boolean {
  const received = req.headers.get('x-auth-signature');
  const secret = process.env.HMAC_SECRET;
  if (!received || !secret) return false;

  const urlToSign = req.nextUrl.pathname + req.nextUrl.search;
  const expected = crypto.createHmac('sha256', secret).update(urlToSign).digest('hex');

  return expected === received;
}

// ✅ Redis-based rate limiter
async function isRateLimited(ip: string): Promise<boolean> {
  const key = `public_api:${ip}`;
  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, RATE_LIMIT_WINDOW_SECONDS);
  }

  return count > RATE_LIMIT;
}

// ✅ Public middleware function
export function publicApiAuth(
  handler: (req: NextRequest) => Promise<NextResponse>,
  options: Options = {}
) {
  return async function (req: NextRequest) {
    const referer = req.headers.get('referer') || req.headers.get('origin');
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '';
   
    console.log(referer);
    console.log(ip);

    // 1. Allow only known origin
    if (!isAllowedOrigin(referer)) {
      return NextResponse.json({ error: 'Unauthorized origin' }, { status: 401 });
    }

    // 2. Optional HMAC verification
    if (options.requireHMAC && !isValidHMAC(req)) {
      return NextResponse.json({ error: 'Invalid HMAC signature' }, { status: 401 });
    }

    // 3. Optional IP allowlist
    if (!isAllowedIP(ip, options.allowedIPs)) {
      return NextResponse.json({ error: 'IP not allowed' }, { status: 401 });
    }

    // 4. Optional Redis rate limit
    if (options.rateLimit && ip) {
      const limited = await isRateLimited(ip);
      if (limited) {
        return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
      }
    }

    // 5. Proceed to handler
    return handler(req);
  };
}
