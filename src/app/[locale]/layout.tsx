import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { hasLocale, Locale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import Providers from '../shared/providers';
import { getTranslations } from 'next-intl/server';
import SwitchLanguage from '../shared/components/layout/switch-language';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <SwitchLanguage />
          {children}
        </Providers>
      </body>
    </html>
  );
}
