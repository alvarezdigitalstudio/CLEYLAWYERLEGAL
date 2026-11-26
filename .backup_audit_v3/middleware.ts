import { NextRequest, NextResponse } from 'next/server';
import { getIndexNowKey } from '@/lib/seo-config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/robots.txt' || !pathname.endsWith('.txt')) {
    return NextResponse.next();
  }

  const configuredKey = getIndexNowKey();
  if (configuredKey && pathname === `/${configuredKey}.txt`) {
    return new NextResponse(configuredKey, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=300',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/|api/|assets/|favicon.ico).*)'],
};
