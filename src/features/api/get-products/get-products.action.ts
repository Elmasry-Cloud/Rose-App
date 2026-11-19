'use server';

import getProducts from './get-products.api';
import { GetApiParams } from '@/shared/lib/types/params';

export async function getProductsAction(params?: Partial<GetApiParams>) {
  return getProducts(params);
}
