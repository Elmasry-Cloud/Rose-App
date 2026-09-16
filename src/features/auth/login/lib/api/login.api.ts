import authApiRequest from '@/shared/lib/auth/api-factory/auth.api';
import { IAuthResponse } from '@/shared/lib/types/auth-response';

interface ILoginFields {
  username: string;
  password: string;
}

export default async function loginApiRequest(fields: ILoginFields) {
  return authApiRequest<ILoginFields, IAuthResponse>({
    endpoint: 'login',
    fields,
  });
}
