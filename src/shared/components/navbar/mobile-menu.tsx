'use client';
import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import NavbarSide from './navbar-side';

export default function MobileMenu() {
  const t = useTranslations('home-page.navbar');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        aria-label={t('openMenu')}
        className="lg:hidden cursor-pointer hover:scale-110 transition-transform text-ds-text-primary"
        onClick={() => setIsOpen(true)}
      >
        <Menu />
      </button>

      <NavbarSide isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
