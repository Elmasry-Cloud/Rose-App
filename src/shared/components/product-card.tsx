'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { getProductsAction } from '@/features/api/get-products/get-products.action';
import { NEW_PRODUCT_MS, PAGE, PRODUCTS_LIMIT } from '../lib/website/constant/shared-constant';
import { cn } from '../lib/utils';
import CardItem from './card-item';
import ProductCardSkeleton from './skeletons/product-skeleton';

const GRID_CLASSES = 'grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

type ProductCardProps = {
  occasionId: string;
};

export default function ProductCard({ occasionId }: ProductCardProps) {
  const t = useTranslations('home-page.most-popular');

  const { data, isLoading, isError, isPlaceholderData } = useQuery({
    queryKey: ['products', occasionId],
    queryFn: () =>
      getProductsAction({
        page: PAGE,
        limit: PRODUCTS_LIMIT,
        occasionId,
        sortBy: 'mostPopular',
      }),
    placeholderData: keepPreviousData,
    select: (res) => {
      const now = Date.now();
      return res.data.map((product) => ({
        ...product,
        isNew: now - new Date(product.createdAt).getTime() < NEW_PRODUCT_MS,
      }));
    },
  });

  if (isLoading) {
    return (
      <div role="status">
        <span className="sr-only">{t('loading')}</span>
        <ul className={GRID_CLASSES} aria-hidden="true">
          {Array.from({ length: PRODUCTS_LIMIT }).map((_, index) => (
            <li key={index}>
              <ProductCardSkeleton />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (isError) {
    return (
      <p role="alert" className="text-center font-bold text-ds-text-danger">
        {t('error')}
      </p>
    );
  }

  const items = data ?? [];

  if (items.length === 0) {
    return (
      <p role="status" className="text-center font-bold text-ds-text-primary">
        {t('no-products')}
      </p>
    );
  }

  return (
    <ul
      className={cn(GRID_CLASSES, 'transition-opacity', isPlaceholderData && 'opacity-60')}
      aria-busy={isPlaceholderData}
    >
      {items.map((product) => (
        <li key={product.id}>
          <CardItem product={product} />
        </li>
      ))}
    </ul>
  );
}
