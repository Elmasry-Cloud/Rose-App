import Logo from '@/assets/images/logo.png';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const footerLinks = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Products',
    href: '/',
  },
  {
    title: 'Categories',
    href: '/',
  },
  {
    title: 'Occasions',
    href: '/',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Terms & Conditions',
    href: '/',
  },
  {
    title: 'Privacy Policy',
    href: '/',
  },
  {
    title: 'FAQs',
    href: '/',
  },
];

export default function Footer() {
  return (
    <div className="py-10 flex items-start md:items-center justify-center bg-ds-bg-inverse text-amber-50">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-4/5 text-center md:text-start">
        {/* Logo */}
        <div className="md:col-span-3 flex flex-col md:items-center gap-1.5">
          <Image
            src={Logo}
            alt="Logo"
            width={240}
            height={225}
            className="object-cover mx-auto md:mx-0"
          />
          <h4 className="font-semibold text-md text-ds-text-secondary mt-4">Rose E-Commerce App</h4>
          <p className="text-sm text-zinc-100">All rights reserved | 2025</p>
        </div>

        {/* Links */}
        <div className="w-fit mx-auto md:mx-0 md:col-span-4 lg:col-span-5 md:ps-4 md:border-s md:border-ds-border-muted flex items-center md:items-start flex-col gap-1.5">
          <h5 className="font-semibold text-md text-ds-text-secondary">Discover our website</h5>
          {footerLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="font-medium w-fit text-sm text-zinc-100 hover:text-ds-text-secondary transition-colors"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Subscribe */}
        <div className="md:col-span-5 lg:col-span-4 flex flex-col items-center md:items-start">
          <h6 className="font-semibold text-xl text-ds-text-secondary">
            Get <span className="text-ds-text-primary-fade">20%</span> Off Discount Coupon
          </h6>
          <p className="text-ds-text-soft">By subscribing to our newsletter</p>

          <div className="relative mt-5 rounded-full overflow-hidden">
            <Input
              type="email"
              placeholder="Enter your email"
              className="pe-20 bg-ds-bg-default h-9.5 border-0"
            />
            <Button
              variant="secondary"
              className="rounded-full text-sm lg:text-base w-30 absolute right-0 top-0 bottom-0"
            >
              Subscribe
              <ArrowRight className="size-4 rtl:rotate-180" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
