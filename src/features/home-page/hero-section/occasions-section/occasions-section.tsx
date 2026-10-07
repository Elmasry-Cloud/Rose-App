import Image from 'next/image';
import { useTranslations } from 'next-intl';
import OccasionsImage1 from '@/assets/images/banner-home-page/Hero-Section-Occasions-1.png';
import OccasionsImage2 from '@/assets/images/banner-home-page/Hero-Section-Occasions-2.png';
import OccasionsImage3 from '@/assets/images/banner-home-page/Hero-Section-Occasions-3.png';

const occasionsInfo = [
  { id: 1, key: 'wedding', image: OccasionsImage1 },
  { id: 2, key: 'engagement', image: OccasionsImage2 },
  { id: 3, key: 'anniversary', image: OccasionsImage3 },
] as const;

export default function OccasionsSection() {
  // Translations
  const t = useTranslations('home-page.hero-section.occasions');

  return (
    <section aria-label={t('label')} className="mt-6.25">
      <ul className="occasions grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {occasionsInfo.map((item) => (
          <li key={item.id} className="relative h-67.75 w-full overflow-hidden rounded-2xl">
            <div
              className="absolute inset-0 bg-linear-to-t from-black/70 to-black/10"
              aria-hidden="true"
            />

            <Image
              src={item.image}
              alt=""
              placeholder="blur"
              width={410}
              height={271}
              className="h-full w-full object-cover"
            />

            <div className="absolute bottom-0 p-6">
              <p className="w-fit rounded-full bg-maroon-50 px-2 py-0.5 text-xs font-medium leading-4 text-maroon-600">
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
