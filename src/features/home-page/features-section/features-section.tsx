import { Headset, RefreshCw, ShieldCheck, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils';

const featuresInfo = [
  { id: 1, key: 'free-delivery', Icon: Truck },
  { id: 2, key: 'get-refund', Icon: RefreshCw },
  { id: 3, key: 'safe-payment', Icon: ShieldCheck },
  { id: 4, key: 'support', Icon: Headset },
] as const;

export default function FeaturesSection() {
  // Translations
  const t = useTranslations('home-page.hero-section.features');

  return (
    <section aria-label={t('label')} className="mt-10 mb-27">
      <ul
        className={cn(
          'features grid grid-cols-1 gap-6 rounded-2xl bg-ds-bg-primary-fade p-10 md:grid-cols-2 xl:grid-cols-4',
          'dark:bg-ds-bg-plain'
        )}
      >
        {featuresInfo.map(({ id, key, Icon }) => (
          <li key={id} className="flex items-center gap-4">
            <div
              className={cn(
                'flex h-15 w-15 items-center justify-center rounded-full bg-maroon-600 text-ds-text-inverse',
                'dark:bg-ds-bg-primary-saturated'
              )}
              aria-hidden="true"
            >
              <Icon className="size-10" />
            </div>

            <div className="min-w-39.25">
              <h2
                className={cn(
                  'mb-1.25 text-xl font-semibold text-maroon-600',
                  'dark:text-soft-pink-200'
                )}
              >
                {t(`${key}.title`)}
              </h2>

              <p className="text-sm font-normal text-ds-text-soft">{t(`${key}.description`)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
