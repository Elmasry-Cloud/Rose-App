'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LoginForm from '@/features/auth/login/components/login-form';

export default function AuthTabs() {
  // Translation
  const t = useTranslations('home-page.navbar.auth');

  return (
    <div className="w-104 bg-ds-bg-plain overflow-hidden rounded-2xl ring-1 ring-ds-text-plain">
      <div className="grid grid-cols-2">
        <h2 className="bg-ds-bg-primary py-4 text-center font-semibold text-ds-text-inverse">
          {t('login')}
        </h2>
        <Link
          href="/register"
          className="py-4 text-center text-ds-text-plain hover:bg-ds-bg-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-current"
        >
          {t('register')}
        </Link>
      </div>

      <LoginForm className="px-6" />
    </div>
  );
}
