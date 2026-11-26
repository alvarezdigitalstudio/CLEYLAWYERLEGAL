import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PracticeAreaTemplate } from '@/components/PracticeAreaTemplate';
import { PRACTICE_AREAS_17, getPracticeAreaBySlug } from '@/lib/legal-data';
import { PRACTICE_AREA_IMAGES } from '@/lib/practice-images';
import { getSiteUrl } from '@/lib/seo-config';

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

  const areaImage = PRACTICE_AREA_IMAGES[area.slug];
  const ogImageUrl = areaImage ? areaImage.src : '/og-cleylawyerlegal.jpg';

  return {
    title: area.seoTitle,
    description: area.seoDescription,
    keywords: [area.primaryKeyword, ...area.secondaryKeywords, 'CleyLawyerLegal'],
    alternates: {
      canonical: `/${area.slug}`,
    },
    openGraph: {
      title: area.seoTitle,
      description: area.seoDescription,
      type: 'article',
      locale: 'es_PA',
      url: `${siteUrl}/${area.slug}`,
      siteName: 'CleyLawyerLegal',
      images: [
        {
          url: ogImageUrl,
          alt: area.imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: area.seoTitle,
      description: area.seoDescription,
      images: [ogImageUrl],
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

  return <PracticeAreaTemplate area={area} siteUrl={getSiteUrl()} />;
}
