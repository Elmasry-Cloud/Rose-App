import { Button } from '@/shared/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller, useFormContext } from 'react-hook-form';
import { RegisterFormValue } from '../../lib/type/register';
import RegisterHeader from '../register-header';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { PhoneInput } from '@/shared/components/ui/phone-input';
import { RegisterStepOneProps } from './step-1';
import { useRegisterContext } from '../../lib/context/register.context';

const gender = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
];

export default function RegisterStepThree({ setFormValues }: RegisterStepOneProps) {
  // Translations
  const t = useTranslations('auth.register-page');

  // Register Context
  const { setStep } = useRegisterContext();

  // Form Context
  const { control, trigger, getValues } = useFormContext<RegisterFormValue>();

  // Submit Next Function
  async function submitNext() {
    // Isvalid Condition
    const isValid = await trigger(['firstName', 'lastName', 'username', 'phone', 'gender']);

    if (!isValid) return;

    // Get Email Value
    const { firstName, lastName, username, phone, gender } = getValues();

    // Add Value to Form Values State
    setFormValues((prev) => ({ ...prev, firstName, lastName, username, phone, gender }));

    // Move To Next Step
    setStep(4);
  }
  return (
    <div className="flex flex-col gap-6">
      {/* Register Header */}
      <RegisterHeader
        title="Create Account"
        description="Tell us more about you"
        info={`A few details to get started`}
      />

      {/* Form Fields */}
      <div className="flex flex-col gap-4">
        {/* First & Last Name */}
        <FieldGroup className="flex flex-row items-center gap-5">
          {/* First Name */}
          <Controller
            name="firstName"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="firstName">{t('first-name-label')}</FieldLabel>
                <Input
                  {...field}
                  id="firstName"
                  aria-invalid={fieldState.invalid}
                  placeholder={t('first-name-placeholder')}
                  autoComplete="off"
                  type="text"
                />
                {fieldState.invalid && fieldState.error?.message && (
                  <FieldError errors={[{ message: t(fieldState.error.message) }]} />
                )}
              </Field>
            )}
          />

          {/* Last Name */}
          <Controller
            name="lastName"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="lastName">{t('last-name-label')}</FieldLabel>
                <Input
                  {...field}
                  id="lastName"
                  aria-invalid={fieldState.invalid}
                  placeholder={t('last-name-placeholder')}
                  autoComplete="off"
                  type="text"
                />
                {fieldState.invalid && fieldState.error?.message && (
                  <FieldError errors={[{ message: t(fieldState.error.message) }]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* User Name */}
        <Controller
          name="username"
          control={control}
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

        {/* Phone */}
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="phone">{t('phone-label')}</FieldLabel>
              <PhoneInput
                value={field.value}
                onChange={(value) => field.onChange(value || '')}
                id="phone"
                placeholder={t('phone-placeholder')}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && fieldState.error?.message && (
                <FieldError errors={[{ message: t(fieldState.error.message) }]} />
              )}
            </Field>
          )}
        />

        {/* Select Gender */}
        <Controller
          name="gender"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="gender">{t('gender-label')}</FieldLabel>
              <Select
                name="gender"
                items={gender}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger aria-invalid={fieldState.invalid} className="w-full">
                  <SelectValue placeholder={t('gender-placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {gender.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
        type="button"
        variant={'primary'}
        className={'flex items-center gap-2.5 mt-3'}
        onClick={() => submitNext()}
      >
        {t('submit')}

        <MoveRight className="text-ds-text-inverse size-4.5" />
      </Button>
    </div>
  );
}
