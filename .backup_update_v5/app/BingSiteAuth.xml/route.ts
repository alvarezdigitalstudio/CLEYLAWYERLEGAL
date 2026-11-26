import { NextResponse } from 'next/server';
import {
  buildBingSiteAuthXml,
  getBingVerificationCode,
} from '@/lib/seo-config';

export const dynamic = 'force-dynamic';

export async function GET() {
  const code = getBingVerificationCode();

  if (!code) {
    return new NextResponse(
      'Bing Webmaster Tools verification code (BING_SITE_VERIFICATION) is not configured yet.',
      {
        status: 404,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-store',
        },
      },
    );
  }

  return new NextResponse(buildBingSiteAuthXml(code), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
