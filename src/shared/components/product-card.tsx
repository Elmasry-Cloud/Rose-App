import { useQuery } from '@tanstack/react-query';
import { getProductsAction } from '@/features/api/get-products/get-products.action';
import ProductCardSkeleton from './skeletons/product-skeleton';
import { NEW_PRODUCT_MS, PAGE, PRODUCTS_LIMIT } from '../lib/website/constant/shared-constant';
import CardItem from './card-item';
import { useTranslations } from 'next-intl';

// Grid classes for product cards
const GRID_CLASSES = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6';

// Type for product card props
type ProductCardProps = {
  occasionId: string;
};

export default function ProductCard({ occasionId }: ProductCardProps) {
  // Translations
  const t = useTranslations('home-page.most-popular');

  // Fetch products
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products', occasionId],
    queryFn: async () => {
      const res = await getProductsAction({
        page: PAGE,
        limit: PRODUCTS_LIMIT,
        occasionId,
        sortBy: 'mostPopular',
      });
      const now = Date.now();

      return {
        ...res,
        data: res.data.map((product) => ({
          ...product,
          isNew: now - new Date(product.createdAt).getTime() < NEW_PRODUCT_MS,
        })),
      };
    },
  });

  // Show loading skeleton while fetching
  if (isLoading) {
    return (
      <div role="status">
        <span className="sr-only">{t('loading')}</span>
        <div className={GRID_CLASSES} aria-hidden="true">
          {Array.from({ length: PRODUCTS_LIMIT }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Show error message if there's an error
  if (isError) {
    return (
      <p role="alert" className="font-bold text-ds-text-danger text-center">
        {t('error')}
      </p>
    );
  }

  const items = products?.data ?? [];

  // Empty state
  if (items.length === 0) {
    return (
      <p role="status" className="font-bold text-ds-text-primary text-center">
        {t('no-products')}
      </p>
    );
  }

  return (
    <div className={GRID_CLASSES}>
      {items.map((product) => (
        <CardItem key={product.id} product={product} />
      ))}
    </div>
  );
}
