import { useMutation } from '@tanstack/react-query';
import forgetPasswordApi from '../api/forget-password.api';

export default function useForgetPassword() {
  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: forgetPasswordApi,
  });

  return {
    data,
    error,
    isPending,
    forgetPasswordApi: mutateAsync,
  };
}
