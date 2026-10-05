import Testimonials from '@/features/home-page/testimnials/testimonials';
import HeaderSection from '@/shared/components/header-section';

export default function HomePage() {
  return (
    <div>
      HomePage
      <HeaderSection sectionTitle="Testimonials" sectionText="Real Words from Happy Customers" />
      <Testimonials />
    </div>
  );
}
