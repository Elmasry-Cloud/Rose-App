import HeaderAuthText from '@/features/auth/layout/components/header-text';
import RegisterForm from '@/features/auth/register/components/register-form';
import { useTranslations } from 'next-intl';

export default function RegisterPage() {
  const t = useTranslations('auth.register-page');
  return (
    <>
      {/* Text Header */}
      <HeaderAuthText textInfo={t('title')} />

      {/* Form */}
      <RegisterForm />
    </>
  );
}
