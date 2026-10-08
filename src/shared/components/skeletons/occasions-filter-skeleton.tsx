import { PRODUCTS_LIMIT } from '@/shared/lib/website/constant/shared-constant';
import ProductCardSkeleton from './product-skeleton';

export default function OccasionsFilterSkeleton() {
  return (
    <ul className="flex items-center gap-6 animate-pulse">
      {['w-16', 'w-20', 'w-14', 'w-18'].map((width, index) => (
        <li key={index} className={`h-5 rounded bg-gray-200 ${width}`} />
      ))}
    </ul>
  );
}

export function MostPopularFallback() {
  return (
    <section className="w-4/5 mx-auto" role="status">
      <span className="sr-only">Loading products…</span>

      <header className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-bold text-ds-text-primary">head</h2>

        {/* Skeleton in place of the occasions list */}
        <OccasionsFilterSkeleton />
      </header>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        aria-hidden="true"
      >
        {Array.from({ length: PRODUCTS_LIMIT }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
