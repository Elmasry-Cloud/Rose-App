'use client';

import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useRef, useState } from 'react';
import NavbarSide from './navbar-side';

export default function MobileMenu() {
  // Translation
  const t = useTranslations('home-page.navbar');

  // State
  const [isOpen, setIsOpen] = useState(false);

  // Refs
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Callbacks
  const close = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={t('openMenu')}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className="lg:hidden cursor-pointer hover:scale-110 transition-transform text-ds-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        onClick={() => setIsOpen(true)}
      >
        <Menu aria-hidden="true" />
      </button>

      <NavbarSide isOpen={isOpen} onClose={close} />
    </>
  );
}
