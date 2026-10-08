import { Eye, HeartPlus, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import { Product } from '../lib/types/get-api-response';
import { Badge } from './ui/badge';
import { useFormatter, useTranslations } from 'next-intl';

// Icons for the image overlay
const overlayActions = [
  { label: 'Add to wishlist', icon: HeartPlus },
  { label: 'Quick view', icon: Eye },
];

export default function CardItem({ product }: { product: Product }) {
  // Translations
  const t = useTranslations('home-page.most-popular');
  const format = useFormatter();

  const formatPrice = (value: number) =>
    format.number(value, {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 0,
    });

  // Check if product is out of stock or new
  const outOfStock = product.stock <= 0;

  // Check if product is new (created within 30 days)
  const isNew = product.isNew;

  // Pricing
  const hasDiscount = Number(product.discountValue) > 0;
  const finalPrice = Number(product.price) - (hasDiscount ? Number(product.discountValue) : 0);

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
              {outOfStock ? t('out-of-stock') : t('new')}
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

              <p>
                <span className="sr-only">{t('price')}: </span>
                <span className="price font-medium text-base text-ds-text-primary inline-block me-1">
                  {formatPrice(finalPrice)}
                </span>
                {hasDiscount && (
                  <del className="original-price font-medium text-base text-ds-text-muted">
                    <span className="sr-only">{t('original-price')}: </span>
                    {formatPrice(Number(product.price))}
                  </del>
                )}
              </p>
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
  );
}
