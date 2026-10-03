import { OtpInput } from '@/shared/components/otp-input';
import RegisterHeader from '../register-header';
import { Button } from '@/shared/components/ui/button';
import { useTranslations } from 'next-intl';
import { Controller, useFormContext } from 'react-hook-form';
import { RegisterFormValue } from '../../lib/type/register';
import { RegisterStepOneProps } from './step-1';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { useRegisterContext } from '../../lib/context/register.context';
import useSendEmailVerification, {
  useConfirmEmailVerification,
} from '../../lib/hooks/use-email-verification';
import { useOtpTimer } from '../../lib/hooks/timer';

export default function RegisterStepTwo({ setFormValues }: RegisterStepOneProps) {
  // Translations
  const t = useTranslations('auth.register-page');

  // Register Context
  const { setStep, emailValue } = useRegisterContext();

  // Form Context
  const { control, trigger, getValues } = useFormContext<RegisterFormValue>();

  // Api Hook
  const { error, confirmEmailVerification, isPending } = useConfirmEmailVerification();
  const { sendEmailVerification } = useSendEmailVerification();

  // Tomer Hook
  const { timeLeft, startTimer } = useOtpTimer();

  // Submit Next Function
  async function submitNext() {
    // Isvalid Condition
    const isValid = await trigger('code');

    if (!isValid) return;

    // Get Email Value
    const { code } = getValues();

    confirmEmailVerification(
      { email: emailValue, code },
      {
        onSuccess: () => {
          // Move To Next Step
          setStep(3);
          setFormValues((prev) => ({ ...prev, code }));
        },
      }
    );
  }
  return (
    <div className="flex flex-col gap-6">
      {/* Register Header */}
      <RegisterHeader
        title="Create Account"
        description="Enter the OTP Code"
        info={`We have sent a 6-digit code to ${emailValue}`}
      />

      {/* Form Field */}
      <div className="pt-5 flex flex-col gap-4">
        <Controller
          name="code"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid || !!error}>
              <FieldLabel htmlFor="code">{t('code-label')}</FieldLabel>
              <OtpInput
                value={field.value}
                onChange={field.onChange}
                id="code"
                aria-invalid={fieldState.invalid || !!error}
              />
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

        {/* Button to send new Code */}
        <button
          type="button"
          disabled={timeLeft > 0}
          onClick={() => {
            sendEmailVerification(emailValue, {
              onSuccess: () => startTimer(),
              onError: (error) => console.log(error.message),
            });
          }}
          className="w-fit px-4 py-3.5 font-medium text-base text-ds-text-default ms-auto cursor-pointer disabled:pointer-events-none"
        >
          {timeLeft > 0 ? `Resend in ${timeLeft}s` : 'Send a new code'}
        </button>
      </div>

      {/* Button */}
      <Button
        isLoading={isPending}
        form="register-form"
        onClick={() => submitNext()}
        type="button"
        variant={'primary'}
        className={'flex items-center gap-2.5 mt-3'}
      >
        Verify Code
      </Button>
    </div>
  );
}
