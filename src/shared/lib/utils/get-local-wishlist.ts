import { WISHLIST_KEY } from '../website/constant/shared-constant';

export function getWishlist(): string[] {
  try {
    const wishlist = localStorage.getItem(WISHLIST_KEY);
    return wishlist ? JSON.parse(wishlist) : [];
  } catch {
    return [];
  }
}
