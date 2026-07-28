import FormTextFooter from '@/features/auth/components/form-text-footer';
import HeaderAuthText from '@/features/auth/components/header-text';

export default function RegisterPage() {
  return (
    <>
      {/* Text Header */}
      <HeaderAuthText textInfo="Become part of our family!" />

      {/* Form */}
      <form className="pt-6 pb-9 border-t border-b border-ds-border-muted">RegisterPage</form>

      {/* Form Text Footer */}
      <FormTextFooter text="Already have an account?" link="Login" href="login" />
    </>
  );
}
