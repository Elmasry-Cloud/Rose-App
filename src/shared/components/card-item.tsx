import { Eye, HeartPlus, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Product } from '../lib/types/get-api-response';
import { cn } from '../lib/utils';
import { Badge } from './ui/badge';

const overlayActions = [
  { key: 'wishlist', icon: HeartPlus },
  { key: 'quick-view', icon: Eye },
] as const;

export default function CardItem({ product }: { product: Product }) {
  const t = useTranslations('home-page.product-card');

  const outOfStock = product.stock <= 0;
  const hasDiscount = Number(product.discountValue) > 0;
  const finalPrice = Math.max(
    0,
    Number(product.price) - (hasDiscount ? Number(product.discountValue) : 0)
  );

  const rating = Math.min(5, Math.max(0, Number(product.rating) || 0));
  const filledStars = Math.round(rating);

  return (
    <article className="card flex h-full w-full flex-col gap-4 bg-transparent">
      {/* Card Image */}
      <div className="image group relative aspect-square w-full shrink-0 overflow-hidden rounded-xl">
        {(outOfStock || product.isNew) && (
          <Badge
            variant={outOfStock ? 'destructive' : 'subtle'}
            className="absolute top-2 inset-e-2 z-10"
          >
            {outOfStock ? t('out-of-stock') : t('new')}
          </Badge>
        )}

        {/* Image Overlay (hover + keyboard focus) */}
        <div className="image-overlay absolute inset-0 flex items-center justify-center gap-2.5 bg-ds-bg-secondary/50 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 motion-reduce:transition-none">
          {overlayActions.map(({ key, icon: Icon }) => (
            <button
              key={key}
              type="button"
              aria-label={t(`${key}-label`, { title: product.title })}
              className="flex h-7.5 w-7.5 cursor-pointer items-center justify-center rounded-full bg-ds-bg-plain transition-colors hover:bg-ds-bg-secondary hover:text-ds-text-inverse focus-visible:outline-2 focus-visible:outline-offset-2"
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
          className="h-full w-full object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="content flex flex-1 flex-col gap-3">
        <h3 className="min-h-14 line-clamp-2 text-lg font-semibold text-ds-text-primary">
          {product.title}
        </h3>

        <div className="card-footer mt-auto flex items-center justify-between">
          <div className="info">
            <p className="sr-only">{rating > 0 ? t('rating', { rating }) : t('no-rating')}</p>
            <div className="stars mb-3 flex items-center gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={cn(
                    'size-4',
                    index < filledStars
                      ? 'fill-orange-500 text-orange-500'
                      : 'fill-gray-300 text-gray-300'
                  )}
                />
              ))}
            </div>

            <p>
              <span className="sr-only">{t('price')}: </span>
              <span className="price me-1 inline-block text-base font-medium text-ds-text-primary">
                {t('currency', { value: finalPrice })}
              </span>
              {hasDiscount && (
                <del className="original-price text-base font-medium text-ds-text-muted">
                  <span className="sr-only">{t('original-price')}: </span>
                  {t('currency', { value: product.price })}
                </del>
              )}
            </p>
          </div>

          <button
            type="button"
            aria-label={t('add-to-cart', { title: product.title })}
            disabled={outOfStock}
            className="flex h-10.5 w-10.5 shrink-0 cursor-pointer items-center justify-center rounded-full bg-ds-bg-primary text-ds-text-inverse transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 enabled:hover:bg-ds-bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingCart className="size-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
