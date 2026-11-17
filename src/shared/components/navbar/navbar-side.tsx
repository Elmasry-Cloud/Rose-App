'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import { MapPin, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ModeToggle } from '../layout/mode-toggle';
import SwitchLanguage from '../layout/switch-language';
import { navLinks } from './nav-links';

interface NavbarSideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavbarSide({ isOpen, onClose }: NavbarSideProps) {
  const t = useTranslations('home-page.navbar');
  const tLinks = useTranslations('home-page.navbar.links');
  const pathname = usePathname();

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <div
      aria-hidden={!isOpen}
      className={cn(
        'fixed inset-0 z-50 lg:hidden transition-[visibility] duration-300',
        isOpen ? 'visible' : 'invisible'
      )}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          'absolute inset-0 bg-black/50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
      />

      {/* Drawer */}
      <aside
        className={cn(
          'navbar-side absolute inset-y-0 inset-s-0 w-[min(25rem,85vw)] bg-ds-bg-plain flex flex-col px-5 py-4 overflow-y-auto',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'ltr:-translate-x-full rtl:translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-ds-text-primary">{t('menu')}</h2>
          <button
            aria-label={t('closeMenu')}
            onClick={onClose}
            className="cursor-pointer hover:scale-110 transition-transform"
          >
            <X className="size-6 text-ds-text-primary" />
          </button>
        </div>

        {/* Select location */}
        <button className="flex items-center gap-3 mb-6 cursor-pointer text-ds-text-primary">
          <MapPin className="size-5" />
          <span>{t('selectLocation')}</span>
        </button>

        {/* Links */}
        <nav>
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ href, key, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onClose}
                  aria-current={isActive(href) ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 py-3 px-2 text-ds-text-primary transition-opacity',
                    isActive(href)
                      ? 'font-semibold bg-ds-bg-muted'
                      : 'opacity-80 hover:opacity-100 hover:bg-ds-bg-muted'
                  )}
                >
                  <Icon className="size-5" />
                  {tLinks(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Login */}
        <div className="mt-6 pt-6 border-t border-ds-border-muted">
          <button className="w-full py-3 rounded-md bg-ds-bg-primary text-ds-text-inverse font-semibold cursor-pointer">
            {t('login')}
          </button>
        </div>

        {/* Footer: language + theme */}
        <div className="mt-auto pt-4 border-t border-ds-border-muted flex items-center justify-between">
          <SwitchLanguage />
          <ModeToggle />
        </div>
      </aside>
    </div>
  );
}
