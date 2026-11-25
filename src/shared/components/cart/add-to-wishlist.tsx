'use client';
import { HeartMinus, HeartPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Product } from '@/shared/lib/types/get-api-response';
import { getWishlist } from '@/shared/lib/utils/get-local-wishlist';
import { WISHLIST_KEY } from '@/shared/lib/website/constant/shared-constant';
import { notifyStorageChange, useStorageFlag } from '@/shared/lib/hooks/use-storage-flag';

export default function AddToWishlist({ product }: { product: Product }) {
  // Translation
  const t = useTranslations('home-page.product-card');

  const isInWishlist = useStorageFlag(() => getWishlist().includes(product.id));

  // Handler
  function handleAddToWishlist() {
    const wishlist = getWishlist();

    if (wishlist.includes(product.id)) {
      // Remove from wishlist
      localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(wishlist.filter((id) => id !== product.id))
      );
      toast.success(t('removed-from-wishlist', { title: product.title }));
      notifyStorageChange();
    } else {
      // Add to wishlist
      localStorage.setItem(WISHLIST_KEY, JSON.stringify([...wishlist, product.id]));
      toast.success(t('added-to-wishlist', { title: product.title }));
      notifyStorageChange();
    }
  }

  return (
    <button
      type="button"
      onClick={handleAddToWishlist}
      aria-pressed={isInWishlist}
      aria-label={
        isInWishlist
          ? t('remove-from-wishlist-label', { title: product.title })
          : t('wishlist-label', { title: product.title })
      }

      className={`flex h-7.5 w-7.5 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
        isInWishlist
          ? 'bg-ds-bg-primary text-ds-text-inverse hover:bg-ds-bg-secondary'
          : 'bg-ds-bg-plain hover:bg-ds-bg-secondary hover:text-ds-text-inverse'
      }`}
    >
      {isInWishlist ? (
        <HeartMinus className="size-5" aria-hidden="true" />
      ) : (
        <HeartPlus className="size-5" aria-hidden="true" />
      )}
    </button>
  );
}
