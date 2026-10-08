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

export default function FooterSection() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-10 flex items-start md:items-center justify-center bg-ds-bg-inverse text-amber-50">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-4/5 text-center md:text-start">
        {/* Brand */}
        <div className="md:col-span-3 flex flex-col md:items-center gap-1.5">
          <Link href="/" className="mx-auto md:mx-0 w-fit">
            <Image
              src={Logo}
              alt="Rose E-Commerce App – Home"
              width={240}
              height={225}
              className="object-contain"
            />
          </Link>
          <p className="font-semibold text-base text-ds-text-secondary mt-4">Rose E-Commerce App</p>
          <p className="text-sm text-zinc-100">
            &copy; {year} Rose E-Commerce App. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <nav
          aria-labelledby="footer-nav-title"
          className="w-fit mx-auto md:mx-0 md:col-span-4 lg:col-span-5 md:ps-4 md:border-s md:border-ds-border-muted"
        >
          <h2 id="footer-nav-title" className="font-semibold text-base text-ds-text-secondary">
            Discover our website
          </h2>
          <ul className="mt-1.5 flex flex-col items-center md:items-start gap-1.5">
            {footerLinks.map((link) => (
              <li key={link.title}>
                <Link
                  href={link.href}
                  className="font-medium text-sm text-zinc-100 underline-offset-4 transition-colors hover:text-ds-text-secondary hover:underline focus-visible:text-ds-text-secondary focus-visible:underline"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Subscribe */}
        <section
          aria-labelledby="newsletter-title"
          className="md:col-span-5 lg:col-span-4 flex flex-col items-center md:items-start"
        >
          <h2 id="newsletter-title" className="font-semibold text-xl text-ds-text-secondary">
            Get <span className="text-ds-text-primary-fade">20%</span> Off Discount Coupon
          </h2>
          <p id="newsletter-desc" className="text-ds-text-soft">
            By subscribing to our newsletter
          </p>

          {/* TODO: extract into a client NewsletterForm (RHF + Zod + Sonner) and wire onSubmit */}
          <form className="relative mt-5 w-full max-w-sm">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <Input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-describedby="newsletter-desc"
              placeholder="Enter your email"
              className="pe-30 bg-ds-bg-default h-9.5 border-0 rounded-full"
            />
            <Button
              type="submit"
              variant="secondary"
              className="rounded-full text-sm lg:text-base w-30 absolute end-0 top-0 bottom-0"
            >
              Subscribe
              <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
            </Button>
          </form>
        </section>
      </div>
    </footer>
  );
}
