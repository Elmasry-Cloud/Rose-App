import { Bell, Heart, ShoppingCart, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ModeToggle } from '../layout/mode-toggle';
import SwitchLanguage from '../layout/switch-language';

export default function NavbarActions() {
  const t = useTranslations('home-page.navbar');
  const isAuth = false;

  return (
    <div className="actions h-12.25 flex items-center order-2 lg:order-3">
      {/* Login Button */}
      {!isAuth && (
        <div className="px-4 hidden lg:block">
          <button className="flex items-center gap-1.5 cursor-pointer">
            <User className="size-5" />
            <span>{t('login')}</span>
          </button>
        </div>
      )}

      <div className="h-full px-4 flex items-center gap-2.5 lg:border-x border-ds-border-muted">
        {/* Wishlist Button */}
        <button className="cursor-pointer flex items-center gap-1.5">
          <Heart className="size-5" />
        </button>

        {/* Cart Button */}
        <button className="cursor-pointer flex items-center gap-1.5">
          <ShoppingCart className="size-5" />
        </button>

        {/* Notification Button */}
        {isAuth && (
          <button className="cursor-pointer flex items-center gap-1.5">
            <Bell className="size-5" />
          </button>
        )}
      </div>

      <div className="hidden lg:flex items-center justify-center ps-4">
        <ModeToggle />

        {/* Language Switcher */}
        <SwitchLanguage />
      </div>
    </div>
  );
}
