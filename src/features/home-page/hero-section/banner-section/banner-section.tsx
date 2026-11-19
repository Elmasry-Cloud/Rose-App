import Image from 'next/image';
import { MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import BannerCard from '@/assets/images/banner-home-page/Hero-Section-Banner (1).png';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import CarouselCustomDots from './banner-carousel';

const darkSecondary = 'dark:bg-maroon-50 dark:text-maroon-800 dark:hover:bg-maroon-100';

export default function BannerHomePage() {
  // Translations
  const t = useTranslations('home-page.hero-section.banner');

  return (
    <section
      aria-labelledby="banner-heading"
      className="banner mt-10 flex w-full items-stretch justify-between gap-6.25 lg:h-110.25"
    >
      {/* Banner Card */}
      <article className="card relative hidden h-full overflow-hidden rounded-2xl lg:block lg:min-w-75">
        <div className="pointer-events-none absolute inset-0 bg-black/20" aria-hidden="true" />

        <Image
          src={BannerCard}
          alt=""
          placeholder="blur"
          width={300}
          height={439}
          className="h-full w-full object-cover"
        />

        <div className="absolute bottom-0 p-6">
          <p className="w-fit rounded-full bg-maroon-50 px-2 py-0.5 text-xs font-medium leading-4 text-maroon-600">
            {t('card-title')}
          </p>

          <h2 className="my-2.5 min-h-19.5 text-2xl font-semibold text-white">
            {t('card-description')}
          </h2>

          <Button
            nativeButton={false}
            render={<Link href="/products" />}
            variant="secondary"
            className={cn('group py-2.5', darkSecondary)}
          >
            {t('card-button')}
            <MoveRight
              className="size-4 rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Button>
        </div>
      </article>

      {/* Banner Carousel */}
      <div className="banner-carousel relative h-96 w-full flex-1 overflow-hidden rounded-2xl lg:h-full">
        <div
          className="pointer-events-none absolute inset-0 z-10 bg-linear-to-r from-black/80 to-black/0 rtl:bg-linear-to-l"
          aria-hidden="true"
        />

        {/* Carousel */}
        <CarouselCustomDots />

        {/* Carousel Card Info */}
        <div className="absolute inset-s-9 bottom-9 z-10 flex w-fit flex-col gap-1.5">
          <h1 id="banner-heading" className="text-4xl font-semibold text-white">
            {t('carousel-title')}
          </h1>

          <p className="min-h-12 text-base font-normal leading-6 text-white">
            {t('carousel-description')}
          </p>

          <Button
            nativeButton={false}
            render={<Link href="/products" />}
            variant="secondary"
            className={cn('w-fit py-2.5', darkSecondary)}
          >
            {t('carousel-button')}
          </Button>
        </div>
      </div>
    </section>
  );
}
