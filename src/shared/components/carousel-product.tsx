import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import CardItem from './card-item';
import { Product } from '../lib/types/get-api-response';
import { CSSProperties } from 'react';
import { useLocale } from 'next-intl';

interface CarouselProductProps {
  products: Product[];
  itemsPerView?: number;
  itemsPerViewSm?: number;
  itemsPerViewLg?: number;
  label?: string;
}

export default function CarouselProduct({
  products,
  itemsPerView = 2,
  itemsPerViewSm = 2,
  itemsPerViewLg = 3,
  label = 'Products',
}: CarouselProductProps) {
  // Style
  const style = {
    '--items': itemsPerView,
    '--items-sm': itemsPerViewSm,
    '--items-lg': itemsPerViewLg,
  } as CSSProperties;

  // Locale
  const locale = useLocale();
  const isRtl = locale === 'ar';
  return (
    <Carousel
      opts={{
        align: 'start',
        direction: isRtl ? 'rtl' : 'ltr',
        slidesToScroll: 1,
      }}
      className="w-full"
      style={style}
      aria-label={label}
    >
      <CarouselContent className="items-stretch">
        {/* Carousel Items */}
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="basis-[calc(100%/var(--items))] sm:basis-[calc(100%/var(--items-sm))] lg:basis-[calc(100%/var(--items-lg))]"
          >
            <CardItem product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Carousel Navigation */}
      <CarouselPrevious variant="primary" />
      <CarouselNext variant="primary" />
    </Carousel>
  );
}
