'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import { useTranslations } from 'next-intl';
import { navLinks } from './nav-links';

export default function NavbarMenu() {
  const pathname = usePathname();
  const t = useTranslations('home-page.navbar.links');

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <nav className="navbar-menu hidden lg:flex items-center justify-center py-4.5 px-9 bg-ds-bg-primary text-ds-text-inverse">
      <ul className="flex items-center justify-center gap-8">
        {navLinks.map(({ href, key, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              className={cn(
                'flex items-center gap-1.5 border-b-2 border-transparent pb-1 transition-opacity',
                isActive(href) ? 'border-current font-semibold' : 'opacity-80 hover:opacity-100'
              )}
            >
              <Icon className="size-5" />
              {t(key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
