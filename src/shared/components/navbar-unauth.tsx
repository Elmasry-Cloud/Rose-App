import NavbarLogo from './navbar/navbar-logo';
import NavbarSearch from './navbar/navbar-search';
import NavbarActions from './navbar/navbar-actions';
import NavbarMenu from './navbar/navbar-menu';
import MobileMenu from './navbar/mobile-menu';

export default function NavbarUnauthenticated() {
  return (
    <>
      <header className="header-unauth py-4.5 px-9 bg-ds-bg-plain flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">
        {/* Mobile Menu Toggle */}
        <MobileMenu />

        {/* Logo */}
        <NavbarLogo />
        {/* Search Action */}
        <NavbarSearch />
        {/* Actions */}
        <NavbarActions />
      </header>

      {/* Menu */}
      <NavbarMenu />
    </>
  );
}
