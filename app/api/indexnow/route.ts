import crypto from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import {
  getAllPublicUrls,
  getIndexNowKey,
  getSiteUrl,
  validateIndexNowUrls,
} from '@/lib/seo-config';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const rateLimitBuckets = new Map<string, number[]>();

const NOINDEX_HEADERS = {
  'X-Robots-Tag': 'noindex, nofollow',
  'Cache-Control': 'no-store',
} as const;

function getClientIdentifier(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

function checkRateLimit(clientKey: string, now = Date.now()): {
  allowed: boolean;
  retryAfterSeconds: number;
} {
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const existing = (rateLimitBuckets.get(clientKey) || []).filter(
    (ts) => ts > cutoff,
  );

  if (existing.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldest = existing[0] ?? now;
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000),
    );
    rateLimitBuckets.set(clientKey, existing);
    return { allowed: false, retryAfterSeconds };
  }

  existing.push(now);
  rateLimitBuckets.set(clientKey, existing);
  return { allowed: true, retryAfterSeconds: 0 };
}

function verifyAdminToken(authHeader: string | null, expectedSecret: string): boolean {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  const provided = authHeader.slice('Bearer '.length).trim();
  const a = Buffer.from(provided, 'utf8');
  const b = Buffer.from(expectedSecret, 'utf8');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  const rateStatus = checkRateLimit(getClientIdentifier(request));
  if (!rateStatus.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Demasiadas solicitudes. Intente nuevamente en unos segundos.',
      },
      {
        status: 429,
        headers: {
          ...NOINDEX_HEADERS,
          'Retry-After': String(rateStatus.retryAfterSeconds),
        },
      },
    );
  }

  const adminSecret = process.env.INDEXNOW_ADMIN_SECRET?.trim();
  if (!adminSecret) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'INDEXNOW_ADMIN_SECRET no está configurado en el servidor. Configure la variable para autorizar envíos.',
      },
      { status: 503, headers: NOINDEX_HEADERS },
    );
  }

  const authHeader = request.headers.get('authorization');
  if (!verifyAdminToken(authHeader, adminSecret)) {
    return NextResponse.json(
      { ok: false, error: 'No autorizado.' },
      { status: 401, headers: NOINDEX_HEADERS },
    );
  }

  const indexNowKey = getIndexNowKey();
  if (!indexNowKey) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'INDEXNOW_KEY no está configurado o no tiene el formato válido (8-128 caracteres alfanuméricos o guiones).',
      },
      { status: 503, headers: NOINDEX_HEADERS },
    );
  }

  const siteUrl = getSiteUrl();
  let body: { urls?: unknown } = {};
  try {
    const raw = await request.text();
    if (raw.trim().length > 0) {
      body = JSON.parse(raw) as { urls?: unknown };
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Cuerpo JSON inválido.' },
      { status: 400, headers: NOINDEX_HEADERS },
    );
  }

  const candidateUrls =
    body.urls !== undefined ? body.urls : getAllPublicUrls(siteUrl);

  const validation = validateIndexNowUrls(candidateUrls, siteUrl);
  if (!validation.valid) {
    return NextResponse.json(
      { ok: false, error: validation.error },
      { status: 400, headers: NOINDEX_HEADERS },
    );
  }

  const parsedSite = new URL(siteUrl);
  const payload = {
    host: parsedSite.host,
    key: indexNowKey,
    keyLocation: `${siteUrl}/${indexNowKey}.txt`,
    urlList: validation.urls,
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          status: response.status,
          error: 'IndexNow rechazó la notificación.',
          details: responseText.slice(0, 300),
        },
        { status: 502, headers: NOINDEX_HEADERS },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        submittedCount: validation.urls.length,
        indexNowStatus: response.status,
        keyLocation: payload.keyLocation,
      },
      { headers: NOINDEX_HEADERS },
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: 'No fue posible conectar con api.indexnow.org.' },
      { status: 502, headers: NOINDEX_HEADERS },
    );
  }
}
