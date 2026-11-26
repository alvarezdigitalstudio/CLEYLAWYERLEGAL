import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/seo-config';

export const dynamic = 'force-dynamic';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  const rules: MetadataRoute.Robots['rules'] = [
    // Rastreador oficial de ChatGPT Search (distinto de GPTBot de entrenamiento)
    {
      userAgent: 'OAI-SearchBot',
      allow: '/',
      disallow: ['/api/'],
    },
    {
      userAgent: 'ChatGPT-User',
      allow: '/',
      disallow: ['/api/'],
    },
    {
      userAgent: 'Googlebot',
      allow: '/',
      disallow: ['/api/'],
    },
    {
      userAgent: 'Bingbot',
      allow: '/',
      disallow: ['/api/'],
    },
    {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
  ];

  // Opcional: si el titular desea bloquear únicamente el entrenamiento de modelos (GPTBot)
  // sin afectar a OAI-SearchBot ni a buscadores, puede definir BLOCK_GPTBOT_TRAINING="true".
  if (process.env.BLOCK_GPTBOT_TRAINING === 'true') {
    rules.push({
      userAgent: 'GPTBot',
      disallow: '/',
    });
  }

  return {
    rules,
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
