'use client';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { loginSchema } from '../lib/schema/login.schema';
import { LoginFields } from '../lib/type/login-type';
import { useLocale, useTranslations } from 'next-intl';
import { getPathname, Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import useLogin from '../lib/hooks/use-login';

export default function LoginForm() {
  // Translations
  const t = useTranslations('auth.login-page');

  const locale = useLocale();

  const { login, isPending, error } = useLogin();

  // Form
  const form = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFields) => {
    await login(data, {
      onSuccess: () => {
        const callbackUrl = new URLSearchParams(location.search).get('callbackUrl') || '/';

        location.href = getPathname({ href: callbackUrl, locale });
      },
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      id="login-form"
      className="pt-6 pb-9 border-t border-b border-ds-border-muted"
    >
      <div className="flex flex-col gap-4">
        {/* User Name */}
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="username">{t('user-name-label')}</FieldLabel>
              <Input
                {...field}
                id="username"
                aria-invalid={fieldState.invalid}
                placeholder={t('user-name-placeholder')}
                autoComplete="off"
                type="text"
              />
              {fieldState.invalid && fieldState.error?.message && (
                <FieldError errors={[{ message: t(fieldState.error.message) }]} />
              )}
            </Field>
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">{t('password-label')}</FieldLabel>
              <Input
                {...field}
                id="password"
                aria-invalid={fieldState.invalid}
                placeholder={t('password-placeholder')}
                autoComplete="off"
                type="password"
              />
              {fieldState.invalid && fieldState.error?.message && (
                <FieldError errors={[{ message: t(fieldState.error.message) }]} />
              )}
            </Field>
          )}
        />
      </div>

      {/* Forgot Password Link */}
      <Link
        href={'forgot-password'}
        className="font-semibold text-sm text-ds-text-primary block text-end my-2.5"
      >
        {t('forgot-password')}
      </Link>

      {/* Error Message */}
      {error && <p className="text-ds-text-danger">{error.message}</p>}

      {/* Button */}
      <Button
        form="login-form"
        type="submit"
        variant={'primary'}
        className={'flex items-center gap-2.5 mt-12'}
        isLoading={isPending}
      >
        {t('submit')}
      </Button>
    </form>
  );
}
