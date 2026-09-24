'use client';
import ForgetStepOne from './forget-step-one';
import ForgetStepTwo from './forget-step-two';
import ForgetStepThree from './forget-step-three';
import HeaderAuthText from '../../layout/components/header-text';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ForgetPasswordForm() {
  // Translations
  const t = useTranslations('auth.forgot-password-page');

  // State
  const [step, setStep] = useState(1);
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

      <form
        id="forget-password-form"
        className="pt-6 pb-9 border-t border-b border-ds-border-muted"
      >
        {step === 1 && <ForgetStepOne />}
        {step === 2 && <ForgetStepTwo />}
        {step === 3 && <ForgetStepThree />}
      </form>
    </>
  );
}
