import authApiRequest from '@/shared/lib/auth/api-factory/auth.api';
import { IAuthResponse } from '@/shared/lib/types/auth-response';

interface IRegisterFields {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  gender: string;
}

export default async function registerApiRequest(fields: IRegisterFields) {
  return authApiRequest<IRegisterFields, IAuthResponse>({
    endpoint: 'register',
    fields,
  });
}
