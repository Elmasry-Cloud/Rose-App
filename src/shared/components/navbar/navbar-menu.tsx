'use client';

import { Link } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import { useTranslations } from 'next-intl';
import { navLinks } from './nav-links';
import { useIsActive } from './use-is-active';

export default function NavbarMenu() {
  // Translation
  const t = useTranslations('home-page.navbar.links');
  const tNav = useTranslations('home-page.navbar');

  // State
  const isActive = useIsActive();

  return (
    <nav
      aria-label={tNav('mainNavigation')}
      className="navbar-menu hidden lg:flex items-center justify-center py-4.5 px-9 bg-ds-bg-primary text-ds-text-inverse"
    >
      <ul className="flex items-center justify-center gap-8">
        {navLinks.map(({ href, key, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              className={cn(
                'flex items-center gap-1.5 border-b-2 border-transparent pb-1 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current',
                isActive(href) ? 'border-current font-semibold' : 'opacity-80 hover:opacity-100'
              )}
            >
              <Icon className="size-5" aria-hidden="true" />
              {t(key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
