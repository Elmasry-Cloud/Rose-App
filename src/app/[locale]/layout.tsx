import type { Metadata } from 'next';
import { Dancing_Script, Sarabun, Tajawal } from 'next/font/google';
import { hasLocale, Locale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import Providers from '../../shared/providers';
import { getTranslations } from 'next-intl/server';
import SwitchLanguage from '../../shared/components/layout/switch-language';
import { ModeToggle } from '@/shared/components/layout/mode-toggle';
import { cn } from '@/shared/lib/utils';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

// Fonts
const sarabun = Sarabun({
  subsets: ['latin'],
  variable: '--font-en',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  fallback: ['system-ui', 'sans-serif'],
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  variable: '--font-ar',
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  fallback: ['system-ui', 'sans-serif'],
});

const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dancing-en',
  fallback: ['system-ui', 'sans-serif'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Props['params'] }): Promise<Metadata> {
  const paramsResult = await params;
  const locale = paramsResult.locale;
  const t = await getTranslations({ locale });

  const title = t('app-title');

  return {
    title,
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const paramsResult = await params;
  const locale = paramsResult.locale;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={cn('h-full', 'antialiased', sarabun.variable, tajawal.variable, dancing.variable)}
    >
      <body
        className={cn(
          'min-h-full flex flex-col',
          locale === 'ar' ? 'font-tajawal' : 'font-sarabun'
        )}
      >
        <Providers>
          <SwitchLanguage />
          <ModeToggle />
          {children}
        </Providers>
      </body>
    </html>
  );
}
