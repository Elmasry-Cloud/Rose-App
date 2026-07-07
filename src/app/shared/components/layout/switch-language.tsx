'use client';
import { Link, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { startTransition, useEffect, useState } from 'react';

export default function SwitchLanguage() {
  const [SearchParams, setSearchParams] = useState('');
  const pathName = usePathname();
  const locale = useLocale();

  const language = locale === 'ar' ? 'English' : 'العربية';

  useEffect(() => {
    startTransition(() => setSearchParams(location.search));
  }, [SearchParams]);

  return (
    <header>
      <Link href={pathName + SearchParams} locale={locale === 'ar' ? 'en' : 'ar'}>
        {language}
      </Link>
    </header>
  );
}
