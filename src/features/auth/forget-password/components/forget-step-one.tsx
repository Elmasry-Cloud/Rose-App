import { MoveRight } from 'lucide-react';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import ISteps from '@/shared/lib/types/steps';
import useForgetPassword from '../hooks/use-forget-password';
import { forgetPasswordSchema, TForgetPasswordFormValue } from '../types/forget-password.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

export default function ForgetStepOne({
  setStep,
  emailInputRef,
  email,
  setEmail,
}: Partial<ISteps>) {
  // Translations
  const t = useTranslations('auth.forgot-password-page');

  // Hook
  const { forgetPasswordApi, isPending, error } = useForgetPassword();

  // Form
  const form = useForm<TForgetPasswordFormValue>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: email ?? '',
      redirectUrl: '',
    },
  });

  // Function
  async function onSubmit(data: TForgetPasswordFormValue) {
    try {
      await forgetPasswordApi(
        { ...data, redirectUrl: `${window.location.origin}${window.location.pathname}` },
        {
          onSuccess: () => {
            setStep?.(2);
            setEmail?.(data.email);
          },
        }
      );
    } catch (err) {
      void err;
    }
  }

  // Effect
  useEffect(() => {
    emailInputRef?.current?.focus();
  }, [emailInputRef]);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      id="forget-password-form"
      className="pt-6 pb-9 border-t border-b border-ds-border-muted flex flex-col gap-9"
    >
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{t('email-label')}</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder={t('email-placeholder')}
              autoComplete="email"
              ref={emailInputRef}
            />
            {fieldState.invalid && fieldState.error?.message && (
              <FieldError errors={[{ message: t(`errors.${fieldState.error.message}`) }]} />
            )}
          </Field>
        )}
      />

      {/* Button */}
      <Button
        isLoading={isPending || form.formState.isSubmitting}
        disabled={isPending || !!error || form.formState.isSubmitting}
        form="forget-password-form"
        type="submit"
        variant={'primary'}
        className={'flex items-center gap-2.5 w-full'}
      >
        {t('next-button')}
        <MoveRight className="text-ds-text-inverse size-4.5 rtl:rotate-180" />
      </Button>
    </form>
  );
}
