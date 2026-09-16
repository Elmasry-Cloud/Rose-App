import { useMutation } from '@tanstack/react-query';
import sendEmailVerification from '../api/send-email-verification';
import confirmEmailVerification from '../api/confirm-email-verification';

export default function useSendEmailVerification() {
  const { data, error, mutate, isPending } = useMutation({
    mutationFn: sendEmailVerification,
  });

  return { data, error, sendEmailVerification: mutate, isPending };
}

export function useConfirmEmailVerification() {
  const { data, error, mutate, isPending } = useMutation({
    mutationFn: confirmEmailVerification,
  });

  return { data, error, confirmEmailVerification: mutate, isPending };
}
