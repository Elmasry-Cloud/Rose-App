'use client';

import { useState } from 'react';
import { MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import HeaderSection from '@/shared/components/header-section';
import ProductCard from '@/shared/components/product-card';
import { Occasion2 } from '@/shared/lib/types/get-api-response';
import { cn } from '@/shared/lib/utils';

type MostPopularListProps = {
  occasions: Occasion2[];
};

export default function OccasionsFilter({ occasions }: MostPopularListProps) {
  // Translations
  const t = useTranslations('home-page.most-popular');

  // State
  const [selectedId, setSelectedId] = useState<string | undefined>(occasions[0]?.id);

  if (occasions.length === 0) {
    return <p className="text-ds-text-primary">{t('empty')}</p>;
  }

  return (
    <>
      <header className="mb-10 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Header Section */}
        <HeaderSection sectionText={t('title')} id="most-popular-heading" style="text-2xl w-fit" />

        {/* Occasions List */}
        <ul aria-label={t('filter-label')} className="flex flex-wrap items-center gap-3 md:gap-6">
          {occasions.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                aria-pressed={selectedId === item.id}
                onClick={() => setSelectedId(item.id)}
                className={cn(
                  'cursor-pointer rounded text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2',
                  selectedId === item.id
                    ? 'font-semibold text-ds-text-primary underline underline-offset-4'
                    : 'text-ds-text-plain'
                )}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </header>

      {/* Products */}
      <div aria-live="polite">{selectedId && <ProductCard occasionId={selectedId} />}</div>

      {/* View More Button */}
      <Link
        href="/products"
        className="group ms-auto mt-10 flex w-fit cursor-pointer items-center gap-2.5 text-base font-semibold text-ds-text-primary transition-colors hover:text-ds-text-secondary"
      >
        {t('view-more')}
        <MoveRight
          aria-hidden="true"
          className="size-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
        />
      </Link>
    </>
  );
}
