import FormTextFooter from '@/features/auth/layout/components/form-text-footer';

export default function ForgotPasswordPage() {
  return (
    <>
      {/* Form */}
      <form className="pt-6 pb-9 border-t border-b border-ds-border-muted">ForgotPasswordPage</form>

      {/* Form Text Footer */}
      <FormTextFooter text="Don’t have an account yet?" link="Create one now!" href="register" />
    </>
  );
}
