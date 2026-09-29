import { useMutation } from '@tanstack/react-query';
import { resetPasswordApi } from '../api/forget-password.api';

export default function useResetPassword() {
  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: resetPasswordApi,
  });

  return {
    data,
    error,
    isPending,
    resetPasswordApi: mutateAsync,
  };
}
