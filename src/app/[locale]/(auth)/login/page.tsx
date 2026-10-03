import FormTextFooter from '@/features/auth/layout/components/form-text-footer';
import HeaderAuthText from '@/features/auth/layout/components/header-text';
import LoginForm from '@/features/auth/login/components/login-form';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const t = useTranslations('auth.login-page');
  return (
    <>
      {/* Text Header */}
      <HeaderAuthText textInfo={t('title')} />

      {/* Form */}

      <LoginForm />

      {/* Form Text Footer */}
      <FormTextFooter text={t('dont-have-account')} link={t('create-account')} href="register" />
    </>
  );
}
