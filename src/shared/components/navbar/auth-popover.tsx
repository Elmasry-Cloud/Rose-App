'use client';

import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import AuthTabs from './auth-tabs';

// Check if screen is desktop
const isDesktop = () =>
  typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;

export default function AuthPopover() {
  // Translation
  const t = useTranslations('home-page.navbar');

  // State
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className="flex items-center gap-1.5 cursor-pointer"
        onMouseEnter={() => isDesktop() && setOpen(true)}
        onClick={(e) => {
          if (isDesktop()) {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        <User className="size-5" />
        <span>{t('login')}</span>
      </PopoverTrigger>

      <PopoverContent className="w-auto gap-0 rounded-2xl border-0 bg-transparent p-0 shadow-none ring-0 outline-none">
        <AuthTabs />
      </PopoverContent>
    </Popover>
  );
}
