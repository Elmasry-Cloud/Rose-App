import BestSellingSection from '@/features/home-page/best-selling/best-selling-section';
import MostPopularSection from '@/features/home-page/most-popular/most-popular';

export default async function HomePage() {
  return (
    <div>
      HomePage
      <BestSellingSection />
      <MostPopularSection />
    </div>
  );
}
