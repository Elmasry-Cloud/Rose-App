import AuthImage from '@/assets/images/auth/auth-image.png';
import HeaderAuthImage, { FooterAuthImage } from '@/features/auth/layout/components/header-image';
import { ModeToggle } from '@/shared/components/layout/mode-toggle';
import SwitchLanguage from '@/shared/components/layout/switch-language';
import Image from 'next/image';

type Props = {
  children: React.ReactNode;
};

export default async function AuthLayout({ children }: Props) {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2">
      {/* Right Section */}
      <section className="right w-3/4 m-auto flex flex-col gap-10 items-center justify-center">
        <div className="flex items-center justify-end gap-4 w-full px-4 py-2">
          {/* Language Switcher */}
          <SwitchLanguage />

          {/* Theme Toggle */}
          <ModeToggle />
        </div>

        {/* Header Image */}
        <HeaderAuthImage />

        {/* Auth Pages */}
        <div className="page w-full">{children}</div>

        {/* Footer Image */}
        <FooterAuthImage />
      </section>

      {/* Aside Image Left */}
      <aside className="auth-layout h-screen hidden lg:block sticky top-0">
        <Image
          src={AuthImage}
          alt="auth-image"
          fill
          priority
          sizes="50vw"
          className="object-cover h-screen"
        />
      </aside>
    </main>
  );
}
