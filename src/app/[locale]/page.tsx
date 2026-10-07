import MostPopularSection from '@/features/home-page/most-popular/most-popular';
import { MostPopularFallback } from '@/shared/components/skeletons/occasions-filter-skeleton';
import { Suspense } from 'react';

export default async function HomePage() {
  return (
    <div>
      HomePage
      <Suspense fallback={<MostPopularFallback />}>
        <MostPopularSection />
      </Suspense>
    </div>
  );
}
