import FormTextFooter from '@/features/auth/components/form-text-footer';
import HeaderAuthText from '@/features/auth/components/header-text';
import { Link } from '@/i18n/navigation';

export default function LoginPage() {
  return (
    <>
      {/* Text Header */}
      <HeaderAuthText textInfo="Welcome back!" />

      {/* Form */}
      <form className="pt-6 pb-9 border-t border-b border-ds-border-muted">
        LoginPage
        <Link
          href={'forgot-password'}
          className="font-semibold text-sm text-ds-text-primary block text-end my-2.5"
        >
          Forgot your password?
        </Link>
      </form>

      {/* Form Text Footer */}
      <FormTextFooter text="Don’t have an account yet?" link="Create one now!" href="register" />
    </>
  );
}
