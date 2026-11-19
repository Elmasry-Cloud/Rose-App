import { CSSProperties } from 'react';
import ProductCardSkeleton from './product-skeleton';

interface CarouselProductSkeletonProps {
  count?: number;
  itemsPerView?: number;
  itemsPerViewSm?: number;
  itemsPerViewLg?: number;
}

export default function CarouselProductSkeleton({
  count = 4,
  itemsPerView = 2,
  itemsPerViewSm = 2,
  itemsPerViewLg = 3,
}: CarouselProductSkeletonProps) {
  const style = {
    '--items': itemsPerView,
    '--items-sm': itemsPerViewSm,
    '--items-lg': itemsPerViewLg,
  } as CSSProperties;

  return (
    <div className="w-full overflow-hidden" style={style} aria-hidden="true">
      <div className="-ml-4 flex items-stretch">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="min-w-0 shrink-0 grow-0 pl-4 basis-[calc(100%/var(--items))] sm:basis-[calc(100%/var(--items-sm))] lg:basis-[calc(100%/var(--items-lg))]"
          >
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
