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
        <div className="flex items-center justify-end w-full pt-6">
          <ModeToggle />

          {/* Language Switcher */}
          <SwitchLanguage />
        </div>

        {/* Header Image */}
        <HeaderAuthImage />

        {/* Auth Pages */}
        <div className="page w-full">{children}</div>

        {/* Footer Image */}
        <FooterAuthImage />
      </section>

      {/* Aside Image Left */}
      <aside className="auth-layout sticky top-0 isolate hidden h-screen lg:block">
        <Image
          src={AuthImage}
          alt="auth-image"
          fill
          priority
          sizes="50vw"
          className="h-screen object-cover saturate-90"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-sage-700 opacity-30 mix-blend-multiply"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-sage-950/60 via-transparent to-transparent"
          aria-hidden="true"
        />
      </aside>
    </main>
  );
}
