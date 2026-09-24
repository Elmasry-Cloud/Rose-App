import { MoveRight } from 'lucide-react';
import { Field, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { useTranslations } from 'next-intl';

export default function ForgetStepOne() {
  // Translations
  const t = useTranslations('auth.forgot-password-page');
  return (
    <div className="flex flex-col gap-9">
      <Field>
        <FieldLabel>{t('email-label')}</FieldLabel>
        <Input type="email" placeholder={t('email-placeholder')} />
      </Field>

      {/* Button */}
      <Button
        // isLoading={isPending}
        // form="register-form"
        type="button"
        variant={'primary'}
        className={'flex items-center gap-2.5 w-full'}
        // onClick={() => submitNext()}
      >
        {t('next-button')}
        <MoveRight className="text-ds-text-inverse size-4.5 rtl:rotate-180" />
      </Button>
    </div>
  );
}
