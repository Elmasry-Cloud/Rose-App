import { getOccasions } from '@/features/api/get-products/get-products.api';
import OccasionsFilter from './most-popular-list';

export default async function MostPopularSection() {
  // Get occasions
  const occasions = await getOccasions({ page: 1, limit: 12 });

  return (
    <section aria-labelledby="most-popular-heading" className="w-4/5 mx-auto">
      <OccasionsFilter occasions={occasions.data} />
    </section>
  );
}
