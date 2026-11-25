import FooterSection from '@/features/home-page/footer/footer';
import Navbar from '@/shared/components/navbar';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default async function WebsiteLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
      <FooterSection />
    </>
  );
}
