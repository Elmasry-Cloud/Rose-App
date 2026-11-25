import Image from 'next/image';
import { useTranslations } from 'next-intl';
import OccasionsImage1 from '@/assets/images/banner-home-page/Hero-Section-Occasions-1.png';
import OccasionsImage2 from '@/assets/images/banner-home-page/Hero-Section-Occasions-2.png';
import OccasionsImage3 from '@/assets/images/banner-home-page/Hero-Section-Occasions-3.png';
import { cn } from '@/shared/lib/utils';

const occasionsInfo = [
  { id: 1, key: 'wedding', image: OccasionsImage1, tint: 'opacity-30' },
  { id: 2, key: 'engagement', image: OccasionsImage2, tint: 'opacity-45' },
  { id: 3, key: 'anniversary', image: OccasionsImage3, tint: 'opacity-30' },
] as const;

export default function OccasionsSection() {
  // Translations
  const t = useTranslations('home-page.hero-section.occasions');

  return (
    <section aria-label={t('label')} className="mt-6.25">
      <ul className="occasions grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {occasionsInfo.map((item) => (
          <li key={item.id} className="relative isolate h-67.75 w-full overflow-hidden rounded-2xl">
            <Image
              src={item.image}
              alt=""
              placeholder="blur"
              width={410}
              height={271}
              className="h-full w-full object-cover saturate-90"
            />

            <div
              className={cn(
                'pointer-events-none absolute inset-0 bg-sage-700 mix-blend-multiply',
                item.tint
              )}
              aria-hidden="true"
            />

            <div
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-sage-950/80 via-sage-950/20 to-transparent"
              aria-hidden="true"
            />

            <div className="absolute bottom-0 p-6">
              <p className="w-fit rounded-full bg-sage-50 px-2 py-0.5 text-xs font-medium leading-4 text-sage-600">
                {t(`${item.key}.title`)}
              </p>

              <h2 className="mt-2.5 text-2xl font-semibold text-white">
                {t(`${item.key}.description`)}
              </h2>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
