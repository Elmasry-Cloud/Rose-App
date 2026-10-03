'use client';
import ForgetStepOne from './forget-step-one';
import ForgetStepTwo from './forget-step-two';
import ForgetStepThree from './forget-step-three';
import HeaderAuthText from '../../layout/components/header-text';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

export default function ForgetPasswordForm() {
  // Translations
  const t = useTranslations('auth.forgot-password-page');

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  // State
  const [step, setStep] = useState<number>(token ? 3 : 1);
  const [email, setEmail] = useState('');

  // Ref
  const emailInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {/* Text Header */}
      {/* Step 1 */}
      {step === 1 && (
        <HeaderAuthText
          textInfo={t('step-one-header-text')}
          description={t('step-one-header-description')}
        />
      )}

      {/* Step 3 */}
      {step === 3 && (
        <HeaderAuthText
          textInfo={t('step-three-title')}
          description={t('step-three-description')}
        />
      )}

      {/* Form Steps */}
      {step === 1 && (
        <ForgetStepOne
          setStep={setStep}
          emailInputRef={emailInputRef}
          email={email}
          setEmail={setEmail}
        />
      )}
      {step === 2 && <ForgetStepTwo setStep={setStep} email={email} />}
      {step === 3 && <ForgetStepThree token={token ?? ''} />}
    </>
  );
}
