import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

const handleI18nRouting = createMiddleware(routing);

const authPages = ['/login', '/register', '/forgot-password'];
const protectedRoutes = ['/account-settings', '/cart/checkout'];
const adminRoutes = ['/admin'];

const NON_REMEMBERED_SESSION_MAX_AGE = 24 * 60 * 60;

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;

  const localeRegex = new RegExp(`^/(${routing.locales.join('|')})`);
  const localeMatch = pathname.match(localeRegex);
  const locale = localeMatch ? localeMatch[1] : routing.defaultLocale;
  const normalizedPath = pathname.replace(localeRegex, '') || '/';

  // helper بيبني رابط مع اللوكال دايمًا
  const buildUrl = (targetPath: string) => {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${targetPath === '/' ? '' : targetPath}`;
    url.search = '';
    return url;
  };

  const isAuthPage = authPages.some(
    (route) => normalizedPath === route || normalizedPath.startsWith(`${route}/`)
  );
  const isProtectedRoute = protectedRoutes.some(
    (route) => normalizedPath === route || normalizedPath.startsWith(`${route}/`)
  );
  const isAdminRoute = adminRoutes.some(
    (route) => normalizedPath === route || normalizedPath.startsWith(`${route}/`)
  );

  // مسجل دخول وداخل على صفحة auth (لوجين/تسجيل) → رجّعه للهوم
  if (token && isAuthPage) {
    return NextResponse.redirect(buildUrl('/'));
  }

  // الجلسة مش "remember me" وعدّت المدة المسموحة → امسح الكوكي ورجّعه للوجين
  if (token && !token.rememberMe) {
    const loginTime = token.loginTime as number;
    const now = Math.floor(Date.now() / 1000);
    const sessionAge = now - loginTime;

    if (sessionAge > NON_REMEMBERED_SESSION_MAX_AGE) {
      const response = NextResponse.redirect(buildUrl('/login'));
      response.cookies.delete('next-auth.session-token');
      return response;
    }
  }

  // مش مسجل دخول وداخل على route محمي → روح اللوجين مع returnUrl
  if (!token && isProtectedRoute) {
    const url = buildUrl('/login');
    url.searchParams.set('callbackUrl', pathname + request.nextUrl.search);
    return NextResponse.redirect(url);
  }

  // route خاص بالـ admin ومحتاج role ADMIN
  if (isAdminRoute && (!token || token.user?.role !== 'ADMIN')) {
    return NextResponse.redirect(buildUrl('/'));
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
  // matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
