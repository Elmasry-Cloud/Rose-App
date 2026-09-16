import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';

export default function useLogin() {
  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const result = await signIn('credentials', {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (!result?.ok) {
        throw new Error(result?.error || 'Login failed');
      }

      return result;
    },
  });

  return { data, error, isPending, login: mutateAsync };
}
