'use client';

import { Link } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import { MapPin, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { ModeToggle } from '../layout/mode-toggle';
import SwitchLanguage from '../layout/switch-language';
import { Button } from '../ui/button';
import { navLinks } from './nav-links';
import { useIsActive } from './use-is-active';

interface NavbarSideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavbarSide({ isOpen, onClose }: NavbarSideProps) {
  // Translation
  const t = useTranslations('home-page.navbar');
  const tLinks = useTranslations('home-page.navbar.links');

  // Session
  const { status } = useSession();
  const isAuth = status === 'authenticated';

  // State
  const isActive = useIsActive();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Effects
  useEffect(() => {
    if (!isOpen) return;

    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      inert={!isOpen}
      className={cn(
        'fixed inset-0 z-50 lg:hidden transition-[visibility] duration-300',
        isOpen ? 'visible' : 'invisible'
      )}
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          'absolute inset-0 bg-black/50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
      />

      {/* Drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        className={cn(
          'navbar-side absolute inset-y-0 inset-s-0 w-[min(25rem,85vw)] bg-ds-bg-plain flex flex-col px-5 py-4 overflow-y-auto',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'ltr:-translate-x-full rtl:translate-x-full'
        )}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 id="mobile-menu-title" className="text-xl font-semibold text-ds-text-primary">
            {t('menu')}
          </h2>
          <button
            ref={closeRef}
            type="button"
            aria-label={t('closeMenu')}
            onClick={onClose}
            className="cursor-pointer hover:scale-110 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          >
            <X className="size-6 text-ds-text-primary" aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          className="flex items-center gap-3 mb-6 cursor-pointer text-ds-text-primary"
        >
          <MapPin className="size-5" aria-hidden="true" />
          <span>{t('selectLocation')}</span>
        </button>

        <nav aria-label={t('mainNavigation')}>
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
                      ? 'font-semibold bg-ds-bg-primary text-ds-text-inverse'
                      : 'opacity-80 hover:opacity-100 hover:bg-ds-bg-primary-fade'
                  )}
                >
                  <Icon className="size-5" aria-hidden="true" />
                  {tLinks(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 pt-6 border-t border-ds-border-muted">
          {isAuth ? (
            <Button variant="destructive" onClick={() => signOut({ callbackUrl: '/' })}>
              {t('logout')}
            </Button>
          ) : (
            <Button
              variant="primary"
              nativeButton={false}
              render={<Link href="/login" onClick={onClose} />}
            >
              {t('login')}
            </Button>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-ds-border-muted flex items-center justify-between">
          <SwitchLanguage />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
