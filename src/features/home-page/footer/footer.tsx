import Logo from '@/assets/images/logo.png';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const FOOTER_LINKS = [
  { key: 'home', href: '/' },
  { key: 'products', href: '/' },
  { key: 'categories', href: '/' },
  { key: 'occasions', href: '/' },
  { key: 'contact', href: '/contact' },
  { key: 'about', href: '/about' },
  { key: 'terms', href: '/' },
  { key: 'privacy', href: '/' },
  { key: 'faqs', href: '/' },
] as const;

export default function FooterSection() {
  // Translations
  const t = useTranslations('home-page.footer');

  const year = new Date().getFullYear();
  return (
    <footer className="py-10 flex items-start md:items-center justify-center bg-ds-bg-inverse text-amber-50">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-4/5 text-center md:text-start">
        {/* Brand */}
        <div className="md:col-span-3 flex flex-col md:items-center gap-1.5 text-center">
          <Link href="/" className="mx-auto md:mx-0 w-fit">
            <Image
              src={Logo}
              alt={t('logo-alt')}
              width={240}
              height={225}
              className="object-contain"
            />
          </Link>
          <p className="font-semibold text-base text-ds-text-secondary mt-4">{t('brand')}</p>
          <p className="text-sm text-zinc-100">{t('copyright', { year })}</p>
        </div>

        {/* Links */}
        <nav
          aria-labelledby="footer-nav-title"
          className="w-fit mx-auto md:mx-0 md:col-span-4 lg:col-span-5 md:ps-4 md:border-s md:border-ds-border-muted"
        >
          <h2 id="footer-nav-title" className="font-semibold text-base text-ds-text-secondary">
            {t('discover')}
          </h2>
          <ul className="mt-1.5 flex flex-col items-center md:items-start gap-1.5">
            {FOOTER_LINKS.map(({ key, href }) => (
              <li
                key={key}
                className="hover:translate-x-1 transition-transform rtl:hover:-translate-x-1"
              >
                <Link
                  href={href}
                  className="font-medium text-sm text-zinc-100 underline-offset-4 transition-colors hover:text-ds-text-secondary hover:underline focus-visible:text-ds-text-secondary focus-visible:underline"
                >
                  {t(`links.${key}`)}
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
            {t.rich('newsletter.title', {
              highlight: (chunks) => <span className="text-ds-text-primary-fade">{chunks}</span>,
            })}
          </h2>
          <p id="newsletter-desc" className="text-ds-text-soft">
            {t('newsletter.description')}
          </p>

          {/* TODO: extract into a client NewsletterForm (RHF + Zod + Sonner) and wire onSubmit */}
          <form className="relative mt-5 w-full max-w-sm">
            <label htmlFor="newsletter-email" className="sr-only">
              {t('newsletter.email-label')}
            </label>
            <Input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-describedby="newsletter-desc"
              placeholder={t('newsletter.placeholder')}
              className="pe-30 bg-ds-bg-default h-9.5 border-0 rounded-full"
            />
            <Button
              type="submit"
              variant="secondary"
              className="rounded-full group text-sm lg:text-base w-30 absolute inset-e-0 top-0 bottom-0"
            >
              {t('newsletter.subscribe')}
              <ArrowRight
                aria-hidden="true"
                className="size-4 rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
              />
            </Button>
          </form>
        </section>
      </div>
    </footer>
  );
}
