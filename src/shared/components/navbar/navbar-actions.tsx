import { Bell, Heart, ShoppingCart } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { getTranslations } from 'next-intl/server';
import { authOptions } from '@/auth';
import { Link } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils';
import { ModeToggle } from '../layout/mode-toggle';
import SwitchLanguage from '../layout/switch-language';
import AuthPopover from './auth-popover';
import UserInfo from './user-info';

const iconClass =
  'flex items-center rounded-md p-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current';

export default async function NavbarActions() {
  // Session
  const session = await getServerSession(authOptions);

  // Translation
  const t = await getTranslations('home-page.navbar');

  // State
  const isAuth = !!session;

  return (
    <div className="actions h-12.25 flex items-center order-2 lg:order-3">
      {/* Auth */}
      {!isAuth && (
        <div className="px-4 hidden lg:block">
          <AuthPopover />
        </div>
      )}

      {/* User Info */}
      {isAuth && (
        <div className="px-4">
          <UserInfo name={session.user?.firstName ?? ''} />
        </div>
      )}

      {/* Icons */}
      <div
        className={cn(
          'h-full px-4 flex items-center gap-2.5 border-s lg:border-x border-ds-border-muted',
          !isAuth && 'border-0'
        )}
      >
        <Link href="/wishlist" aria-label={t('wishlist')} className={iconClass}>
          <Heart className="size-5" aria-hidden="true" />
        </Link>

        <Link href="/cart" aria-label={t('cart')} className={iconClass}>
          <ShoppingCart className="size-5" aria-hidden="true" />
        </Link>

        {isAuth && (
          <button type="button" aria-label={t('notifications')} className={iconClass}>
            <Bell className="size-5" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Toggle & Language */}
      <div className="hidden lg:flex items-center justify-center ps-4">
        <ModeToggle />
        <SwitchLanguage />
      </div>
    </div>
  );
}
