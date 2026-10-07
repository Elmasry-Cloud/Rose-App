import { Suspense } from 'react';
import { getOccasions } from '@/features/api/get-products/get-products.api';
import { MostPopularFallback } from '@/shared/components/skeletons/occasions-filter-skeleton';
import OccasionsFilter from './most-popular-list';

async function MostPopularContent() {
  // Get occasions
  const occasions = await getOccasions({ page: 1, limit: 12 });

  return <OccasionsFilter occasions={occasions.data} />;
}

export default function MostPopularSection() {
  return (
    <section aria-labelledby="most-popular-heading" className="w-4/5 mx-auto">
      <Suspense fallback={<MostPopularFallback />}>
        <MostPopularContent />
      </Suspense>
    </section>
  );
}
