import { IApiResponse } from '@/shared/lib/types/api-response';
import { IEmailVerificationResponse } from './send-email-verification';

export default async function confirmEmailVerification(fields: { email: string; code: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/confirm-email-verification`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    }
  );

  const data: IApiResponse<IEmailVerificationResponse> = await response.json();

  if (!data.status) {
    throw Error(data.message);
  }

  return data;
}
