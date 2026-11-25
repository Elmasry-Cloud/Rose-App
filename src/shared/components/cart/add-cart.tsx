'use client';
import { Product } from '@/shared/lib/types/get-api-response';
import { PackageCheck, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CART_KEY } from '@/shared/lib/website/constant/shared-constant';
import { getCart } from '@/shared/lib/utils/get-local-cart';
import { toast } from 'sonner';
import { notifyStorageChange, useStorageFlag } from '@/shared/lib/hooks/use-storage-flag';

export default function AddToCart({
  outOfStock,
  product,
}: {
  outOfStock: boolean;
  product: Product;
}) {
  // Translation
  const t = useTranslations('home-page.product-card');

  const isInCart = useStorageFlag(() => getCart().includes(product.id));

  // Handler
  function handleAddToCart() {
    const cartItems = getCart();

    if (cartItems.includes(product.id)) {
      // Remove from cart
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems.filter((id) => id !== product.id)));
      toast.success(t('removed-from-cart', { title: product.title }));
      notifyStorageChange();
    } else {
      // Add to cart
      localStorage.setItem(CART_KEY, JSON.stringify([...cartItems, product.id]));
      toast.success(t('added-to-cart', { title: product.title }));
      notifyStorageChange();
    }
  }

  return (
    <button
      type="button"
      aria-pressed={isInCart}
      aria-label={
        isInCart
          ? t('remove-from-cart', { title: product.title })
          : t('add-to-cart', { title: product.title })
      }
      disabled={outOfStock}
      onClick={handleAddToCart}
      className={`flex h-10.5 w-10.5 shrink-0 cursor-pointer items-center justify-center rounded-full text-ds-text-inverse transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        isInCart
          ? 'bg-ds-bg-success enabled:hover:opacity-90'
          : 'bg-ds-bg-primary enabled:hover:bg-ds-bg-secondary'
      }`}
    >
      {isInCart ? (
        <PackageCheck className="size-6 animate-in zoom-in duration-200" aria-hidden="true" />
      ) : (
        <ShoppingCart className="size-6" aria-hidden="true" />
      )}
    </button>
  );
}
