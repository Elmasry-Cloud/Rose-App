import { CART_KEY } from '../website/constant/shared-constant';

export function getCart(): string[] {
  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
}
