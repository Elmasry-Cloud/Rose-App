import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <>
      <div className="bg-ds-bg-plain border border-ds-border-primary">{t('title')}</div>
    </>
  );
}
