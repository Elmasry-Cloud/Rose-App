import { Button } from '@/shared/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import ISteps from '@/shared/lib/types/steps';

export default function BackForgetButton({ setStep }: Partial<ISteps>) {
  return (
    <Button
      type="button"
      variant={'primary'}
      className="w-7.5 h-7.5 rounded-lg rtl:rotate-180"
      onClick={() => setStep?.(1)}
    >
      <ChevronLeft />
    </Button>
  );
}
