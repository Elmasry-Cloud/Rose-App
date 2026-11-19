'use client';

import { ChevronDown, LogOut, MapPinHouse, ScrollText, Settings, User } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

// Constants
const itemClass =
  'flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-ds-text-primary cursor-pointer rounded-lg hover:bg-ds-bg-muted data-[highlighted]:bg-ds-bg-muted';

export default function UserInfo({ name }: { name: string }) {
  // Translation
  const t = useTranslations('home-page.navbar.user');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current">
        <div className="relative">
          <span className="absolute -top-2 inset-s-0 font-normal text-xs text-ds-text-soft">
            {t('hello')}
          </span>
          <p className="font-medium text-base text-ds-text-primary">{name}</p>
        </div>
        <ChevronDown className="size-4.5 text-ds-text-soft" aria-hidden="true" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="w-60 rounded-2xl p-0 shadow-lg bg-ds-bg-plain"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-3.5 py-1.5 text-base font-semibold text-ds-text-primary">
            <span className="block truncate max-w-[15ch]" title={name}>
              {name}
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="m-0" />

        <div className="p-1.5">
          <DropdownMenuItem render={<Link href="/account" />} className={itemClass}>
            <User className="size-5" aria-hidden="true" /> {t('account')}
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/addresses" />} className={itemClass}>
            <MapPinHouse className="size-5" aria-hidden="true" /> {t('addresses')}
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/orders" />} className={itemClass}>
            <ScrollText className="size-5" aria-hidden="true" /> {t('orders')}
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="m-0" />

        <div className="p-1.5">
          <DropdownMenuItem render={<Link href="/dashboard" />} className={itemClass}>
            <Settings className="size-5" aria-hidden="true" /> {t('dashboard')}
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="m-0" />

        <div className="p-1.5">
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: '/' })}
            className={`${itemClass} text-ds-text-danger`}
          >
            <LogOut className="size-5" aria-hidden="true" /> {t('logout')}
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
