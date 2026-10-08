import getApiData from '@/shared/lib/website/api/api-data';
import { GetApiParams, GetDataPayload } from '@/shared/lib/types/params';
import { Occasion2, Product } from '@/shared/lib/types/get-api-response';

export default async function getProducts(params?: Partial<GetApiParams>) {
  const data = await getApiData<GetDataPayload<Product[]>>('products', params);
  return data;
}

export async function getOccasions(params?: Partial<GetApiParams>) {
  const data = await getApiData<GetDataPayload<Occasion2[]>>('occasions', params);
  return data;
}
