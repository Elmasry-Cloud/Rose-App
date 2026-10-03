import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { MoveRight } from 'lucide-react';
import { RegisterFormValue } from '../../lib/type/register';
import { useTranslations } from 'next-intl';
import { useRegisterContext } from '../../lib/context/register.context';
import useSendEmailVerification from '../../lib/hooks/use-email-verification';
import { useOtpTimer } from '../../lib/hooks/timer';

// Props Interface
export interface RegisterStepOneProps {
  step?: number;
  setFormValues: React.Dispatch<React.SetStateAction<Partial<RegisterFormValue>>>;
}

export default function RegisterStepOne({ setFormValues }: RegisterStepOneProps) {
  // Translations
  const t = useTranslations('auth.register-page');

  // Register Context
  const { setStep, setEmailValue } = useRegisterContext();

  // Form Context
  const { control, trigger, getValues } = useFormContext<RegisterFormValue>();

  // Api Hook
  const { error, sendEmailVerification, isPending } = useSendEmailVerification();

  // Timer Hook
  const { startTimer } = useOtpTimer();

  // Submit Next Function
  async function submitNext() {
    // Isvalid Condition
    const isValid = await trigger('email');

    if (!isValid) return;

    // Get Email Value
    const { email } = getValues();

    // Add Value to Form Values State
    setFormValues((prev) => ({ ...prev, email }));

    sendEmailVerification(email, {
      onSuccess: () => {
        // Move To Next Step
        setStep(2);

        // Save Email Value
        setEmailValue(email);

        // Start Timer
        startTimer();
      },
    });
  }
  return (
    <div className="flex flex-col gap-9">
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid || !!error}>
            <FieldLabel htmlFor="email">{t('email-label')}</FieldLabel>
            <Input
              {...field}
              id="email"
              aria-invalid={fieldState.invalid || !!error}
              placeholder={t('email-placeholder')}
              autoComplete="off"
              type="email"
            />

            {/* Error Message */}
            {(fieldState.invalid && fieldState.error?.message) || error ? (
              <FieldError
                errors={[
                  {
                    message: fieldState.error?.message
                      ? t(fieldState.error.message as never)
                      : error!.message,
                  },
                ]}
              />
            ) : null}
          </Field>
        )}
      />

      {/* Button */}
      <Button
        isLoading={isPending}
        form="register-form"
        type="button"
        variant={'primary'}
        className={'flex items-center gap-2.5'}
        onClick={() => submitNext()}
      >
        {t('submit')}

        <MoveRight className="text-ds-text-inverse size-4.5" />
      </Button>
    </div>
  );
}
