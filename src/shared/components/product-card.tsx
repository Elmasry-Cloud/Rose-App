import { Badge } from '@/shared/components/ui/badge';
import { Eye, Heart, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getProductsAction } from '@/features/api/get-products/get-products.action';
import ProductCardSkeleton from './skeletons/product-skeleton';
import { NEW_PRODUCT_MS, PAGE, PRODUCTS_LIMIT } from '../lib/website/constant/shared-constant';

// Icons for the image overlay
const overlayActions = [
  { label: 'Add to wishlist', icon: Heart },
  { label: 'Quick view', icon: Eye },
];

// Grid classes for product cards
const GRID_CLASSES = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6';

// Type for product card props
type ProductCardProps = {
  occasionId: string;
};

export default function ProductCard({ occasionId }: ProductCardProps) {
  // Fetch products
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products', occasionId],
    queryFn: async () => {
      const res = await getProductsAction({ page: PAGE, limit: PRODUCTS_LIMIT, occasionId });
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
        <span className="sr-only">Loading products…</span>
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
        Something went wrong
      </p>
    );
  }

  const items = products?.data ?? [];

  // Empty state
  if (items.length === 0) {
    return (
      <p role="status" className="font-bold text-ds-text-primary text-center">
        No products found
      </p>
    );
  }

  return (
    <ul className={GRID_CLASSES}>
      {items.map((product) => {
        // Check if product is out of stock or new
        const outOfStock = product.stock <= 0;

        // Check if product is new (created within 30 days)
        const isNew = product.isNew;

        // Pricing
        const hasDiscount = Number(product.discountValue) > 0;
        const finalPrice =
          Number(product.price) - (hasDiscount ? Number(product.discountValue) : 0);

        // Rating
        const rating = Math.min(5, Math.max(0, Number(product.rating) || 0));
        const filledStars = Math.round(rating);

        return (
          <li key={product.id}>
            <article className="card h-full flex flex-col gap-4 bg-transparent">
              {/* Card Image */}
              <div className="image group relative h-68 shrink-0 rounded-xl overflow-hidden">
                {(outOfStock || isNew) && (
                  <Badge
                    variant={outOfStock ? 'destructive' : 'subtle'}
                    className="absolute top-2 inset-e-2"
                  >
                    {outOfStock ? 'Out of Stock' : 'New'}
                  </Badge>
                )}

                {/* Image Overlay (visible on hover and keyboard focus) */}
                <div className="image-overlay absolute inset-0 flex items-center justify-center gap-2.5 bg-ds-bg-secondary/50 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                  {overlayActions.map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      type="button"
                      aria-label={label}
                      className="w-7.5 h-7.5 flex items-center justify-center bg-ds-bg-plain hover:bg-ds-bg-secondary hover:text-ds-text-inverse rounded-full cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </button>
                  ))}
                </div>

                <Image
                  src={product.cover}
                  alt=""
                  width={272}
                  height={272}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="content flex flex-1 flex-col gap-3">
                <h3 className="font-semibold text-lg text-ds-text-primary line-clamp-2 min-h-14">
                  {product.title}
                </h3>

                {/* Product Info */}
                <div className="card-footer mt-auto flex items-center justify-between">
                  <div className="info">
                    <div
                      role="img"
                      aria-label={rating > 0 ? `Rated ${rating} out of 5` : 'No ratings yet'}
                      className="stars flex items-center gap-1 mb-3"
                    >
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          aria-hidden="true"
                          className={`size-4 ${
                            index < filledStars
                              ? 'text-orange-500 fill-orange-500'
                              : 'text-gray-300 fill-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    <p>
                      <span className="sr-only">Price: </span>
                      <span className="price font-medium text-base text-ds-text-primary inline-block me-1">
                        {finalPrice} EGP
                      </span>
                      {hasDiscount && (
                        <del className="original-price font-medium text-base text-ds-text-muted">
                          <span className="sr-only">Original price: </span>
                          {product.price} EGP
                        </del>
                      )}
                    </p>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    aria-label={`Add ${product.title} to cart`}
                    disabled={outOfStock}
                    className="w-10.5 h-10.5 shrink-0 bg-ds-bg-primary text-ds-text-inverse rounded-full flex items-center justify-center cursor-pointer enabled:hover:bg-ds-bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    <ShoppingCart className="size-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
