'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, X } from 'lucide-react';
import {
  BLOG_ARTICLES,
  BLOG_CATEGORIES,
  BRAND_INFO,
  type BlogArticle,
  type BlogCategory,
} from '@/lib/legal-data';
import { filterBlogArticles } from '@/lib/legal-logic';

interface BlogSectionProps {
  onScheduleFromArticle: (topic: string) => void;
}

export function BlogSection({ onScheduleFromArticle }: BlogSectionProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<BlogCategory>('Todos');
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  const visibleArticles = filterBlogArticles(BLOG_ARTICLES, selectedCategory);

  useEffect(() => {
    if (!activeArticle) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveArticle(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeArticle]);

  return (
    <section
      id="blog"
      className="bg-[#FFFFFF] py-16 md:py-24 border-t border-[#EEEEEE]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#080808] text-balance">
              Actualidad y Criterio Legal
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#555555]">
              Publicaciones prácticas sobre defensa penal, prevención jurídica y
              normativa vigente en Panamá.
            </p>
            <div
              className="w-16 h-[2px] bg-[#D99A19] mt-5"
              aria-hidden="true"
            />
          </div>

          <div
            role="tablist"
            aria-label="Filtrar artículos del blog"
            className="flex flex-wrap items-center gap-2 bg-[#EEEEEE] p-1.5"
          >
            {BLOG_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#080808] text-[#FFFFFF]'
                      : 'text-[#171717] hover:text-[#080808] hover:bg-[#FFFFFF]/70'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleArticles.map((article) => (
            <article
              key={article.id}
              className="border border-[#EEEEEE] bg-[#FFFFFF] p-7 flex flex-col justify-between transition-colors duration-200 hover:border-[#D99A19]"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-[#555555]">
                  <span className="font-semibold text-[#080808]">
                    {article.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{article.dateLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="mt-3 font-serif text-xl font-semibold text-[#080808] leading-snug">
                  {article.title}
                </h3>

                <p className="mt-3 text-sm text-[#555555] leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EEEEEE] flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setActiveArticle(article)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#080808] hover:text-[#D99A19] transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#D99A19]" aria-hidden="true" />
                  <span>Leer artículo</span>
                </button>
                <Link
                  href={`/${article.relatedSlug}`}
                  className="text-xs font-medium text-[#555555] hover:text-[#080808] underline underline-offset-4"
                >
                  Ver área
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
          className="fixed inset-0 z-50 bg-[#080808]/75 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setActiveArticle(null);
            }
          }}
        >
          <div className="bg-[#FFFFFF] border border-[#D99A19]/40 max-w-2xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-10 relative">
            <button
              type="button"
              onClick={() => setActiveArticle(null)}
              aria-label="Cerrar artículo"
              className="absolute top-5 right-5 w-10 h-10 border border-[#EEEEEE] text-[#080808] flex items-center justify-center hover:border-[#D99A19] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2 text-xs text-[#555555] pr-12">
              <span className="font-semibold text-[#080808]">
                {activeArticle.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>{activeArticle.dateLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{activeArticle.readTime}</span>
            </div>

            <h3
              id="article-modal-title"
              className="mt-3 font-serif text-2xl sm:text-3xl font-semibold text-[#080808] leading-snug pr-8"
            >
              {activeArticle.title}
            </h3>

            <p className="mt-2 text-xs text-[#555555]">
              Por <span className="font-medium text-[#080808]">{BRAND_INFO.lawyerName}</span> · Idoneidad {BRAND_INFO.licenseId}
            </p>

            <div className="w-16 h-[2px] bg-[#D99A19] my-5" aria-hidden="true" />

            <div className="space-y-4 text-base text-[#171717] leading-relaxed">
              {activeArticle.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#EEEEEE] flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const title = activeArticle.title;
                    setActiveArticle(null);
                    onScheduleFromArticle(`Consulta sobre: ${title}`);
                  }}
                  className="px-6 py-3 bg-[#D99A19] text-[#FFFFFF] text-sm font-semibold hover:bg-[#171717] transition-colors cursor-pointer"
                >
                  Consultar con el abogado
                </button>
                <Link
                  href={`/${activeArticle.relatedSlug}`}
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-3 border border-[#080808] text-sm font-semibold text-[#080808] hover:bg-[#080808] hover:text-[#FFFFFF] transition-colors"
                >
                  Ir al área jurídica
                </Link>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="px-5 py-3 border border-[#EEEEEE] text-sm font-medium text-[#080808] hover:border-[#080808] transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
