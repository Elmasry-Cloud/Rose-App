import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import getProducts from '@/features/api/get-products/get-products.api';
import CarouselProduct from '@/shared/components/carousel-product';
import CarouselProductSkeleton from '@/shared/components/skeletons/carousel-skeleton';
import { Button } from '@/shared/components/ui/button';
import { MoveRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

const carouselConfig = {
  itemsPerView: 1,
  itemsPerViewSm: 2,
  itemsPerViewLg: 3,
};

async function BestSellingCarousel() {
  // Translations
  const t = await getTranslations('home-page.best-selling');

  // API Call
  const { data } = await getProducts({ sortBy: 'bestSelling' });
  const products = data ?? [];

  // Empty State
  if (products.length === 0) {
    return <p className="text-ds-text-primary">{t('empty')}</p>;
  }

  return <CarouselProduct products={products} label={t('carouselLabel')} {...carouselConfig} />;
}

export default async function BestSellingSection() {
  // Translations
  const t = await getTranslations('home-page.best-selling');

  return (
    <section
      aria-labelledby="best-selling-heading"
      className="mb-34.5 mt-26.75 grid grid-cols-1 lg:grid-cols-6 gap-9"
    >
      {/* Text Content */}
      <div className="col-span-1 lg:col-span-2 flex flex-col gap-2.5">
        <p className="font-bold text-base uppercase text-ds-text-secondary tracking-[0.25em]">
          {t('text')}
        </p>

        {/* Title and Description */}
        <div className="flex flex-col gap-2 grow">
          <h2 id="best-selling-heading" className="font-bold text-3xl text-ds-text-primary">
            {t.rich('title', {
              accent: (chunks) => <span className="text-ds-text-secondary">{chunks}</span>,
            })}
          </h2>

          <p className="font-normal text-base text-ds-text-soft">{t('description')}</p>
        </div>

        {/* Button */}
        <Button
          nativeButton={false}
          render={<Link href="/products" />}
          variant="primary"
          className="w-fit"
        >
          {t('btn')}
          <MoveRight aria-hidden="true" className="rtl:rotate-180" />
        </Button>
      </div>

      {/* Carousel */}
      <div className="col-span-1 lg:col-span-4 min-w-0">
        <Suspense fallback={<CarouselProductSkeleton count={4} {...carouselConfig} />}>
          <BestSellingCarousel />
        </Suspense>
      </div>
    </section>
  );
}
