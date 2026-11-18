import { Bell, Heart, ShoppingCart } from 'lucide-react';
import { ModeToggle } from '../layout/mode-toggle';
import SwitchLanguage from '../layout/switch-language';
import AuthPopover from './auth-popover';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { cn } from '@/shared/lib/utils';

export default async function NavbarActions() {
  // Get session
  const session = await getServerSession(authOptions);

  // Check if user is authenticated
  const isAuth = !!session;

  return (
    <div className="actions h-12.25 flex items-center order-2 lg:order-3">
      {/* Login Button */}
      {!isAuth && (
        <div className="px-4 hidden lg:block">
          <AuthPopover />
        </div>
      )}

      <div
        className={cn(
          'h-full px-4 flex items-center gap-2.5 lg:border-x border-ds-border-muted',
          isAuth && 'lg:border-s-0'
        )}
      >
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
