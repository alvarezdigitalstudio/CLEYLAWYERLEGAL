import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PracticeAreaTemplate } from '@/components/PracticeAreaTemplate';
import { PRACTICE_AREAS_17, getPracticeAreaBySlug } from '@/lib/legal-data';
import { buildSocialMetadata, getSiteUrl } from '@/lib/seo-config';

interface PracticeAreaPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRACTICE_AREAS_17.map((area) => ({
    slug: area.slug,
  }));
}

export async function generateMetadata({
  params,
}: PracticeAreaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getPracticeAreaBySlug(slug);
  const siteUrl = getSiteUrl();

  if (!area) {
    return {
      title: 'Área jurídica no encontrada | CleyLawyerLegal',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildSocialMetadata({
    siteUrl,
    path: `/${area.slug}`,
    title: area.seoTitle,
    description: area.seoDescription,
    type: 'article',
    keywords: [area.primaryKeyword, ...area.secondaryKeywords, 'CleyLawyerLegal'],
  });
}

export default async function PracticeAreaPage({
  params,
}: PracticeAreaPageProps) {
  const { slug } = await params;
  const area = getPracticeAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  return <PracticeAreaTemplate area={area} siteUrl={getSiteUrl()} />;
}
