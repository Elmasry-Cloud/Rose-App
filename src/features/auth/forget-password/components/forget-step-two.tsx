import BackForgetButton from './back-forget-button';
import { useTranslations } from 'next-intl';

export default function ForgetStepTwo() {
  // Translations
  const t = useTranslations('auth.forgot-password-page');
  return (
    <>
      {/* Toast */}
      {/* A new OTP code has been sent to your email. */}
      <div className="flex flex-col gap-2.5 pb-4 border-b border-b-ds-border-muted">
        <div className="title flex items-center gap-2.5">
          <BackForgetButton />

          <h2 className="text-ds-text-plain font-semibold text-2xl">{t('step-two-title')}</h2>
        </div>

        <div className="subtitle font-normal text-ds-text-plain">
          {t('step-two-subtitle')} <span className="text-ds-text-info">user@example.com</span>
        </div>
      </div>

      <div className="des flex flex-col gap-4 font-normal text-ds-text-plain mt-6">
        <p>{t('step-two-description')}</p>

        <p>{t('step-two-check-spam')}</p>
      </div>
    </>
  );
}
