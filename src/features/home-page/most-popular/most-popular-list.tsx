'use client';

import { MoveRight } from 'lucide-react';
import { useState } from 'react';
import { Occasion2 } from '@/shared/lib/types/get-api-response';
import ProductCard from '@/shared/components/product-card';
import { Link } from '@/i18n/navigation';

type MostPopularListProps = {
  occasions: Occasion2[];
};

export default function OccasionsFilter({ occasions }: MostPopularListProps) {
  // State
  const [selectedId, setSelectedId] = useState<string | undefined>(occasions[0]?.id);

  return (
    <>
      <header className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between mb-10">
        <h2 id="most-popular-heading" className="text-2xl font-bold text-ds-text-primary">
          head
        </h2>

        {/* Occasions List */}
        {occasions.length > 0 && (
          <ul
            aria-label="Filter products by occasion"
            className="flex items-center flex-wrap gap-3 md:gap-6"
          >
            {occasions.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  aria-pressed={selectedId === item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`font-medium text-base cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    selectedId === item.id
                      ? 'font-semibold text-ds-text-primary underline underline-offset-4'
                      : 'text-ds-text-plain'
                  }`}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </header>

      {/* Products */}
      {selectedId && <ProductCard occasionId={selectedId} />}

      {/* View More Button */}
      <Link
        href="/products"
        className="w-fit mt-10 ms-auto group flex items-center gap-2.5 text-ds-text-primary font-semibold text-base cursor-pointer hover:text-ds-text-secondary transition-colors"
      >
        View More
        <MoveRight className="size-5 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
      </Link>
    </>
  );
}
