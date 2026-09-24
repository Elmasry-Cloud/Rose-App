import { Button } from '@/shared/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { useTranslations } from 'next-intl';

export default function ForgetStepThree() {
  // Translations
  const t = useTranslations('auth.forgot-password-page');
  return (
    <>
      {/* Toast */}
      {/* Your password has been successfully reset. */}
      <div className="flex flex-col gap-9">
        <FieldGroup>
          <Field>
            <FieldLabel>{t('password-label')}</FieldLabel>
            <Input type="password" placeholder={t('password-placeholder')} />
          </Field>
          <Field>
            <FieldLabel>{t('confirm-password-label')}</FieldLabel>
            <Input type="password" placeholder={t('password-placeholder')} />
          </Field>
        </FieldGroup>

        {/* Button */}
        <Button
          // isLoading={isPending}
          // form="register-form"
          type="button"
          variant={'primary'}
          className={'flex items-center gap-2.5 w-full'}
          // onClick={() => submitNext()}
        >
          {t('reset-button')}
        </Button>
      </div>
    </>
  );
}
