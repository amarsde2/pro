import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const PROTECTED_PATHS = ['/admin', '/admin/dashboard', '/admin/blogs', '/admin/analytics'];
const PUBLIC_PATHS = ['/', '/auth/login'];

const RATE_LIMIT = 10000;
const RATE_LIMIT_WINDOW = 60 * 1000;

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

// Helpers
function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some(path => pathname.startsWith(path));
}

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.includes(pathname);
}


export async function middleware(request: NextRequest) {

  const pathname = request.nextUrl.pathname;
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const csp = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self';
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://www.google.com https://www.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    frame-src https://www.gstatic.com  https://www.google.com;
  `.replace(/\s{2,}/g, ' ').trim();

  let response = NextResponse.next();

  response.headers.set('Content-Security-Policy', csp);

  response.cookies.set('nonce', nonce, {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
  });

  const securityHeaders = {
    'X-DNS-Prefetch-Control': 'on',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'Allow',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  };

  const withSecurity = (res: NextResponse) => {
    for (const [key, value] of Object.entries(securityHeaders)) {
      res.headers.set(key, value);
    }
    return res;
  };

  try {
    if (
      pathname.startsWith('/.well-known') ||
      /\.(png|jpg|jpeg|svg|css|js|ico|webmanifest)$/.test(pathname)
    ) {
      return withSecurity(response);
    }

    const ip = request.ip || request.headers.get('x-forwarded-for')?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown';
    const key = `ratelimit:${ip}`;
    const count = await redis.incr(key);
    if (count === 1) await redis.pexpire(key, RATE_LIMIT_WINDOW);
    if (count > RATE_LIMIT) {
      return withSecurity(new NextResponse('Too Many Requests', { status: 429 }));
    }

    if (isProtectedPath(pathname) && !isPublicPath(pathname)) {
      return withSecurity(NextResponse.redirect(new URL('/auth/login', request.url)));
    }

    return withSecurity(response);
  } catch (error) {
    console.error('Middleware error:', error);
    return withSecurity(response);
  }
}