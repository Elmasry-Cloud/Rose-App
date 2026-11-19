import { Input } from '@/shared/components/ui/input';
import { useTranslations } from 'next-intl';

export default function NavbarSearch() {
  // Translation
  const t = useTranslations('home-page.navbar');

  return (
    <div role="search" className="search order-3 w-full lg:order-2 lg:w-auto lg:flex-1 lg:min-w-75">
      <Input
        type="search"
        aria-label={t('searchPlaceholder')}
        placeholder={t('searchPlaceholder')}
        className="w-full"
      />
    </div>
  );
}
