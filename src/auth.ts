import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import loginApiRequest from './features/auth/login/lib/api/login.api';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          throw new Error('Username and password are required');
        }

        const res = await loginApiRequest({
          username: credentials.username,
          password: credentials.password,
        });

        if (res.status && res.payload) {
          return {
            id: res.payload?.user.id,
            user: res.payload?.user,
            token: res.payload?.token,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
