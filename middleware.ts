import { NextRequest, NextResponse } from 'next/server';
import { getIndexNowKey } from '@/lib/seo-config';

const CANONICAL_REDIRECTS: Record<string, string> = {
  '/areas': '/areas-de-practica',
  '/areas-juridicas': '/areas-de-practica',
  '/penal': '/derecho-penal',
  '/civil': '/derecho-civil',
  '/familia': '/derecho-familia',
  '/laboral': '/derecho-laboral',
  '/migratorio': '/derecho-migratorio',
  '/corporativo': '/derecho-corporativo-empresas',
  '/servicios': '/#servicios',
  '/nosotros': '/#nosotros',
  '/blog': '/#blog',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const normalizedPath =
    pathname.length > 1 && pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname;

  const redirectTarget = CANONICAL_REDIRECTS[normalizedPath.toLowerCase()];
  if (redirectTarget) {
    const destination = new URL(redirectTarget, request.url);
    return NextResponse.redirect(destination, 301);
  }

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
