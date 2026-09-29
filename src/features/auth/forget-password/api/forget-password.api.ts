import { TForgetPasswordFormValue, TResetPasswordFormValue } from '../types/forget-password.schema';
import forgetApisFactory from '../factory/forget-apis-factory';

export default async function forgetPasswordApi(fields: TForgetPasswordFormValue) {
  return forgetApisFactory({
    endpoint: 'forgot-password',
    body: fields,
  });
}

export async function resetPasswordApi(fields: TResetPasswordFormValue) {
  return forgetApisFactory({
    endpoint: 'reset-password',
    body: fields,
  });
}
