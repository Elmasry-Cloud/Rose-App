import { Button } from '@/shared/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function BackForgetButton() {
  return (
    <Button type="button" variant={'primary'} className="w-7.5 h-7.5 rounded-lg rtl:rotate-180">
      <ChevronLeft />
    </Button>
  );
}
