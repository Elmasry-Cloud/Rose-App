import { getApiBaseUrl } from '@/shared/lib/utils/api-url';
import { IApiResponse } from '@/shared/lib/types/api-response';
import { GetApiParams } from '../../types/params';

export default async function getApiData<T>(
  endpoint: string,
  params?: Partial<GetApiParams>
): Promise<T> {
  const searchParams = new URLSearchParams();

  Object.entries({ ...params }).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const query = searchParams.toString();

  const response = await fetch(`${getApiBaseUrl()}/${endpoint}${query ? `?${query}` : ''}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  const data: IApiResponse<T> = await response.json();

  if (!data.status || !data.payload) {
    throw new Error(data.message || `An error occurred while fetching ${endpoint}`);
  }

  return data.payload;
}
