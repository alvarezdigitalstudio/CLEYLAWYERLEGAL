import crypto from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import {
  getAllPublicUrls,
  getIndexNowKey,
  getSiteUrl,
  validateIndexNowUrls,
} from '@/lib/seo-config';

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
  const adminSecret = process.env.INDEXNOW_ADMIN_SECRET?.trim();
  if (!adminSecret) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'INDEXNOW_ADMIN_SECRET no está configurado en el servidor. Configure la variable para autorizar envíos.',
      },
      { status: 503 },
    );
  }

  const authHeader = request.headers.get('authorization');
  if (!verifyAdminToken(authHeader, adminSecret)) {
    return NextResponse.json(
      { ok: false, error: 'No autorizado.' },
      { status: 401 },
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
      { status: 503 },
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
      { status: 400 },
    );
  }

  const candidateUrls =
    body.urls !== undefined ? body.urls : getAllPublicUrls(siteUrl);

  const validation = validateIndexNowUrls(candidateUrls, siteUrl);
  if (!validation.valid) {
    return NextResponse.json(
      { ok: false, error: validation.error },
      { status: 400 },
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
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      submittedCount: validation.urls.length,
      indexNowStatus: response.status,
      keyLocation: payload.keyLocation,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'No fue posible conectar con api.indexnow.org.' },
      { status: 502 },
    );
  }
}
