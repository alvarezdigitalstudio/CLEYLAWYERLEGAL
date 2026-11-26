import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PracticeAreaTemplate } from '@/components/PracticeAreaTemplate';
import { PRACTICE_AREAS_17, getPracticeAreaBySlug } from '@/lib/legal-data';

const siteUrl = process.env.APP_URL || 'https://cleylawyerlegal.com';

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

  if (!area) {
    return {
      title: 'Área jurídica no encontrada | CleyLawyerlegal',
    };
  }

  return {
    title: area.seoTitle,
    description: area.seoDescription,
    keywords: [area.primaryKeyword, ...area.secondaryKeywords, 'CleyLawyerlegal'],
    alternates: {
      canonical: `/${area.slug}`,
    },
    openGraph: {
      title: area.seoTitle,
      description: area.seoDescription,
      type: 'article',
      locale: 'es_PA',
      url: `${siteUrl}/${area.slug}`,
      siteName: 'CleyLawyerlegal',
    },
    twitter: {
      card: 'summary_large_image',
      title: area.seoTitle,
      description: area.seoDescription,
    },
  };
}

export default async function PracticeAreaPage({
  params,
}: PracticeAreaPageProps) {
  const { slug } = await params;
  const area = getPracticeAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  return <PracticeAreaTemplate area={area} siteUrl={siteUrl} />;
}
