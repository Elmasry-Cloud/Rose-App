import FormTextFooter from '@/features/auth/layout/components/form-text-footer';
import HeaderAuthText from '@/features/auth/layout/components/header-text';
import RegisterForm from '@/features/auth/register/components/register-form';

export default function RegisterPage() {
  return (
    <>
      {/* Text Header */}
      <HeaderAuthText textInfo="Become part of our family!" />

      {/* Form */}
      <RegisterForm />

      {/* Form Text Footer */}
      <FormTextFooter text="Already have an account?" link="Login" href="login" />
    </>
  );
}
