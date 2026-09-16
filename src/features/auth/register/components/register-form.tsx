'use client';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormValue } from '../lib/type/register';
import { registerSchema } from '../lib/schema/register.schema';
import RegisterStepOne from './register-steps/step-1';
import { useEffect, useState } from 'react';
import RegisterStepTwo from './register-steps/step-2';
import RegisterStepThree from './register-steps/step-3';
import RegisterStepFour from './register-steps/step-4';
import FormTextFooter from '../../layout/components/form-text-footer';
import RegisterContextProvider, { useRegisterContext } from '../lib/context/register.context';
import useRegisterApi from '../lib/hooks/use-register-api';
import { useRouter } from '@/i18n/navigation';

export default function RegisterForm() {
  return (
    <RegisterContextProvider>
      <RegisterFormContent />
    </RegisterContextProvider>
  );
}

function RegisterFormContent() {
  // Navigation
  const router = useRouter();

  // Form Values State
  const [, setFormValues] = useState<Partial<RegisterFormValue>>({});

  // Register Context
  const { step } = useRegisterContext();

  // Custom hooks
  const { isPending, registerApiRequest } = useRegisterApi();

  // Form
  const form = useForm<RegisterFormValue>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      code: '',
      username: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      gender: undefined,
      phone: '',
    },
  });

  // Submit form Function
  function onSubmit(data: RegisterFormValue) {
    const { firstName, lastName, gender, email, username, password, confirmPassword } = data;

    registerApiRequest(
      { firstName, lastName, gender, email, username, password, confirmPassword },
      {
        onSuccess: () => {
          router.push('/login');
          localStorage.removeItem('register-email');
          localStorage.removeItem('step');
        },
      }
    );
  }

  // Effect State
  useEffect(() => {
    localStorage.setItem('step', step.toString());
  }, [step]);
  return (
    <FormProvider {...form}>
      <form
        id="register-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="pt-6 pb-9 border-t border-b border-ds-border-muted"
      >
        {step === 1 && <RegisterStepOne setFormValues={setFormValues} />}
        {step === 2 && <RegisterStepTwo setFormValues={setFormValues} />}
        {step === 3 && <RegisterStepThree setFormValues={setFormValues} />}
        {step === 4 && <RegisterStepFour isLoading={isPending} />}
      </form>

      {/* Form Text Footer */}
      {step === 1 && <FormTextFooter text="Already have an account?" link="Login" href="login" />}

      {4 <= step && step > 1 && <FormTextFooter text="Need help?" link="Contact us" />}
    </FormProvider>
  );
}
