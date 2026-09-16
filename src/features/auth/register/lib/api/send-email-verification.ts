import { IApiResponse } from '@/shared/lib/types/api-response';

export interface IEmailVerificationResponse {
  code: number;
  status: string;
  message: string;
}

export default async function sendEmailVerification(email: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-email-verification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data: IApiResponse<IEmailVerificationResponse> = await response.json();

  if (!data.status) {
    throw Error(data.message);
  }

  return data;
}
