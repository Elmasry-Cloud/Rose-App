import { useTranslations } from 'next-intl';
// import { routing } from "@/app/i18n/routing";

export default function HomePage() {
  const t = useTranslations('HomePage');
  //   return routing.locales.map((locale) => ({ locale }));
  return <div className="bg-ds-bg-plain border border-ds-border-primary">{t('title')}</div>;
}
