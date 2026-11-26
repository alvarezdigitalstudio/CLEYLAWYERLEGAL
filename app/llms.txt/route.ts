import { NextResponse } from 'next/server';
import { BRAND_INFO, PRACTICE_AREAS_17, SERVICES } from '@/lib/legal-data';
import { getSiteUrl } from '@/lib/seo-config';

export const dynamic = 'force-dynamic';

export async function GET() {
  const siteUrl = getSiteUrl();
  const penalArea = PRACTICE_AREAS_17[0];

  const lines = [
    `# ${BRAND_INFO.name}`,
    `> ${BRAND_INFO.slogan}`,
    '',
    '## Perfil Profesional Verificado',
    `- Titular: ${BRAND_INFO.lawyerName}`,
    `- Profesión: ${BRAND_INFO.profession}`,
    `- Idoneidad profesional: ${BRAND_INFO.licenseId}`,
    `- Formación académica: ${BRAND_INFO.education}`,
    `- Trayectoria: ${BRAND_INFO.experience}`,
    `- Área principal: ${BRAND_INFO.primaryFocus}`,
    `- Ubicación: ${BRAND_INFO.fullAddress}`,
    `- Teléfono y WhatsApp: ${BRAND_INFO.phoneDisplay}`,
    `- Correo electrónico: ${BRAND_INFO.email}`,
    `- Modalidades de atención: Presencial en David (Chiriquí), videollamada y llamada telefónica`,
    `- Cobertura: Desde David, Chiriquí para todo Panamá`,
    '',
    '## Páginas Principales',
    `- Inicio: ${siteUrl}/`,
    `- Catálogo de 17 áreas jurídicas: ${siteUrl}/areas-de-practica`,
    `- Contacto y consulta directa: ${siteUrl}/contacto`,
    '',
    '## Servicios Principales',
    ...SERVICES.map((s) => `- ${s.title}: ${s.detail} (${siteUrl}${s.targetHref})`),
    '',
    '## 17 Áreas de Práctica Jurídica',
    ...PRACTICE_AREAS_17.map(
      (area) => `- ${area.number}. ${area.name} (${area.family}): ${siteUrl}/${area.slug}`,
    ),
    ...(penalArea
      ? [
          '',
          '## Preguntas Frecuentes Verificadas (Derecho Penal y Cumplimiento)',
          ...penalArea.faqs.map((faq) => `- ${faq.question}: ${faq.answer}`),
        ]
      : []),
    '',
    '## Información Legal y Privacidad',
    `- Marco de Protección y Relación Profesional: ${siteUrl}/marco-de-proteccion-profesional`,
    `- Política de Privacidad: ${siteUrl}/politica-de-privacidad`,
    `- Aviso Legal: ${siteUrl}/aviso-legal`,
    `- Términos y Condiciones: ${siteUrl}/terminos-y-condiciones`,
    `- Política de Cookies: ${siteUrl}/politica-de-cookies`,
    `- Sitemap XML: ${siteUrl}/sitemap.xml`,
    '',
  ];

  return new NextResponse(lines.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
