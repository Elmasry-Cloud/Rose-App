import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import ReactQueryProvider from './react-query.provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from './theme-provider.provider';
import NextAuthProvider from './next-auth/next-auth.provider';
import { Toaster } from '../components/ui/sonner';
import { getLocale } from 'next-intl/server';

export default async function Providers({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  return (
    <>
      <ReactQueryProvider>
        {/* The rest of your application */}
        <ReactQueryDevtools initialIsOpen={false} />
        <NextIntlClientProvider>
          <NextAuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster position={dir === 'rtl' ? 'bottom-left' : 'bottom-right'} dir={dir} />
            </ThemeProvider>
          </NextAuthProvider>
        </NextIntlClientProvider>
      </ReactQueryProvider>
    </>
  );
}
