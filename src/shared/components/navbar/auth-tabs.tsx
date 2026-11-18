'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LoginForm from '@/features/auth/login/components/login-form';

export default function AuthTabs() {
  // Translation
  const t = useTranslations('home-page.navbar.auth');

  return (
    <div className="w-104 bg-ds-bg-plain overflow-hidden rounded-2xl ring-1 ring-ds-text-plain">
      {/* Tabs */}
      <div className="grid grid-cols-2">
        <div className="bg-ds-bg-primary py-4 text-center font-semibold text-ds-text-inverse">
          {t('login')}
        </div>
        <Link href="/register" className="py-4 text-center text-ds-text-plain hover:bg-ds-bg-muted">
          {t('register')}
        </Link>
      </div>

      {/* Login form */}
      <LoginForm className="px-6" />

      {/* <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 p-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-sm font-medium">
            {t('username')}
          </label>
          <input
            id="username"
            placeholder="johndoe"
            className="h-11 rounded-lg border px-3 outline-none focus:border-primary"
            {...register('username')}
          />
          {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            {t('password')}
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="h-11 w-full rounded-lg border ps-3 pe-10 outline-none focus:border-primary"
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-e-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
          {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          <Link href="/forgot-password" className="self-end text-sm font-medium text-primary">
            {t('forgot-password')}
          </Link>
        </div>

        <label className="flex items-center gap-3 text-sm text-muted-foreground">
          <input type="checkbox" className="size-5" {...register('rememberMe')} />
          {t('remember-me')}
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 rounded-lg bg-primary font-semibold text-primary-foreground disabled:opacity-60"
        >
          {t('login')}
        </button>
      </form> */}
    </div>
  );
}
