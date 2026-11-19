'use client';

import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import AuthTabs from './auth-tabs';

export default function AuthPopover() {
  // Translation
  const t = useTranslations('home-page.navbar');

  return (
    <Popover>
      <PopoverTrigger
        openOnHover
        delay={100}
        className="flex items-center gap-1.5 cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
      >
        <User className="size-5" aria-hidden="true" />
        <span>{t('login')}</span>
      </PopoverTrigger>

      <PopoverContent
        aria-label={t('login')}
        className="w-auto gap-0 rounded-2xl border-0 bg-transparent p-0 shadow-none ring-0 outline-none"
      >
        <AuthTabs />
      </PopoverContent>
    </Popover>
  );
}
