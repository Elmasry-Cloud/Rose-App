import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import ReactQueryProvider from './react-query.provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from './theme-provider.provider';
import { Toaster } from '../components/ui/toast';
import NextAuthProvider from './next-auth/next-auth.provider';

export default function Providers({ children }: { children: React.ReactNode }) {
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
              <Toaster />
            </ThemeProvider>
          </NextAuthProvider>
        </NextIntlClientProvider>
      </ReactQueryProvider>
    </>
  );
}
