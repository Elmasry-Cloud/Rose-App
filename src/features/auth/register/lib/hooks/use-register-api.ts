import { useMutation } from '@tanstack/react-query';
import registerApiRequest from '../api/register.api';
import { toast } from 'sonner';

export default function useRegisterApi() {
  const { data, isPending, mutateAsync } = useMutation({
    mutationFn: registerApiRequest,
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { data, isPending, registerApiRequest: mutateAsync };
}
