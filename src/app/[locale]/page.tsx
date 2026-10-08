import BannerHomePage from '@/features/home-page/hero-section/banner-section/banner-section';
import FeaturesSection from '@/features/home-page/features-section/features-section';
import OccasionsSection from '@/features/home-page/hero-section/occasions-section/occasions-section';

export default async function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="w-4/5 mx-auto">
        <BannerHomePage />
        <OccasionsSection />
        <FeaturesSection />
      </div>
    </div>
  );
}
