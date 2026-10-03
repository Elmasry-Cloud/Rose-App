import { Button } from '@/shared/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { MoveRight } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import RegisterHeader from '../register-header';
import { RegisterFormValue } from '../../lib/type/register';
import { useTranslations } from 'next-intl';

export default function RegisterStepFour({ isLoading }: { isLoading: boolean }) {
  // Translations
  const t = useTranslations('auth.register-page');

  // Form Context
  const { control } = useFormContext<RegisterFormValue>();

  return (
    <div className="flex flex-col gap-6">
      {/* Register Header */}
      <RegisterHeader
        title="Create Account"
        description="Create a strong password"
        info={`Choose a secure password to protect your account`}
      />

      {/* Form Fields */}
      <div className="flex flex-col gap-4">
        {/* Password */}
        <Controller
          name="password"
          control={control}
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

        {/* Confirm Password */}
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirmPassword">{t('confirm-password-label')}</FieldLabel>
              <Input
                {...field}
                id="confirmPassword"
                aria-invalid={fieldState.invalid}
                placeholder={t('confirm-password-placeholder')}
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

      {/* Button */}
      <Button
        form="register-form"
        type="submit"
        variant={'primary'}
        className={'flex items-center gap-2.5 mt-3'}
        isLoading={isLoading}
      >
        {t('submit')}

        <MoveRight className="text-ds-text-inverse size-4.5" />
      </Button>
    </div>
  );
}
