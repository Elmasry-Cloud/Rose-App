import { IApiResponse } from '@/shared/lib/types/api-response';

export interface AuthApiRequestParams<TFields> {
  endpoint: string;
  fields: TFields;
}

export default async function authApiRequest<TFields, TData>({
  endpoint,
  fields,
}: AuthApiRequestParams<TFields>): Promise<IApiResponse<TData>> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(fields),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // if (!response.ok) throw new Error(`Failed to ${endpoint}`);

  const data: IApiResponse<TData> = await response.json();

  // if (!data.status) throw new Error(`Failed to get ${endpoint} response`);
  if (!data.status || !response.ok) throw new Error(data.message);

  return data;
}
