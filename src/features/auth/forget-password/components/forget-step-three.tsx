import { Button } from '@/shared/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, TResetPasswordFormValue } from '../types/forget-password.schema';
import useResetPassword from '../hooks/use-reset-password';
import { toast } from 'sonner';
import { Controller } from 'react-hook-form';
import { useRouter } from '@/i18n/navigation';

export default function ForgetStepThree({ token }: { token: string }) {
  // Translations
  const t = useTranslations('auth.forgot-password-page');

  // Router
  const router = useRouter();

  // Hook
  const { resetPasswordApi, isPending, error } = useResetPassword();

  // Form
  const form = useForm<TResetPasswordFormValue>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'all',
    defaultValues: {
      token: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Function
  const onSubmit = (data: TResetPasswordFormValue) => {
    resetPasswordApi(
      {
        ...data,
        token: token,
      },
      {
        onSuccess: () => {
          toast.success(t('reset-success'));
          router.push('/login');
        },
        onError: () => {
          toast.error(t('reset-error'));
        },
      }
    );
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      id="reset-password-form"
      className="pt-6 pb-9 border-t border-b border-ds-border-muted flex flex-col gap-9"
    >
      <FieldGroup>
        {/* New Password */}
        <Controller
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>{t('password-label')}</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder={t('password-placeholder')}
                autoComplete="newPassword"
              />
              {fieldState.invalid && fieldState.error?.message && (
                <FieldError errors={[{ message: t(`errors.${fieldState.error.message}`) }]} />
              )}
            </Field>
          )}
        />

        {/* Confirm Password */}
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>{t('confirm-password-label')}</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder={t('confirm-password-label')}
                autoComplete="newPassword"
              />
              {fieldState.invalid && fieldState.error?.message && (
                <FieldError errors={[{ message: t(`errors.${fieldState.error.message}`) }]} />
              )}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Error Message */}
      {error && <p className="text-ds-text-danger">{error.message}</p>}

      {/* Button */}
      <Button
        isLoading={isPending}
        disabled={isPending || !!error}
        form="reset-password-form"
        type="submit"
        variant={'primary'}
        className={'flex items-center gap-2.5 w-full'}
      >
        {t('reset-button')}
      </Button>
    </form>
  );
}
