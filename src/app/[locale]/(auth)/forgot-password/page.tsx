import ForgetPasswordForm from '@/features/auth/forget-password/components/forget-password-form';
import FormTextFooter from '@/features/auth/layout/components/form-text-footer';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

export default async function ForgotPasswordPage() {
  // Translations
  const t = await getTranslations('auth.forgot-password-page');
  return (
    <>
      {/* Form */}
      <Suspense>
        <ForgetPasswordForm />
      </Suspense>

      {/* Form Text Footer */}
      <FormTextFooter text={t('need-help')} link={t('contact-support')} href="" />
    </>
  );
}
