import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export default async function getNextAuthToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get(process.env.NEXTAUTH_COOKIE_TOKEN_NAME!)?.value;

  try {
    const jwt = await decode({ token, secret: process.env.NEXTAUTH_SECRET! });

    return jwt;
  } catch (error) {
    void error;

    return null;
  }
}
