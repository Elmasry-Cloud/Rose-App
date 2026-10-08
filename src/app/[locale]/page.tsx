import BannerHomePage from '@/features/home-page/hero-section/banner-section/banner-section';
import FeaturesSection from '@/features/home-page/features-section/features-section';
import OccasionsSection from '@/features/home-page/hero-section/occasions-section/occasions-section';
import HeaderSection from '@/shared/components/header-section';
import MostPopularSection from '@/features/home-page/most-popular/most-popular';
import AboutSection from '@/features/home-page/about/about';
import GallerySection from '@/features/home-page/gallery/gallery';
import TestimonialsSection from '@/features/home-page/testimnials/testimonials';
import CompaniesSection from '@/features/home-page/compaines/companies';
import FooterSection from '@/features/home-page/footer/footer';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  // Translation
  const t = useTranslations('home-page');

  return (
    <>
      <div className="w-11/12 mx-auto">
        {/* Hero Section */}
        <BannerHomePage />
        <OccasionsSection />
        <FeaturesSection />

        {/* Most Popular Section */}
        <MostPopularSection />

        {/* About Section */}
        <AboutSection />

        {/* Gallery Section */}
        <GallerySection />
      </div>

      {/* Testimonials Section */}
      <HeaderSection
        sectionTitle={t('testimonials.title')}
        sectionText={t('testimonials.subtitle')}
      />
      <TestimonialsSection />

      {/* Companies Section */}
      <CompaniesSection />

      {/* Footer Section */}
      <FooterSection />
    </>
  );
}
