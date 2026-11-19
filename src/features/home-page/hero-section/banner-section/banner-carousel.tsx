'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import Image2 from '@/assets/images/banner-home-page/Hero-Section-Banner (2).png';
import Image3 from '@/assets/images/banner-home-page/Hero-Section-Banner (3).png';
import Image4 from '@/assets/images/banner-home-page/Hero-Section-Banner (4).png';
import Image5 from '@/assets/images/banner-home-page/Hero-Section-Banner (5).png';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/shared/components/ui/carousel';
import { cn } from '@/shared/lib/utils';

const images = [Image2, Image3, Image4, Image5];

const arrowClass =
  'static h-7.5 w-7.5 translate-y-0 cursor-pointer rounded-full border-0 bg-transparent text-maroon-700 transition-colors hover:bg-maroon-100 hover:text-maroon-700 focus-visible:ring-2 focus-visible:ring-ds-bg-primary';

export default function CarouselCustomDots() {
  const locale = useLocale();
  const t = useTranslations('home-page.hero-section.banner');
  const isRTL = locale === 'ar';

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const update = () => setCurrent(api.selectedScrollSnap());
    const timeout = setTimeout(update);

    api.on('select', update);
    return () => {
      clearTimeout(timeout);
      api.off('select', update);
    };
  }, [api]);

  return (
    <div className="relative h-full w-full">
      <Carousel
        setApi={setApi}
        opts={{ direction: isRTL ? 'rtl' : 'ltr', loop: true }}
        aria-label={t('carousel-label')}
        className="h-full w-full"
      >
        <CarouselContent className="h-full ms-0">
          {images.map((src, index) => (
            <CarouselItem key={index} className="h-full ps-0">
              <figure className="relative h-full w-full">
                <Image
                  src={src}
                  alt=""
                  fill
                  placeholder="blur"
                  priority={index === 0}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="rounded-2xl object-cover"
                />
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute inset-e-8 bottom-12 z-40 flex h-8.5 translate-y-1/2 items-center justify-between gap-2 rounded-full bg-maroon-50">
          <CarouselPrevious variant="ghost" className={cn(arrowClass, isRTL && 'rotate-180')} />
          <CarouselNext variant="ghost" className={cn(arrowClass, isRTL && 'rotate-180')} />
        </div>
      </Carousel>

      {/* Dots */}
      <div
        role="group"
        aria-label={t('slides-label')}
        className="absolute inset-e-8 top-8 z-20 flex gap-1.5"
      >
        {images.map((_, index) => {
          const isActive = index === current;

          return (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              aria-label={t('slide-label', { number: index + 1 })}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'h-2.5 cursor-pointer rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-bg-primary focus-visible:ring-offset-2',
                isActive
                  ? 'w-8 bg-ds-bg-primary'
                  : 'w-2.5 bg-ds-bg-primary-fade hover:bg-ds-bg-primary-faint'
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
